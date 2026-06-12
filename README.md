# SahayBot — AI-Powered Multilingual Welfare Scheme Assistant

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Platform: WhatsApp](https://img.shields.io/badge/Platform-WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white)
![Gemini 1.5 Flash](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![Backend: Live](https://img.shields.io/badge/Backend-Live%20on%20Render-46E3B7?style=flat-square&logo=render&logoColor=white)
![Frontend: Live](https://img.shields.io/badge/Frontend-Live%20on%20Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

SahayBot is a RAG-powered multilingual chatbot that helps rural and low-income communities in India discover government welfare schemes they qualify for. It supports WhatsApp, SMS, and web interfaces, making it accessible regardless of device type or connectivity. Built for **NSS Open Project Challenge 1.1 — AI & Intelligent Systems**.

| | URL |
|---|---|
| **Frontend (Web App)** | https://sahaybot.netlify.app |
| **Backend API** | https://sahaybot-ai-powered-multilingual-welfare.onrender.com |

---

## Features

- **Multilingual support** — English, Hindi (हिन्दी), and Tamil (தமிழ்); responses strictly scoped to the user's chosen language
- **RAG (Retrieval-Augmented Generation)** powered by Google Gemini 1.5 Flash — scheme answers are grounded in a curated knowledge base, preventing hallucinated entitlements
- **Adaptive eligibility checker** — 4–6 conditional questions (occupation, income, gender, land ownership, LPG status, dependents) produce a personalised scheme shortlist
- **10 high-impact government schemes** covered: PM-KISAN, Ayushman Bharat PMJAY, PMAY-G, Ujjwala Yojana, MGNREGS, Sukanya Samriddhi, PM Matru Vandana, PM SVANidhi, PMKVY, and PM Jan Dhan Yojana
- **WhatsApp integration** via Twilio Sandbox — a 5-state conversation state machine (greeting → language selection → questions → results → free-form chat)
- **SMS document checklist delivery** — sends a formatted, numbered document list for any scheme to any phone number
- **Downloadable/printable document checklist** per scheme, localised in all three languages
- **3 target user personas** — Farmer, Gig Worker, Woman Head-of-Household
- **Low-bandwidth optimised** — responses capped at 150 words; eligibility flow completes in 4–6 turns

---

## Tech Stack

| Category | Technology |
|---|---|
| Backend | Node.js, Express.js |
| AI / LLM | Google Gemini 1.5 Flash (`@google/generative-ai` v0.21) |
| RAG Engine | Custom keyword-based retrieval — Unicode-aware tokeniser (Devanagari + Tamil) |
| Messaging | Twilio WhatsApp Business API / Twilio SMS (`twilio` v5.3) |
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| HTTP Client | Axios |
| Tunneling (dev) | localtunnel |
| Deployment | Render (backend), static hosting (frontend) |

---

## Project Structure

```
welfare-chatbot/
├── backend/
│   ├── server.js           # Express API server + Twilio webhook routes
│   ├── chatHandler.js      # RAG engine + Gemini chat integration
│   ├── eligibility.js      # Eligibility rules + question flow
│   ├── schemes.js          # 10 welfare schemes database (EN/HI/TA)
│   ├── whatsappHandler.js  # WhatsApp conversation state machine
│   ├── .env.example        # Environment variable template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       ├── ChatInterface.jsx
    │       ├── EligibilityFlow.jsx
    │       ├── LanguageSelector.jsx
    │       ├── PersonaSelector.jsx
    │       ├── SchemeCard.jsx
    │       └── DocumentChecklist.jsx
    └── package.json
```

---

## Prerequisites

- **Node.js v18+** and **npm v9+**
- **Google Gemini API key** — free tier available at [aistudio.google.com](https://aistudio.google.com)
- **Twilio account** with WhatsApp Sandbox enabled — free trial at [twilio.com](https://twilio.com)

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rahul1227/SahayBot-AI-Powered-Multilingual-Welfare-Scheme-Assistant.git
cd SahayBot-AI-Powered-Multilingual-Welfare-Scheme-Assistant
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file from the provided template:

```bash
cp .env.example .env
```

Fill in your `.env` with real credentials:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

Start the backend server:

```bash
# Production
npm start

# Development (with auto-reload via nodemon)
npm run dev
```

Backend runs at `http://localhost:5000`

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. In development, Vite proxies all `/api/*` calls to `http://localhost:5000` automatically.

**Connecting to the live deployed backend** — for production builds, the frontend reads the backend URL from `frontend/.env.production` (already configured in this repo):

```env
VITE_API_URL=https://sahaybot-ai-powered-multilingual-welfare.onrender.com
```

To build the frontend against the live backend:

```bash
cd frontend
npm run build   # picks up .env.production automatically
```

The `dist/` folder can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

### 4. WhatsApp Bot Setup (Twilio Sandbox)

This section covers both **development** (localtunnel) and **production** (Render) configurations.

#### Step 1 — Create a Twilio account

1. Sign up at [twilio.com](https://www.twilio.com/try-twilio) (free trial, no credit card required).
2. From the Twilio Console dashboard, note your **Account SID** and **Auth Token** — add these to your `.env` file.

#### Step 2 — Enable the WhatsApp Sandbox

1. In the Twilio Console, go to **Messaging → Try it out → Send a WhatsApp message**.
2. You will see a sandbox number (usually `+1 415 523 8886`) and a unique **join keyword** like `join bright-tiger`.
3. From your WhatsApp, send the following message to `+1 415 523 8886`:
   ```
   join <your-sandbox-keyword>
   ```
   You will receive a confirmation reply: *"You are now connected to the sandbox."*
4. Any phone number that needs to test the bot must repeat this join step from their own WhatsApp.

#### Step 3 — Set the webhook URL

In the Twilio Console → **Messaging → Try it out → Send a WhatsApp message**, scroll to the **Sandbox Configuration** section:

**If using the live Render deployment (recommended):**

| Field | Value |
|---|---|
| When a message comes in | `https://sahaybot-ai-powered-multilingual-welfare.onrender.com/webhook/whatsapp` |
| HTTP Method | `POST` |

**If running locally with localtunnel (development):**

```bash
npx localtunnel --port 5000 --subdomain sahaybot
```

This gives you a temporary public URL: `https://sahaybot.loca.lt`

| Field | Value |
|---|---|
| When a message comes in | `https://sahaybot.loca.lt/webhook/whatsapp` |
| HTTP Method | `POST` |

Click **Save** after setting the webhook URL.

#### Step 4 — Test the bot

Send any message from the joined WhatsApp number to `+1 415 523 8886`. SahayBot will respond with a language selection menu:

```
Welcome to SahayBot!
Please choose your language:
1 - English
2 - हिन्दी
3 - தமிழ்
```

Reply with `1`, `2`, or `3` to begin the eligibility flow.

> **Note:** Render free-tier instances spin down after 15 minutes of inactivity. The first message after an idle period may take ~30 seconds to respond while the instance warms up. Subsequent messages in the same session will be fast.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check — returns `{ status: "ok", timestamp }` |
| POST | `/api/chat` | Chat with Gemini (RAG-powered, multi-turn, session-aware) |
| POST | `/api/eligibility` | Evaluate a user profile and return eligible schemes |
| GET | `/api/schemes` | List all 10 schemes (optional `?lang=en\|hi\|ta`) |
| GET | `/api/checklist/:schemeId` | Get localised document checklist for a scheme |
| GET | `/api/questions` | Get eligibility survey questions with all translations |
| DELETE | `/api/session/:sessionId` | Clear a user session (e.g., "start over") |
| POST | `/webhook/whatsapp` | Twilio inbound WhatsApp/SMS webhook |
| POST | `/api/send-sms` | Send a scheme's document checklist via SMS |

### Example: POST /api/chat

```json
// Request
{
  "message": "किसान योजना क्या है?",
  "sessionId": "abc123",
  "language": "hi"
}

// Response
{
  "reply": "पीएम-किसान सम्मान निधि योजना के तहत छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की आर्थिक सहायता तीन किस्तों में दी जाती है...",
  "sessionId": "abc123",
  "language": "hi"
}
```

### Example: POST /api/eligibility

```json
// Request
{
  "profile": {
    "occupation": "farmer",
    "annualIncome": 80000,
    "gender": "male",
    "hasBankAccount": true,
    "hasLand": true,
    "hasLPG": false,
    "hasDaughter": false
  },
  "language": "en"
}

// Response
{
  "eligibleSchemes": [ ... ],
  "summary": "Great news! You may be eligible for PM-KISAN, Ayushman Bharat, and MGNREGS schemes.",
  "totalFound": 3
}
```

---

## Deployment (Render)

The backend is already deployed at:

```
https://sahaybot-ai-powered-multilingual-welfare.onrender.com
```

To deploy your own instance:

1. Push your code to a GitHub repository.
2. Go to [render.com](https://render.com) → **New** → **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Under **Environment**, add all variables from `.env.example` with your real values.
6. Click **Deploy** and wait for the build to complete.
7. Update your Twilio webhook URL to:
   ```
   https://your-app.onrender.com/webhook/whatsapp
   ```
8. Update `frontend/.env.production` to point to your new backend URL and rebuild the frontend.

> **Note:** Render free-tier instances spin down after 15 minutes of inactivity. The first WhatsApp message after idle may take ~30 seconds to respond while the instance warms up.

---

## How It Works

### RAG Pipeline

```
User message
     ↓
Unicode-aware tokeniser
(strips punctuation, filters stop-words — supports Devanagari + Tamil)
     ↓
Keyword scoring against all 10 schemes
(exact match: 4 pts | substring match: 2 pts | name match: 2 pts | context match: 1 pt)
     ↓
Top-3 schemes selected by score
     ↓
Scheme data injected into Gemini system prompt
     ↓
Gemini 1.5 Flash generates a grounded response (≤150 words)
```

The tokeniser uses a custom `tokenise()` function that preserves Unicode ranges U+0900–U+097F (Devanagari) and U+0B80–U+0BFF (Tamil), allowing accurate scoring of Hindi and Tamil queries without transliteration. Responses are strictly grounded in retrieved scheme data — if a queried scheme is not in context, the model is instructed to direct the user to `india.gov.in` rather than guessing.

### WhatsApp Conversation Flow

```
User sends message
      ↓
  [greeting] → Sends language menu (1 = English / 2 = हिन्दी / 3 = தமிழ்)
      ↓
  [selecting_language] → User replies 1, 2, or 3
      ↓
  [asking_questions] → 4–6 adaptive eligibility questions
      ↓
  [showing_results] → Personalised eligible schemes list
      ↓
  [chatting] → Free-form RAG Q&A powered by Gemini
```

The state machine persists per phone number in the server's in-memory session store. Users can type `restart` or `reset` at any point to return to the greeting state.

### Eligibility Logic

The eligibility engine (`eligibility.js`) applies rule-based matching across 7 profile fields. Key rules:

| Condition | Scheme Unlocked |
|---|---|
| `occupation = farmer` AND `hasLand = true` | PM-KISAN |
| `annualIncome < 1,20,000` (BPL proxy) | Ayushman Bharat PMJAY |
| Rural occupation AND BPL | PMAY-G (housing) |
| `gender = female` AND no LPG AND low income | Ujjwala Yojana |
| Rural occupation or gig worker | MGNREGS |
| `hasDaughter = true` | Sukanya Samriddhi Yojana |
| `occupation = pregnant_mother` AND female | PM Matru Vandana Yojana |
| `occupation = street_vendor` | PM SVANidhi |
| Unemployed / gig / farmer / vendor | PMKVY (skill training) |
| `hasBankAccount = false` | PM Jan Dhan Yojana |

---

## Supported Schemes

| Scheme | Key Benefit | Primary Target Group |
|---|---|---|
| PM-KISAN | ₹6,000/year in 3 instalments via DBT | Small & marginal farmers (<2 ha land) |
| Ayushman Bharat PMJAY | Health cover up to ₹5 lakh/year | BPL families and low-income households |
| PMAY-G | Financial assistance for pucca house construction | Rural homeless / kutcha-house families |
| Pradhan Mantri Ujjwala Yojana | Free LPG connection + cylinder | BPL women without existing LPG |
| MGNREGS | 100 days of guaranteed wage employment/year | Rural adults (18+) |
| Sukanya Samriddhi Yojana | High-interest savings scheme for girl child education | Guardians of daughters under 10 |
| PM Matru Vandana Yojana | ₹5,000 cash incentive in instalments | Pregnant & lactating mothers (first child) |
| PM SVANidhi | Collateral-free micro-loans (₹10k–₹50k) | Street vendors and hawkers |
| PMKVY | Free skill training + ₹8,000 certification reward | Unemployed youth and informal workers |
| PM Jan Dhan Yojana | Zero-balance bank account + RuPay debit card | Unbanked individuals |

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key from [aistudio.google.com](https://aistudio.google.com). Without this, the chat and eligibility summary endpoints will return a static fallback. |
| `PORT` | No | Port the Express server listens on. Defaults to `5000`. |
| `TWILIO_ACCOUNT_SID` | For WhatsApp/SMS | Your Twilio Account SID, found in the Twilio Console dashboard. |
| `TWILIO_AUTH_TOKEN` | For WhatsApp/SMS | Your Twilio Auth Token. Keep this secret — never commit it to version control. |
| `TWILIO_PHONE_NUMBER` | For SMS | Twilio phone number used to send SMS (e.g. `+1xxxxxxxxxx`). |
| `TWILIO_WHATSAPP_NUMBER` | For WhatsApp | Twilio WhatsApp Sandbox number in the format `whatsapp:+14155238886`. |

All Twilio variables are optional at startup. The server initialises the Twilio client lazily — if credentials are absent, WhatsApp and SMS routes will log an error but the chat and eligibility endpoints remain fully functional.

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository and create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes, ensuring existing functionality is not broken
3. Add or update scheme data in `backend/schemes.js` if your change involves welfare scheme content
4. If adding a new language, update the tokeniser's Unicode range filter in `chatHandler.js` and the `LANGUAGE_NAMES` map
5. Open a pull request with a clear description of what you changed and why

Please keep PRs focused — one feature or fix per pull request. For significant changes, open an issue first to discuss the approach.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgements

- [Google Gemini API](https://aistudio.google.com) — LLM powering the RAG chat engine
- [Twilio WhatsApp Sandbox](https://twilio.com) — WhatsApp and SMS delivery infrastructure
- [MyScheme.gov.in](https://www.myscheme.gov.in) — Official Government of India scheme discovery portal (primary data reference)
- [india.gov.in](https://www.india.gov.in) — National Portal of India (scheme application references)
- **NSS Open Project 2026 — Challenge 1.1: AI & Intelligent Systems**
