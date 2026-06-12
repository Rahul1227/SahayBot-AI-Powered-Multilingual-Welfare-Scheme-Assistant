'use strict';

const { handleChat }                         = require('./chatHandler');
const { getEligibleSchemes, ELIGIBILITY_QUESTIONS } = require('./eligibility');

// ---------------------------------------------------------------------------
// Language helpers
// ---------------------------------------------------------------------------

/** Pick a label from a question option based on language code. */
function optionLabel(option, lang) {
  if (lang === 'hi') return option.labelHi;
  if (lang === 'ta') return option.labelTa;
  return option.labelEn;
}

/** Pick a question text based on language code. */
function questionText(q, lang) {
  if (lang === 'hi') return q.questionHi;
  if (lang === 'ta') return q.questionTa;
  return q.questionEn;
}

// ---------------------------------------------------------------------------
// Determine which questions apply given the current collected profile.
// We build an ordered list once and step through it by index.
// ---------------------------------------------------------------------------
function getApplicableQuestions(profile) {
  return ELIGIBILITY_QUESTIONS.filter(q => {
    if (!q.showWhen) return true;
    return profile[q.showWhen.field] === q.showWhen.value;
  });
}

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------

/**
 * Build the "ask a question" message.
 * Shows question number out of total applicable questions.
 */
function formatQuestion(q, qIndex, totalQ, lang) {
  const qText  = questionText(q, lang);
  const lines  = [`Q${qIndex + 1}/${totalQ}: ${qText}`, ''];
  q.options.forEach((opt, i) => {
    lines.push(`${i + 1} - ${optionLabel(opt, lang)}`);
  });
  lines.push('');
  lines.push(`Reply with the number (1-${q.options.length})`);
  return lines.join('\n');
}

/**
 * Build the scheme results message.
 */
function formatResults(eligibleSchemes, lang) {
  if (!eligibleSchemes || eligibleSchemes.length === 0) {
    if (lang === 'hi') {
      return 'आपकी प्रोफ़ाइल के लिए कोई विशेष योजना नहीं मिली।\nअधिक जानकारी के लिए नज़दीकी CSC केंद्र से संपर्क करें या कोई भी प्रश्न पूछें।';
    }
    if (lang === 'ta') {
      return 'உங்கள் சுயவிவரத்திற்கு எந்த திட்டமும் கிடைக்கவில்லை.\nமேலும் தகவலுக்கு அருகிலுள்ள CSC மையத்தை தொடர்பு கொள்ளுங்கள் அல்லது கேள்வி கேளுங்கள்.';
    }
    return 'No schemes were found matching your profile.\nContact your nearest Common Service Centre (CSC) or ask any question.';
  }

  const count = eligibleSchemes.length;
  const header = lang === 'hi'
    ? `✅ आप ${count} योजनाओं के लिए पात्र हैं:`
    : lang === 'ta'
      ? `✅ நீங்கள் ${count} திட்டங்களுக்கு தகுதியுடையவர்:`
      : `✅ You qualify for ${count} scheme${count !== 1 ? 's' : ''}:`;

  const lines = [header, ''];
  eligibleSchemes.forEach((s, i) => {
    const name    = lang === 'hi' ? s.nameHi : lang === 'ta' ? s.nameTa : s.name;
    const benefit = lang === 'hi' ? s.benefitHi : lang === 'ta' ? s.benefitTa : s.benefit;
    // Truncate benefit to keep message manageable
    const shortBenefit = benefit.length > 60 ? benefit.slice(0, 57) + '...' : benefit;
    lines.push(`${i + 1}. ${name} — ${shortBenefit}`);
  });

  lines.push('');
  const footer = lang === 'hi'
    ? 'किसी योजना के बारे में अधिक जानने के लिए उसका नंबर भेजें, या कोई प्रश्न पूछें।'
    : lang === 'ta'
      ? 'ஒரு திட்டம் பற்றி மேலும் அறிய அதன் எண்ணை அனுப்புங்கள் அல்லது எந்த கேள்வியும் கேளுங்கள்.'
      : 'Reply with a scheme number to learn more, or ask any question.';
  lines.push(footer);

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main WhatsApp message handler (state machine)
// ---------------------------------------------------------------------------

/**
 * Handle an incoming WhatsApp/SMS message and return a reply string.
 *
 * State machine states stored per session:
 *   greeting            — initial; send welcome + language choice
 *   selecting_language  — waiting for 1/2/3
 *   asking_questions    — stepping through eligibility questions
 *   showing_results     — eligible schemes displayed; awaiting follow-up
 *   chatting            — free-form RAG chat via Gemini
 *
 * @param {string} phoneNumber   - E.164 phone number (whatsapp: prefix already stripped)
 * @param {string} incomingText  - Raw message body from user
 * @param {Object} sessionsMap   - Shared sessions object from server.js
 * @returns {Promise<string>}    - Reply to send back
 */
async function handleWhatsAppMessage(phoneNumber, incomingText, sessionsMap) {
  const text = (incomingText || '').trim();

  // ── Fetch or bootstrap session ──────────────────────────────────────────
  if (!sessionsMap[phoneNumber]) {
    sessionsMap[phoneNumber] = {
      state:       'greeting',
      language:    'en',
      history:     [],
      userProfile: {},
      // Track progress through applicable questions
      questionIndex:     0,
      eligibleSchemes:   []
    };
  }

  const session = sessionsMap[phoneNumber];

  // ── STATE: greeting ──────────────────────────────────────────────────────
  if (session.state === 'greeting') {
    session.state = 'selecting_language';
    return [
      'Welcome to SahayBot 🤝',
      'I help you find government welfare schemes you qualify for.',
      '',
      'Reply with your language:',
      '1 - English',
      '2 - हिन्दी (Hindi)',
      '3 - தமிழ் (Tamil)'
    ].join('\n');
  }

  // ── STATE: selecting_language ────────────────────────────────────────────
  if (session.state === 'selecting_language') {
    if (text === '1') {
      session.language = 'en';
    } else if (text === '2') {
      session.language = 'hi';
    } else if (text === '3') {
      session.language = 'ta';
    } else {
      // Invalid choice — re-ask
      return [
        'Please reply with 1, 2, or 3 to select your language.',
        '',
        '1 - English',
        '2 - हिन्दी (Hindi)',
        '3 - தமிழ் (Tamil)'
      ].join('\n');
    }

    // Language selected — start asking eligibility questions
    session.state         = 'asking_questions';
    session.userProfile   = {};
    session.questionIndex = 0;

    // Build the initial applicable question list for a fresh profile
    const applicableQs = getApplicableQuestions(session.userProfile);

    if (applicableQs.length === 0) {
      // Edge case: no questions at all — go straight to results
      session.eligibleSchemes = getEligibleSchemes(session.userProfile);
      session.state           = 'showing_results';
      return formatResults(session.eligibleSchemes, session.language);
    }

    const lang = session.language;
    const greeting = lang === 'hi'
      ? 'बढ़िया! मैं आपकी पात्रता जाँचने के लिए कुछ प्रश्न पूछूँगा।\n\n'
      : lang === 'ta'
        ? 'நல்லது! உங்கள் தகுதியை சரிபார்க்க சில கேள்விகள் கேட்கிறேன்.\n\n'
        : 'Great! I will ask a few questions to check your eligibility.\n\n';

    return greeting + formatQuestion(
      applicableQs[0],
      0,
      applicableQs.length,
      lang
    );
  }

  // ── STATE: asking_questions ──────────────────────────────────────────────
  if (session.state === 'asking_questions') {
    const lang = session.language;

    // Re-compute applicable questions with what we have so far
    // (some questions are conditional on previous answers)
    const applicableQs = getApplicableQuestions(session.userProfile);
    const currentQ     = applicableQs[session.questionIndex];

    if (!currentQ) {
      // All questions done — compute results
      session.eligibleSchemes = getEligibleSchemes(session.userProfile);
      session.state           = 'showing_results';
      return formatResults(session.eligibleSchemes, lang);
    }

    // Parse the user's numeric answer
    const choiceNum = parseInt(text, 10);
    const validRange = currentQ.options.length;

    if (isNaN(choiceNum) || choiceNum < 1 || choiceNum > validRange) {
      // Invalid answer — re-ask the same question
      const invalid = lang === 'hi'
        ? `कृपया ${1} से ${validRange} के बीच एक नंबर भेजें।\n\n`
        : lang === 'ta'
          ? `தயவுசெய்து ${1} முதல் ${validRange} வரை ஒரு எண் அனுப்புங்கள்.\n\n`
          : `Please reply with a number between 1 and ${validRange}.\n\n`;
      return invalid + formatQuestion(currentQ, session.questionIndex, applicableQs.length, lang);
    }

    // Store the selected value
    const selectedOption = currentQ.options[choiceNum - 1];
    session.userProfile[currentQ.id] = selectedOption.value;

    // Advance question index
    session.questionIndex += 1;

    // Re-compute applicable questions now that profile is updated
    const updatedQs   = getApplicableQuestions(session.userProfile);
    const nextQ       = updatedQs[session.questionIndex];

    if (!nextQ) {
      // Done with all applicable questions
      session.eligibleSchemes = getEligibleSchemes(session.userProfile);
      session.state           = 'showing_results';
      return formatResults(session.eligibleSchemes, lang);
    }

    return formatQuestion(nextQ, session.questionIndex, updatedQs.length, lang);
  }

  // ── STATE: showing_results ───────────────────────────────────────────────
  if (session.state === 'showing_results') {
    const lang   = session.language;
    const schemes = session.eligibleSchemes || [];

    // Check if user replied with a scheme number to get details
    const schemeNum = parseInt(text, 10);
    if (!isNaN(schemeNum) && schemeNum >= 1 && schemeNum <= schemes.length) {
      const chosen = schemes[schemeNum - 1];
      // Switch to chatting mode so further questions are answered via RAG
      session.state = 'chatting';

      const name    = lang === 'hi' ? chosen.nameHi : lang === 'ta' ? chosen.nameTa : chosen.name;
      const benefit = lang === 'hi' ? chosen.benefitHi : lang === 'ta' ? chosen.benefitTa : chosen.benefit;
      const elig    = lang === 'hi' ? chosen.eligibilityHi : lang === 'ta' ? chosen.eligibilityTa : chosen.eligibility;
      const docs    = lang === 'hi' ? chosen.documentsHi : lang === 'ta' ? chosen.documentsTa : chosen.documents;

      const docLines = Array.isArray(docs) ? docs.map((d, i) => `${i + 1}. ${d}`).join('\n') : docs;

      const header = lang === 'hi'
        ? `📋 *${name}*\n\n*लाभ:* ${benefit}\n\n*पात्रता:* ${elig}\n\n*ज़रूरी दस्तावेज़:*\n${docLines}\n\nकोई और प्रश्न?`
        : lang === 'ta'
          ? `📋 *${name}*\n\n*நலன்:* ${benefit}\n\n*தகுதி:* ${elig}\n\n*தேவையான ஆவணங்கள்:*\n${docLines}\n\nமேலும் கேள்விகள்?`
          : `📋 *${name}*\n\n*Benefit:* ${benefit}\n\n*Eligibility:* ${elig}\n\n*Required Documents:*\n${docLines}\n\nAny other questions?`;

      return header;
    }

    // Any non-numeric or out-of-range text — treat as a chat question
    session.state = 'chatting';
    // Fall through to chatting handler below
  }

  // ── STATE: chatting (free-form RAG) ──────────────────────────────────────
  if (session.state === 'chatting') {
    const lang = session.language;

    // Handle restart commands
    const restartKeywords = ['restart', 'start over', 'reset', 'शुरू', 'फिर से', 'மீண்டும்'];
    if (restartKeywords.some(kw => text.toLowerCase().includes(kw))) {
      // Reset session but keep language
      sessionsMap[phoneNumber] = {
        state:         'selecting_language',
        language:      lang,
        history:       [],
        userProfile:   {},
        questionIndex: 0,
        eligibleSchemes: []
      };
      return lang === 'hi'
        ? 'ठीक है, फिर से शुरू करते हैं!\n\n1 - English\n2 - हिन्दी (Hindi)\n3 - தமிழ் (Tamil)'
        : lang === 'ta'
          ? 'சரி, மீண்டும் தொடங்குவோம்!\n\n1 - English\n2 - हिन्दी (Hindi)\n3 - தமிழ் (Tamil)'
          : 'Sure, let\'s start over!\n\n1 - English\n2 - हिन्दी (Hindi)\n3 - தமிழ் (Tamil)';
    }

    try {
      const { reply, updatedHistory } = await handleChat(text, lang, session.history);
      session.history = updatedHistory;
      return reply;
    } catch (err) {
      console.error('[whatsappHandler] handleChat error:', err.message);
      return lang === 'hi'
        ? 'माफ करें, अभी सेवा उपलब्ध नहीं है। कृपया थोड़ी देर बाद पुनः प्रयास करें।'
        : lang === 'ta'
          ? 'மன்னிக்கவும், சேவை தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.'
          : 'Sorry, the service is currently unavailable. Please try again shortly.';
    }
  }

  // Fallback — should not reach here
  return 'Something went wrong. Please send "restart" to begin again.';
}

module.exports = { handleWhatsAppMessage };
