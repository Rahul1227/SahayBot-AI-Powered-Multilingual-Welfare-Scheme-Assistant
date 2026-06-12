import { useState, useEffect } from 'react'
import LanguageSelector from './components/LanguageSelector.jsx'
import PersonaSelector from './components/PersonaSelector.jsx'
import EligibilityFlow from './components/EligibilityFlow.jsx'
import ChatInterface from './components/ChatInterface.jsx'

const UI_STRINGS = {
  en: {
    welcome: 'Welcome to SahayBot',
    subtitle: 'Find government schemes you qualify for',
    startBtn: 'Get Started',
    selectLanguage: 'Select Language',
    selectPersona: 'I am a...',
    skip: 'Skip & Chat Freely',
  },
  hi: {
    welcome: 'सहायबॉट में आपका स्वागत है',
    subtitle: 'जानें कौन सी सरकारी योजनाएं आपके लिए हैं',
    startBtn: 'शुरू करें',
    selectLanguage: 'भाषा चुनें',
    selectPersona: 'मैं हूं...',
    skip: 'छोड़ें और सीधे चैट करें',
  },
  ta: {
    welcome: 'SahayBot-க்கு வரவேற்கிறோம்',
    subtitle: 'உங்களுக்கு தகுதியான அரசு திட்டங்களை கண்டறியுங்கள்',
    startBtn: 'தொடங்கு',
    selectLanguage: 'மொழியை தேர்ந்தெடுக்கவும்',
    selectPersona: 'நான்...',
    skip: 'தவிர்த்து நேரடியாக அரட்டையடிக்கவும்',
  },
}

function generateSessionId() {
  return 'session-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now()
}

export default function App() {
  const [language, setLanguage] = useState('en')
  const [persona, setPersona] = useState(null)
  const [screen, setScreen] = useState('welcome')
  const [sessionId] = useState(() => generateSessionId())
  const [initialScheme, setInitialScheme] = useState(null)

  const t = UI_STRINGS[language]

  function handleStart() {
    setScreen('eligibility')
  }

  function handleEligibilityComplete(scheme) {
    setInitialScheme(scheme)
    setScreen('chat')
  }

  function handleSkipToChat() {
    setScreen('chat')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden" style={{ minHeight: '600px' }}>

        {screen === 'welcome' && (
          <div className="flex flex-col h-full" style={{ minHeight: '600px' }}>
            {/* Header */}
            <div className="bg-whatsapp-green p-6 text-white text-center">
              <div className="text-4xl mb-2">🇮🇳</div>
              <h1 className="text-2xl font-bold">{t.welcome}</h1>
              <p className="text-sm mt-1 opacity-90">{t.subtitle}</p>
            </div>

            {/* Body */}
            <div className="flex-1 p-5 flex flex-col gap-6 overflow-y-auto">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.selectLanguage}</p>
                <LanguageSelector language={language} setLanguage={setLanguage} />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t.selectPersona}</p>
                <PersonaSelector persona={persona} setPersona={setPersona} language={language} />
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t">
              <button
                onClick={handleStart}
                className="w-full py-3 rounded-xl font-semibold text-white text-lg transition-all"
                style={{ backgroundColor: '#25D366' }}
                onMouseOver={e => e.target.style.backgroundColor = '#128C7E'}
                onMouseOut={e => e.target.style.backgroundColor = '#25D366'}
              >
                {t.startBtn}
              </button>
              <button
                onClick={handleSkipToChat}
                className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {t.skip}
              </button>
            </div>
          </div>
        )}

        {screen === 'eligibility' && (
          <EligibilityFlow
            language={language}
            persona={persona}
            onComplete={handleEligibilityComplete}
            onSkip={handleSkipToChat}
          />
        )}

        {screen === 'chat' && (
          <ChatInterface
            language={language}
            sessionId={sessionId}
            initialScheme={initialScheme}
          />
        )}
      </div>
    </div>
  )
}
