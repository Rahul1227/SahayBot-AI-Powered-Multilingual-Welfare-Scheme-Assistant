'use strict';

const { OpenAI } = require('openai');
const { SCHEMES } = require('./schemes');

const NVIDIA_MODEL  = 'mistralai/mistral-medium-3.5-128b';
const NVIDIA_BASE   = 'https://integrate.api.nvidia.com/v1';

let _client = null;
function getClient() {
  if (!_client) {
    _client = new OpenAI({
      apiKey:  process.env.NVIDIA_API_KEY,
      baseURL: NVIDIA_BASE,
    });
  }
  return _client;
}

// ---------------------------------------------------------------------------
// RAG — Keyword-based scheme retrieval
// ---------------------------------------------------------------------------

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

function hasNonAscii(token) {
  return /[^\x00-\x7F]/.test(token);
}

function tokenise(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\sऀ-ॿ஀-௿]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 1 && !STOP_WORDS.has(t) && (hasNonAscii(t) || t.length >= 3));
}

function scoreScheme(scheme, messageTokens) {
  let score = 0;

  for (const kw of scheme.keywords) {
    const kwTokens = tokenise(kw);
    for (const mt of messageTokens) {
      for (const kwt of kwTokens) {
        if (mt === kwt) {
          score += 4;
        } else if (kwt.length >= 4 && mt.length >= 4 && (mt.includes(kwt) || kwt.includes(mt))) {
          score += 2;
        }
      }
    }
  }

  const nameTokens = tokenise(scheme.name + ' ' + scheme.nameHi + ' ' + scheme.nameTa);
  for (const mt of messageTokens) {
    if (nameTokens.includes(mt)) score += 2;
  }

  const contextTokens = tokenise(
    scheme.benefit       + ' ' +
    scheme.benefitHi     + ' ' +
    scheme.benefitTa     + ' ' +
    scheme.eligibility   + ' ' +
    scheme.eligibilityHi + ' ' +
    scheme.eligibilityTa
  );
  for (const mt of messageTokens) {
    if (contextTokens.includes(mt)) score += 1;
  }

  return score;
}

function retrieveSchemes(userMessage, topK = 3) {
  if (!userMessage || typeof userMessage !== 'string') return SCHEMES.slice(0, topK);

  const messageTokens = tokenise(userMessage);
  const scored = SCHEMES.map(scheme => ({ scheme, score: scoreScheme(scheme, messageTokens) }));
  scored.sort((a, b) => b.score - a.score);

  if (scored[0].score === 0) return SCHEMES.slice(0, topK);
  return scored.slice(0, topK).map(s => s.scheme);
}

// ---------------------------------------------------------------------------
// System prompt builder
// ---------------------------------------------------------------------------

const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  ta: 'Tamil (தமிழ்)'
};

function buildSystemPrompt(language, retrievedSchemes) {
  const langName = LANGUAGE_NAMES[language] || 'English';

  const schemeContext = retrievedSchemes.map((s, i) => {
    const name    = language === 'hi' ? s.nameHi       : language === 'ta' ? s.nameTa       : s.name;
    const benefit = language === 'hi' ? s.benefitHi    : language === 'ta' ? s.benefitTa    : s.benefit;
    const elig    = language === 'hi' ? s.eligibilityHi: language === 'ta' ? s.eligibilityTa: s.eligibility;
    const docs    = language === 'hi' ? s.documentsHi  : language === 'ta' ? s.documentsTa  : s.documents;
    const docList = Array.isArray(docs) ? docs.join('; ') : docs;

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
// Low-level NVIDIA call — exported so server.js can reuse it
// ---------------------------------------------------------------------------

async function callNvidia(messages, opts = {}) {
  const client = getClient();
  const completion = await client.chat.completions.create({
    model:       NVIDIA_MODEL,
    messages,
    max_tokens:  opts.maxTokens  || 512,
    temperature: opts.temperature || 0.6,
    top_p:       1.0,
    stream:      false
  });
  return completion.choices[0].message.content;
}

// ---------------------------------------------------------------------------
// Main chat handler
// ---------------------------------------------------------------------------

async function handleChat(message, language = 'en', conversationHistory = []) {
  const validLanguages = ['en', 'hi', 'ta'];
  const lang = validLanguages.includes(language) ? language : 'en';

  const isGreeting = !message || message.trim() === '';
  const effectiveMessage = isGreeting
    ? (lang === 'hi' ? 'नमस्ते' : lang === 'ta' ? 'வணக்கம்' : 'Hello')
    : message.trim();

  const retrievedSchemes = retrieveSchemes(effectiveMessage, 3);
  const systemPrompt     = buildSystemPrompt(lang, retrievedSchemes);

  if (!process.env.NVIDIA_API_KEY) {
    console.error('[chatHandler] NVIDIA_API_KEY is not set — returning static fallback.');
    const fallback =
      lang === 'hi'
        ? 'नमस्ते! SahayBot में आपका स्वागत है। AI चैट सेवा अभी उपलब्ध नहीं है, लेकिन आप "Get Started" बटन से अपनी पात्रता जाँच सकते हैं।'
        : lang === 'ta'
          ? 'வணக்கம்! AI சேவை தற்போது கிடைக்கவில்லை. "Get Started" பொத்தானை கிளிக் செய்து உங்கள் தகுதியை சரிபார்க்கலாம்.'
          : 'Welcome to SahayBot! The AI chat service is temporarily unavailable. You can still find your eligible schemes by clicking "Get Started".';
    return { reply: fallback, updatedHistory: conversationHistory };
  }

  try {
    // conversationHistory is in OpenAI format: [{role: 'user'|'assistant', content: '...'}]
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user',   content: effectiveMessage }
    ];

    const reply = await callNvidia(messages);

    const updatedHistory = [
      ...conversationHistory,
      { role: 'user',      content: effectiveMessage },
      { role: 'assistant', content: reply }
    ];

    return { reply, updatedHistory };

  } catch (err) {
    const status   = err?.status || err?.response?.status;
    const isQuota  = status === 429;
    console.error(`[chatHandler] NVIDIA API error (${status}):`, err?.message);

    const userMsg = isQuota
      ? (lang === 'hi'
          ? 'AI सेवा की दैनिक सीमा समाप्त हो गई है। कृपया कुछ घंटों बाद पुनः प्रयास करें।'
          : lang === 'ta'
            ? 'AI சேவையின் தினசரி வரம்பு தீர்ந்துவிட்டது. சில மணி நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.'
            : 'The AI service has reached its daily limit. Please try again in a few hours.')
      : (lang === 'hi'
          ? 'माफ करें, अभी सेवा उपलब्ध नहीं है। कृपया थोड़ी देर बाद पुनः प्रयास करें।'
          : lang === 'ta'
            ? 'மன்னிக்கவும், சேவை தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.'
            : 'Sorry, the service is currently unavailable. Please try again in a moment.');

    const enhancedError = new Error(userMsg);
    enhancedError.originalError  = err;
    enhancedError.userFacingMessage = userMsg;
    enhancedError.statusCode     = isQuota ? 429 : 500;
    throw enhancedError;
  }
}

module.exports = { handleChat, retrieveSchemes, callNvidia };
