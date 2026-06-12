'use strict';

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const https   = require('https');
const http    = require('http');

const { handleChat }          = require('./chatHandler');
const { getEligibleSchemes, ELIGIBILITY_QUESTIONS } = require('./eligibility');
const { SCHEMES }             = require('./schemes');
const { GoogleGenerativeAI }  = require('@google/generative-ai');
const { handleWhatsAppMessage } = require('./whatsappHandler');

// ---------------------------------------------------------------------------
// Twilio client — initialised lazily only when credentials are present
// ---------------------------------------------------------------------------
let twilioClient = null;
function getTwilioClient() {
  if (twilioClient) return twilioClient;
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) return null;
  try {
    const twilio = require('twilio');
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  } catch (err) {
    console.error('[Twilio] Failed to initialise client:', err.message);
    twilioClient = null;
  }
  return twilioClient;
}

const app  = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ---------------------------------------------------------------------------
// In-memory session store
// Structure: { [sessionId]: { history: [], language: 'en', userProfile: {} } }
// ---------------------------------------------------------------------------
const sessions = {};

/**
 * Get or create a session.
 * @param {string} sessionId
 * @param {string} [language='en']
 * @returns {Object} session object
 */
function getOrCreateSession(sessionId, language = 'en') {
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      history:     [],
      language:    language,
      userProfile: {}
    };
  }
  return sessions[sessionId];
}

// ---------------------------------------------------------------------------
// Helper — generate an eligibility summary via Gemini
// ---------------------------------------------------------------------------
async function generateEligibilitySummary(eligibleSchemes, language) {
  if (!process.env.GEMINI_API_KEY) {
    // Fallback static summary if no API key
    const count = eligibleSchemes.length;
    if (language === 'hi') return `आप ${count} सरकारी योजनाओं के लिए पात्र हो सकते हैं।`;
    if (language === 'ta') return `நீங்கள் ${count} அரசாங்க திட்டங்களுக்கு தகுதியுடையவராக இருக்கலாம்.`;
    return `You may be eligible for ${count} government welfare scheme(s).`;
  }

  const schemeNames = eligibleSchemes
    .map(s => language === 'hi' ? s.nameHi : language === 'ta' ? s.nameTa : s.name)
    .join(', ');

  const promptByLang = {
    en: `In one short sentence (under 30 words), summarise that the person is eligible for these government welfare schemes: ${schemeNames}. Be encouraging and warm.`,
    hi: `एक छोटे वाक्य में (30 शब्दों से कम), सारांश दें कि व्यक्ति इन सरकारी कल्याण योजनाओं के लिए पात्र है: ${schemeNames}। प्रोत्साहक और गर्मजोशी से लिखें।`,
    ta: `ஒரு சிறு வாக்கியத்தில் (30 வார்த்தைகளுக்குள்), இந்த அரசாங்க நல திட்டங்களுக்கு நபர் தகுதியுடையவர் என சுருக்கமாக கூறுங்கள்: ${schemeNames}. உற்சாகமான தொனியில் எழுதுங்கள்.`
  };

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(promptByLang[language] || promptByLang.en);
    return result.response.text().trim();
  } catch (err) {
    // Non-fatal — return a static fallback
    console.error('[eligibility summary] Gemini error:', err.message);
    const count = eligibleSchemes.length;
    if (language === 'hi') return `आप ${count} सरकारी योजनाओं के लिए पात्र हो सकते हैं।`;
    if (language === 'ta') return `நீங்கள் ${count} அரசாங்க திட்டங்களுக்கு தகுதியுடையவராக இருக்கலாம்.`;
    return `You may be eligible for ${count} government welfare scheme(s).`;
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /health — Simple health check
 */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// POST /api/chat
// Body: { message: string, sessionId: string, language: 'en'|'hi'|'ta' }
// ---------------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, language = 'en' } = req.body;

    // Validate required fields
    if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
      return res.status(400).json({ error: 'sessionId is required and must be a non-empty string.' });
    }

    const validLanguages = ['en', 'hi', 'ta'];
    const lang = validLanguages.includes(language) ? language : 'en';

    // Get or create session
    const session = getOrCreateSession(sessionId.trim(), lang);

    // Update session language if it changed
    session.language = lang;

    // Call the chat handler with history
    const { reply, updatedHistory } = await handleChat(
      message || '',
      lang,
      session.history
    );

    // Persist updated history
    session.history = updatedHistory;

    return res.json({
      reply,
      sessionId: sessionId.trim(),
      language:  lang
    });

  } catch (err) {
    console.error('[POST /api/chat] Error:', err.originalError || err);
    const userMsg = err.userFacingMessage || 'An unexpected error occurred. Please try again.';
    return res.status(500).json({ error: userMsg });
  }
});

// ---------------------------------------------------------------------------
// POST /api/eligibility
// Body: { profile: Object, language: 'en'|'hi'|'ta' }
// Returns: { eligibleSchemes: [...], summary: string }
// ---------------------------------------------------------------------------
app.post('/api/eligibility', async (req, res) => {
  try {
    const { profile, language = 'en' } = req.body;

    if (!profile || typeof profile !== 'object') {
      return res.status(400).json({ error: 'profile object is required in the request body.' });
    }

    const validLanguages = ['en', 'hi', 'ta'];
    const lang = validLanguages.includes(language) ? language : 'en';

    // Determine eligible schemes
    const eligibleSchemes = getEligibleSchemes(profile);

    // Generate Gemini summary sentence
    const summary = eligibleSchemes.length > 0
      ? await generateEligibilitySummary(eligibleSchemes, lang)
      : (
          lang === 'hi' ? 'आपकी प्रोफ़ाइल के आधार पर अभी कोई विशेष योजना नहीं मिली। अधिक जानकारी के लिए नजदीकी CSC केंद्र से संपर्क करें।'
        : lang === 'ta' ? 'உங்கள் சுயவிவரத்தின் அடிப்படையில் தற்போது எந்த திட்டமும் கிடைக்கவில்லை. மேலும் தகவலுக்கு அருகிலுள்ள CSC மையத்தை தொடர்பு கொள்ளுங்கள்.'
        : 'No specific schemes were found matching your profile at this time. Please contact your nearest Common Service Centre (CSC) for personalised guidance.'
        );

    return res.json({
      eligibleSchemes,
      summary,
      totalFound: eligibleSchemes.length
    });

  } catch (err) {
    console.error('[POST /api/eligibility] Error:', err);
    return res.status(500).json({ error: 'Failed to determine eligibility. Please try again.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/schemes — Return all schemes (optionally filtered)
// Query: ?lang=en|hi|ta  (returns localised field names)
// ---------------------------------------------------------------------------
app.get('/api/schemes', (req, res) => {
  try {
    const lang = ['en', 'hi', 'ta'].includes(req.query.lang) ? req.query.lang : 'en';

    // Return full scheme objects; caller picks the language fields they need
    return res.json({
      schemes: SCHEMES,
      total:   SCHEMES.length,
      language: lang
    });

  } catch (err) {
    console.error('[GET /api/schemes] Error:', err);
    return res.status(500).json({ error: 'Failed to retrieve schemes.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/checklist/:schemeId — Return document checklist for a scheme
// Query: ?lang=en|hi|ta
// ---------------------------------------------------------------------------
app.get('/api/checklist/:schemeId', (req, res) => {
  try {
    const { schemeId } = req.params;
    const lang = ['en', 'hi', 'ta'].includes(req.query.lang) ? req.query.lang : 'en';

    const scheme = SCHEMES.find(s => s.id === schemeId);

    if (!scheme) {
      return res.status(404).json({
        error: `Scheme with id "${schemeId}" not found. Valid IDs: ${SCHEMES.map(s => s.id).join(', ')}`
      });
    }

    // Pick the right document list
    const documents =
      lang === 'hi' ? scheme.documentsHi :
      lang === 'ta' ? scheme.documentsTa :
                      scheme.documents;

    const name =
      lang === 'hi' ? scheme.nameHi :
      lang === 'ta' ? scheme.nameTa :
                      scheme.name;

    const benefit =
      lang === 'hi' ? scheme.benefitHi :
      lang === 'ta' ? scheme.benefitTa :
                      scheme.benefit;

    return res.json({
      schemeId:  scheme.id,
      name,
      benefit,
      documents,
      language:  lang
    });

  } catch (err) {
    console.error('[GET /api/checklist/:schemeId] Error:', err);
    return res.status(500).json({ error: 'Failed to retrieve document checklist.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/questions — Return eligibility survey questions
// Query: ?lang=en|hi|ta
// ---------------------------------------------------------------------------
app.get('/api/questions', (req, res) => {
  try {
    const lang = ['en', 'hi', 'ta'].includes(req.query.lang) ? req.query.lang : 'en';
    return res.json({ questions: ELIGIBILITY_QUESTIONS, language: lang });
  } catch (err) {
    console.error('[GET /api/questions] Error:', err);
    return res.status(500).json({ error: 'Failed to retrieve eligibility questions.' });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/session/:sessionId — Clear a session (e.g., "start over")
// ---------------------------------------------------------------------------
app.delete('/api/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    return res.json({ message: 'Session cleared successfully.' });
  }
  return res.status(404).json({ error: 'Session not found.' });
});

// ---------------------------------------------------------------------------
// POST /webhook/whatsapp — Twilio WhatsApp / SMS inbound webhook
// Body (application/x-www-form-urlencoded from Twilio):
//   From: "whatsapp:+91xxxxxxxxxx"  or  "+91xxxxxxxxxx"
//   Body: message text
// ---------------------------------------------------------------------------
app.post('/webhook/whatsapp', express.urlencoded({ extended: false }), async (req, res) => {
  // Acknowledge Twilio immediately with empty TwiML — reply is sent via client.messages.create()
  res.set('Content-Type', 'text/xml');
  res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');

  try {
    const rawFrom = (req.body.From || '').trim();
    const msgBody = (req.body.Body || '').trim();

    // Strip "whatsapp:" prefix so the session key is a clean phone number
    const phoneNumber = rawFrom.startsWith('whatsapp:')
      ? rawFrom.slice('whatsapp:'.length)
      : rawFrom;

    if (!phoneNumber) return;

    const reply = await handleWhatsAppMessage(phoneNumber, msgBody, sessions);

    const client = getTwilioClient();
    if (!client) {
      console.error('[webhook/whatsapp] Twilio client not configured.');
      return;
    }

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,   // whatsapp:+14155238886
      to:   rawFrom,                               // whatsapp:+91xxxxxxxxxx
      body: reply
    });

  } catch (err) {
    console.error('[POST /webhook/whatsapp] Error:', err.message);
  }
});

// ---------------------------------------------------------------------------
// POST /api/send-sms — Send document checklist to a phone number via Twilio SMS
// Body: { phone: string, schemeId: string, language: 'en'|'hi'|'ta' }
// ---------------------------------------------------------------------------
app.post('/api/send-sms', async (req, res) => {
  try {
    const client = getTwilioClient();
    if (!client) {
      return res.status(503).json({ error: 'SMS service not configured.' });
    }

    const { phone, schemeId, language = 'en' } = req.body;

    // Validate phone number — must start with + and be 10-15 digits total
    if (!phone || typeof phone !== 'string' || !/^\+\d{10,15}$/.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number. Must start with + and be 10-15 digits (e.g. +919876543210).' });
    }

    const normalizedPhone = phone.replace(/\s/g, '');

    // Validate language
    const lang = ['en', 'hi', 'ta'].includes(language) ? language : 'en';

    // Find the scheme
    const scheme = SCHEMES.find(s => s.id === schemeId);
    if (!scheme) {
      return res.status(404).json({ error: `Scheme "${schemeId}" not found.` });
    }

    // Pick localised fields
    const schemeName = lang === 'hi' ? scheme.nameHi : lang === 'ta' ? scheme.nameTa : scheme.name;
    const documents  = lang === 'hi' ? scheme.documentsHi : lang === 'ta' ? scheme.documentsTa : scheme.documents;

    // Format the SMS body as a numbered list
    const docLines = Array.isArray(documents)
      ? documents.map((doc, i) => `${i + 1}. ${doc}`).join('\n')
      : documents;

    const header = lang === 'hi'
      ? `SahayBot: ${schemeName}\nआवश्यक दस्तावेज़:\n`
      : lang === 'ta'
        ? `SahayBot: ${schemeName}\nதேவையான ஆவணங்கள்:\n`
        : `SahayBot: ${schemeName}\nRequired Documents:\n`;

    const smsBody = header + docLines;

    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to:   normalizedPhone,
      body: smsBody
    });

    return res.json({ success: true, message: 'SMS sent' });

  } catch (err) {
    console.error('[POST /api/send-sms] Error:', err);
    // Twilio errors have a .code and .message
    const msg = err.message || 'Failed to send SMS. Please try again.';
    return res.status(500).json({ error: msg });
  }
});

// ---------------------------------------------------------------------------
// GET /ping — Ultra-lightweight keep-alive probe (used by self-ping interval)
// ---------------------------------------------------------------------------
app.get('/ping', (_req, res) => {
  res.send('pong');
});

// ---------------------------------------------------------------------------
// 404 catch-all
// ---------------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ---------------------------------------------------------------------------
// Global error handler
// ---------------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error('[Global Error Handler]', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Welfare Chatbot Backend running on port ${PORT}`);

  // ── Startup environment-variable audit ────────────────────────────────────
  // Logs clearly which env vars are present / missing so Render log tailing
  // makes it immediately obvious why WhatsApp or Gemini might not work.
  const REQUIRED_ENV_VARS = [
    'GEMINI_API_KEY',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_WHATSAPP_NUMBER',
  ];
  const OPTIONAL_ENV_VARS = [
    'TWILIO_PHONE_NUMBER',   // only needed for outbound SMS
    'RENDER_EXTERNAL_URL',  // auto-set by Render; used for self-ping
  ];

  let missingCount = 0;
  for (const v of REQUIRED_ENV_VARS) {
    if (process.env[v]) {
      console.log(`[env] ${v}: OK`);
    } else {
      console.error(`[env] ${v}: MISSING ← set this in Render dashboard`);
      missingCount++;
    }
  }
  for (const v of OPTIONAL_ENV_VARS) {
    console.log(`[env] ${v}: ${process.env[v] ? 'set' : 'not set (optional)'}`);
  }
  if (missingCount > 0) {
    console.error(`[env] WARNING: ${missingCount} required env var(s) missing — WhatsApp/Gemini will NOT work.`);
  }

  // ── Self-ping keep-alive (Render free tier anti-sleep) ────────────────────
  // Render free tier instances sleep after ~15 min of inactivity. When Twilio
  // calls the webhook, Render takes 30-60 s to wake — but Twilio's webhook
  // timeout is only 15 s, so Twilio gives up before the server responds.
  //
  // Fix: ping ourselves every 10 minutes so the instance never goes to sleep.
  // We only do this in production (when RENDER_EXTERNAL_URL is set by Render,
  // or when NODE_ENV=production). In local dev this is a no-op.
  const renderExternalUrl = process.env.RENDER_EXTERNAL_URL;
  const isProduction = renderExternalUrl || process.env.NODE_ENV === 'production';

  if (isProduction) {
    const PING_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
    const pingUrl = renderExternalUrl
      ? `${renderExternalUrl}/ping`
      : `http://localhost:${PORT}/ping`;

    console.log(`[keep-alive] Self-ping enabled → ${pingUrl} every 10 minutes`);

    setInterval(() => {
      const client = pingUrl.startsWith('https') ? https : http;
      const req = client.get(pingUrl, (res) => {
        // Drain the response so the socket closes cleanly
        res.resume();
        console.log(`[keep-alive] Ping OK (${res.statusCode}) at ${new Date().toISOString()}`);
      });
      req.on('error', (err) => {
        console.error(`[keep-alive] Ping failed: ${err.message}`);
      });
      req.setTimeout(10000, () => {
        req.destroy();
        console.error('[keep-alive] Ping timed out after 10 s');
      });
    }, PING_INTERVAL_MS);
  }
});

module.exports = app; // exported for testing
