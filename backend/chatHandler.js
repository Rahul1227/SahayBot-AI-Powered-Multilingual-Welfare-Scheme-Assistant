'use strict';

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SCHEMES } = require('./schemes');

/**
 * Lazily initialise the Gemini client so the module can be required
 * even before the env is loaded (useful in tests / import order).
 */
let _genAI = null;
function getGenAI() {
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return _genAI;
}

// ---------------------------------------------------------------------------
// RAG — Keyword-based scheme retrieval
// ---------------------------------------------------------------------------

/** Common English stop-words to skip during scoring to reduce false positives. */
const STOP_WORDS = new Set([
  'i','a','an','the','is','it','in','on','of','to','for','and','or','my','me',
  'am','are','was','be','by','at','do','we','he','she','they','you','as','if',
  'no','so','up','us','its','this','that','with','from','not','but','have',
  'has','had','can','will','would','could','should','may','might','what','how',
  'who','when','where','which','your','our','their','about','also','any','all',
  // Common Hindi stop-words
  'मेरा','आपका','है','क्या','और','या','के','का','की','में','से','यह','वह',
  'कोई','सभी','एक','इस','उस'
]);

/**
 * Returns true when a token contains at least one non-ASCII character
 * (i.e. it is a Devanagari, Tamil, or other Unicode word).
 * Non-ASCII tokens skip the minimum-length check because Unicode codepoints
 * count differently from visible characters in JS `.length`.
 * @param {string} token
 * @returns {boolean}
 */
function hasNonAscii(token) {
  return /[^\x00-\x7F]/.test(token);
}

/**
 * Tokenise a string into lower-case words, stripping punctuation,
 * filtering out stop-words and short ASCII tokens.
 * Preserves Devanagari (U+0900-U+097F) and Tamil (U+0B80-U+0BFF) script.
 * @param {string} text
 * @returns {string[]}
 */
function tokenise(text) {
  return text
    .toLowerCase()
    // Strip characters that are NOT: ASCII word chars, Devanagari, Tamil, or whitespace
    .replace(/[^\w\sऀ-ॿ஀-௿]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 1 && !STOP_WORDS.has(t) && (hasNonAscii(t) || t.length >= 3));
}

/**
 * Score a single scheme against the user message using keyword overlap.
 * Uses exact and substring matching only for tokens of sufficient length
 * to prevent short common tokens polluting scores.
 *
 * @param {Object} scheme
 * @param {string[]} messageTokens  - pre-tokenised, stop-word-filtered message tokens
 * @returns {number} score
 */
function scoreScheme(scheme, messageTokens) {
  let score = 0;

  // Check keyword list (highest weight — 3 pts per match)
  for (const kw of scheme.keywords) {
    const kwTokens = tokenise(kw);
    for (const mt of messageTokens) {
      for (const kwt of kwTokens) {
        if (mt === kwt) {
          // Exact match — strongest signal
          score += 4;
        } else if (kwt.length >= 4 && mt.length >= 4 && (mt.includes(kwt) || kwt.includes(mt))) {
          // Substring match — only when both tokens are meaningful length
          score += 2;
        }
      }
    }
  }

  // Check scheme name tokens (medium weight — 2 pts per match)
  const nameTokens = tokenise(scheme.name + ' ' + scheme.nameHi + ' ' + scheme.nameTa);
  for (const mt of messageTokens) {
    if (nameTokens.includes(mt)) {
      score += 2;
    }
  }

  // Check benefit + eligibility text tokens (low weight — 1 pt per match)
  // Includes Hindi and Tamil benefit/eligibility fields so multilingual queries score correctly.
  const contextTokens = tokenise(
    scheme.benefit      + ' ' +
    scheme.benefitHi    + ' ' +
    scheme.benefitTa    + ' ' +
    scheme.eligibility  + ' ' +
    scheme.eligibilityHi + ' ' +
    scheme.eligibilityTa
  );
  for (const mt of messageTokens) {
    if (contextTokens.includes(mt)) {
      score += 1;
    }
  }

  return score;
}

/**
 * Retrieve the top-K most relevant schemes for the given user message.
 * Falls back to a balanced sample of 3 schemes if no keywords match.
 *
 * @param {string} userMessage
 * @param {number} [topK=3]
 * @returns {Object[]} Array of scheme objects
 */
function retrieveSchemes(userMessage, topK = 3) {
  if (!userMessage || typeof userMessage !== 'string') {
    return SCHEMES.slice(0, topK);
  }

  const messageTokens = tokenise(userMessage);

  const scored = SCHEMES.map(scheme => ({
    scheme,
    score: scoreScheme(scheme, messageTokens)
  }));

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // If top scores are all zero, return first topK schemes as fallback
  if (scored[0].score === 0) {
    return SCHEMES.slice(0, topK);
  }

  return scored.slice(0, topK).map(s => s.scheme);
}

// ---------------------------------------------------------------------------
// System prompt builder
// ---------------------------------------------------------------------------

/** Language display names for clarity in system prompt */
const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  ta: 'Tamil (தமிழ்)'
};

/**
 * Build a Gemini system prompt with RAG-injected scheme context.
 *
 * @param {string} language - 'en' | 'hi' | 'ta'
 * @param {Object[]} retrievedSchemes - Schemes retrieved via RAG
 * @returns {string} System prompt text
 */
function buildSystemPrompt(language, retrievedSchemes) {
  const langName = LANGUAGE_NAMES[language] || 'English';

  // Serialise scheme context — pick fields appropriate to the language
  const schemeContext = retrievedSchemes.map((s, i) => {
    const name     = language === 'hi' ? s.nameHi      : language === 'ta' ? s.nameTa      : s.name;
    const benefit  = language === 'hi' ? s.benefitHi   : language === 'ta' ? s.benefitTa   : s.benefit;
    const elig     = language === 'hi' ? s.eligibilityHi: language === 'ta' ? s.eligibilityTa: s.eligibility;
    const docs     = language === 'hi' ? s.documentsHi  : language === 'ta' ? s.documentsTa  : s.documents;
    const docList  = Array.isArray(docs) ? docs.join('; ') : docs;

    return [
      `--- Scheme ${i + 1}: ${name} (ID: ${s.id}) ---`,
      `Benefit: ${benefit}`,
      `Eligibility: ${elig}`,
      `Required Documents: ${docList}`
    ].join('\n');
  }).join('\n\n');

  return `You are a helpful, empathetic government welfare scheme assistant for rural and low-income communities in India.

LANGUAGE INSTRUCTION (CRITICAL):
- You MUST respond ONLY in ${langName}.
- If the user writes in a mix of languages (e.g., Hinglish), still respond in ${langName}.
- Do NOT switch languages mid-response under any circumstances.
- For Hindi/Tamil responses, use clear, simple vocabulary that rural users can understand.

YOUR ROLE:
- Help users understand Indian government welfare schemes, their benefits, eligibility, and application process.
- Be warm, patient, and encouraging — many users are first-time scheme applicants.
- Always cite the exact scheme name when answering questions about a specific scheme.

SCHEME CONTEXT (use this to answer the user's question):
${schemeContext}

STRICT RULES:
1. Only answer based on the scheme information provided above. Do NOT invent details.
2. If the user asks about a scheme NOT in the context above, say honestly: "I don't have information on that scheme right now, please visit the official government portal (https://www.india.gov.in) or your nearest Common Service Centre (CSC)."
3. Keep responses concise — under 150 words — to respect low-bandwidth users.
4. If unsure, ask a clarifying question rather than guessing.
5. Avoid jargon; explain acronyms on first use (e.g., "DBT — Direct Benefit Transfer").
6. Never discuss politics, religion, or non-welfare topics.`;
}

// ---------------------------------------------------------------------------
// Main chat handler
// ---------------------------------------------------------------------------

/**
 * Handle a single chat turn using Gemini with conversation history.
 *
 * @param {string} message              - Current user message
 * @param {string} [language='en']      - Response language: 'en' | 'hi' | 'ta'
 * @param {Array}  [conversationHistory=[]] - Previous turns: [{role, parts}]
 * @returns {Promise<{reply: string, updatedHistory: Array}>}
 */
async function handleChat(message, language = 'en', conversationHistory = []) {
  // Validate language
  const validLanguages = ['en', 'hi', 'ta'];
  const lang = validLanguages.includes(language) ? language : 'en';

  // Handle empty / greeting message
  const isGreeting = !message || message.trim() === '';
  const effectiveMessage = isGreeting
    ? (lang === 'hi' ? 'नमस्ते' : lang === 'ta' ? 'வணக்கம்' : 'Hello')
    : message.trim();

  // RAG: retrieve relevant schemes for this message
  const retrievedSchemes = retrieveSchemes(effectiveMessage, 3);

  // Build system prompt with scheme context
  const systemPrompt = buildSystemPrompt(lang, retrievedSchemes);

  // If API key is not configured, return a graceful fallback (200) instead of crashing (500)
  if (!process.env.GEMINI_API_KEY) {
    console.error('[chatHandler] GEMINI_API_KEY is not set — returning static fallback.');
    const fallback =
      lang === 'hi'
        ? 'नमस्ते! SahayBot में आपका स्वागत है। AI चैट सेवा अभी उपलब्ध नहीं है, लेकिन आप "Get Started" बटन से अपनी पात्रता जाँच सकते हैं।'
        : lang === 'ta'
          ? 'வணக்கம்! AI சேவை தற்போது கிடைக்கவில்லை. "Get Started" பொத்தானை கிளிக் செய்து உங்கள் தகுதியை சரிபார்க்கலாம்.'
          : 'Welcome to SahayBot! The AI chat service is temporarily unavailable. You can still find your eligible schemes by clicking "Get Started" and answering a few questions.';
    return { reply: fallback, updatedHistory: conversationHistory };
  }

  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt
    });

    // Build history for multi-turn chat (Gemini format)
    // conversationHistory is already in [{role: 'user'|'model', parts: [{text: '...'}]}] format
    const chat = model.startChat({
      history: conversationHistory
    });

    // Send the current message
    const result = await chat.sendMessage(effectiveMessage);
    const reply = result.response.text();

    // Build the updated history to return to caller
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user',  parts: [{ text: effectiveMessage }] },
      { role: 'model', parts: [{ text: reply }] }
    ];

    return { reply, updatedHistory };

  } catch (err) {
    // Surface a user-friendly error while preserving the original for logging
    const userMsg = lang === 'hi'
      ? 'माफ करें, अभी सेवा उपलब्ध नहीं है। कृपया थोड़ी देर बाद पुनः प्रयास करें।'
      : lang === 'ta'
        ? 'மன்னிக்கவும், சேவை தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.'
        : 'Sorry, the service is currently unavailable. Please try again in a moment.';

    // Re-throw with extra context so server.js can log it properly
    const enhancedError = new Error(userMsg);
    enhancedError.originalError = err;
    enhancedError.userFacingMessage = userMsg;
    throw enhancedError;
  }
}

module.exports = { handleChat, retrieveSchemes };
