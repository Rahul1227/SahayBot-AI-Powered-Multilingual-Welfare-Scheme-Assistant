import { useState } from 'react'
import axios from 'axios'
import SchemeCard from './SchemeCard.jsx'
import QuizComponent from './QuizComponent.jsx'

const QUESTIONS = {
  en: [
    {
      id: 'occupation',
      text: 'What is your main occupation?',
      options: [
        { value: 'farmer', label: 'Farmer' },
        { value: 'gig_worker', label: 'Gig Worker' },
        { value: 'street_vendor', label: 'Street Vendor' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'pregnant_mother', label: 'Pregnant Mother' },
      ],
    },
    {
      id: 'income',
      text: 'What is your annual household income?',
      options: [
        { value: 'below_1L', label: 'Below ₹1 Lakh' },
        { value: '1_to_3L', label: '₹1–3 Lakh' },
        { value: 'above_3L', label: 'Above ₹3 Lakh' },
      ],
    },
    {
      id: 'gender',
      text: 'What is your gender?',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      id: 'bank_account',
      text: 'Do you have a bank account?',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      id: 'owns_land',
      text: 'Do you own agricultural land?',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
      showIf: (answers) => answers.occupation === 'farmer',
    },
  ],
  hi: [
    {
      id: 'occupation',
      text: 'आपका मुख्य व्यवसाय क्या है?',
      options: [
        { value: 'farmer', label: 'किसान' },
        { value: 'gig_worker', label: 'गिग कर्मचारी' },
        { value: 'street_vendor', label: 'सड़क विक्रेता' },
        { value: 'unemployed', label: 'बेरोजगार' },
        { value: 'pregnant_mother', label: 'गर्भवती माँ' },
      ],
    },
    {
      id: 'income',
      text: 'आपकी वार्षिक घरेलू आय क्या है?',
      options: [
        { value: 'below_1L', label: '₹1 लाख से कम' },
        { value: '1_to_3L', label: '₹1–3 लाख' },
        { value: 'above_3L', label: '₹3 लाख से अधिक' },
      ],
    },
    {
      id: 'gender',
      text: 'आपका लिंग क्या है?',
      options: [
        { value: 'male', label: 'पुरुष' },
        { value: 'female', label: 'महिला' },
        { value: 'other', label: 'अन्य' },
      ],
    },
    {
      id: 'bank_account',
      text: 'क्या आपके पास बैंक खाता है?',
      options: [
        { value: 'yes', label: 'हाँ' },
        { value: 'no', label: 'नहीं' },
      ],
    },
    {
      id: 'owns_land',
      text: 'क्या आपके पास कृषि भूमि है?',
      options: [
        { value: 'yes', label: 'हाँ' },
        { value: 'no', label: 'नहीं' },
      ],
      showIf: (answers) => answers.occupation === 'farmer',
    },
  ],
  ta: [
    {
      id: 'occupation',
      text: 'உங்கள் முக்கிய தொழில் என்ன?',
      options: [
        { value: 'farmer', label: 'விவசாயி' },
        { value: 'gig_worker', label: 'கிக் தொழிலாளி' },
        { value: 'street_vendor', label: 'தெரு வியாபாரி' },
        { value: 'unemployed', label: 'வேலையற்றவர்' },
        { value: 'pregnant_mother', label: 'கர்ப்பிணி தாய்' },
      ],
    },
    {
      id: 'income',
      text: 'உங்கள் வருடாந்திர குடும்ப வருமானம் என்ன?',
      options: [
        { value: 'below_1L', label: '₹1 லட்சத்திற்கு கீழ்' },
        { value: '1_to_3L', label: '₹1–3 லட்சம்' },
        { value: 'above_3L', label: '₹3 லட்சத்திற்கு மேல்' },
      ],
    },
    {
      id: 'gender',
      text: 'உங்கள் பாலினம் என்ன?',
      options: [
        { value: 'male', label: 'ஆண்' },
        { value: 'female', label: 'பெண்' },
        { value: 'other', label: 'மற்றவை' },
      ],
    },
    {
      id: 'bank_account',
      text: 'உங்களுக்கு வங்கி கணக்கு இருக்கிறதா?',
      options: [
        { value: 'yes', label: 'ஆம்' },
        { value: 'no', label: 'இல்லை' },
      ],
    },
    {
      id: 'owns_land',
      text: 'உங்களுக்கு விவசாய நிலம் இருக்கிறதா?',
      options: [
        { value: 'yes', label: 'ஆம்' },
        { value: 'no', label: 'இல்லை' },
      ],
      showIf: (answers) => answers.occupation === 'farmer',
    },
  ],
}

const PERSONA_PREFILL = {
  farmer: { occupation: 'farmer' },
  gig_worker: { occupation: 'gig_worker' },
  woman_hoh: { gender: 'female' },
}

const UI = {
  en: { checking: 'Checking your eligibility...', results: 'Schemes you qualify for', noResults: 'No schemes found for your profile. Try chatting freely!', learnMore: 'Chat About This', skip: 'Skip & Chat Freely', step: 'Step', of: 'of', back: 'Back', takeQuiz: 'Test Your Understanding' },
  hi: { checking: 'आपकी पात्रता जाँच रही है...', results: 'आपके लिए योजनाएं', noResults: 'आपकी प्रोफ़ाइल के लिए कोई योजना नहीं मिली। सीधे चैट करें!', learnMore: 'इसके बारे में चैट करें', skip: 'छोड़ें और चैट करें', step: 'चरण', of: 'में से', back: 'वापस', takeQuiz: 'अपनी समझ जाँचें' },
  ta: { checking: 'உங்கள் தகுதியை சரிபார்க்கிறோம்...', results: 'உங்களுக்கு தகுதியான திட்டங்கள்', noResults: 'உங்கள் சுயவிவரத்திற்கு திட்டங்கள் இல்லை. நேரடியாக அரட்டையடிக்கவும்!', learnMore: 'இதைப் பற்றி அரட்டை', skip: 'தவிர்த்து அரட்டையடி', step: 'படி', of: 'இல்', back: 'திரும்பு', takeQuiz: 'உங்கள் புரிதலை சோதியுங்கள்' },
}

export default function EligibilityFlow({ language, persona, onComplete, onSkip }) {
  const questions = QUESTIONS[language]
  const t = UI[language]

  const prefill = persona ? (PERSONA_PREFILL[persona] || {}) : {}
  const [answers, setAnswers] = useState(prefill)
  const [stepIndex, setStepIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [schemes, setSchemes] = useState(null)
  const [error, setError] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)

  const visibleQuestions = questions.filter(q => !q.showIf || q.showIf(answers))
  const currentQuestion = visibleQuestions[stepIndex]
  const totalSteps = visibleQuestions.length
  const progress = ((stepIndex) / totalSteps) * 100

  async function handleAnswer(value) {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    if (stepIndex < visibleQuestions.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      // All questions answered — submit
      setLoading(true)
      setError(null)
      try {
        const res = await axios.post('/api/eligibility', {
          profile: newAnswers,
          language,
        })
        setSchemes(res.data.eligibleSchemes || res.data.schemes || [])
      } catch (err) {
        console.error('Eligibility error:', err)
        setError('Could not fetch schemes. Please try again.')
        setSchemes([])
      } finally {
        setLoading(false)
      }
    }
  }

  function handleBack() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20" style={{ minHeight: '600px' }}>
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500 typing-dot"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 typing-dot"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 typing-dot"></div>
        </div>
        <p className="text-gray-600 text-sm">{t.checking}</p>
      </div>
    )
  }

  if (schemes !== null) {
    return (
      <div className="flex flex-col" style={{ minHeight: '600px' }}>
        <div className="bg-whatsapp-green p-4 text-white">
          <h2 className="font-bold text-lg">{t.results}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {schemes.length === 0 && (
            <p className="text-gray-500 text-center mt-10">{t.noResults}</p>
          )}
          {schemes.map((scheme, i) => (
            <SchemeCard
              key={i}
              scheme={scheme}
              language={language}
              actionLabel={t.learnMore}
              onAction={() => onComplete(scheme)}
            />
          ))}

          {/* Quiz section — shown inline after the scheme cards */}
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-2.5 text-sm font-medium border-2 border-green-400 text-green-700 rounded-xl hover:bg-green-50 transition-colors mt-2"
            >
              {t.takeQuiz}
            </button>
          ) : (
            <QuizComponent
              language={language}
              onDismiss={() => setShowQuiz(false)}
            />
          )}
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => onComplete(null)}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {t.skip}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '600px' }}>
      {/* Header with progress */}
      <div className="bg-whatsapp-green p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm opacity-80">{t.step} {stepIndex + 1} {t.of} {totalSteps}</span>
          <span className="text-sm opacity-80">{Math.round(((stepIndex + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col p-5">
        <div className="mb-6 mt-4">
          <p className="text-lg font-semibold text-gray-800">{currentQuestion?.text}</p>
        </div>

        <div className="flex flex-col gap-3">
          {currentQuestion?.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`w-full py-3 px-4 rounded-xl border-2 text-left font-medium transition-all ${
                answers[currentQuestion.id] === opt.value
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex gap-2">
        {stepIndex > 0 && (
          <button
            onClick={handleBack}
            className="flex-1 py-2 text-sm text-gray-500 hover:text-gray-700 border rounded-lg"
          >
            {t.back}
          </button>
        )}
        <button
          onClick={onSkip}
          className="flex-1 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          {t.skip}
        </button>
      </div>
    </div>
  )
}
