import { useState } from 'react'

// ─── Quiz questions in all 3 languages ────────────────────────────────────────
const QUIZ_QUESTIONS = {
  en: [
    {
      id: 'q1',
      text: 'Which scheme provides ₹6,000 per year directly to farmers?',
      options: [
        { value: 'a', label: 'PM-KISAN', correct: true },
        { value: 'b', label: 'Ayushman Bharat PM-JAY' },
        { value: 'c', label: 'MGNREGS' },
        { value: 'd', label: 'PM SVANidhi' },
      ],
    },
    {
      id: 'q2',
      text: 'How much health coverage does Ayushman Bharat PM-JAY provide per family per year?',
      options: [
        { value: 'b', label: '₹5 lakh', correct: true },
        { value: 'a', label: '₹1 lakh' },
        { value: 'c', label: '₹2 lakh' },
        { value: 'd', label: '₹10 lakh' },
      ],
    },
    {
      id: 'q3',
      text: 'What document is commonly required to apply for most welfare schemes?',
      options: [
        { value: 'c', label: 'Aadhaar card', correct: true },
        { value: 'a', label: 'Driving licence' },
        { value: 'b', label: 'Passport' },
        { value: 'd', label: 'Birth certificate' },
      ],
    },
  ],
  hi: [
    {
      id: 'q1',
      text: 'कौन सी योजना किसानों को सीधे ₹6,000 प्रति वर्ष देती है?',
      options: [
        { value: 'a', label: 'पीएम-किसान', correct: true },
        { value: 'b', label: 'आयुष्मान भारत पीएम-जेएवाई' },
        { value: 'c', label: 'मनरेगा' },
        { value: 'd', label: 'पीएम स्वनिधि' },
      ],
    },
    {
      id: 'q2',
      text: 'आयुष्मान भारत पीएम-जेएवाई प्रति परिवार प्रति वर्ष कितना स्वास्थ्य बीमा देता है?',
      options: [
        { value: 'b', label: '₹5 लाख', correct: true },
        { value: 'a', label: '₹1 लाख' },
        { value: 'c', label: '₹2 लाख' },
        { value: 'd', label: '₹10 लाख' },
      ],
    },
    {
      id: 'q3',
      text: 'अधिकांश कल्याण योजनाओं के लिए आवेदन करने हेतु कौन सा दस्तावेज़ सामान्यतः आवश्यक है?',
      options: [
        { value: 'c', label: 'आधार कार्ड', correct: true },
        { value: 'a', label: 'ड्राइविंग लाइसेंस' },
        { value: 'b', label: 'पासपोर्ट' },
        { value: 'd', label: 'जन्म प्रमाण पत्र' },
      ],
    },
  ],
  ta: [
    {
      id: 'q1',
      text: 'எந்த திட்டம் விவசாயிகளுக்கு நேரடியாக ஆண்டுக்கு ₹6,000 வழங்குகிறது?',
      options: [
        { value: 'a', label: 'பிஎம்-கிசான்', correct: true },
        { value: 'b', label: 'ஆயுஷ்மான் பாரத் பிஎம்-ஜேஏஒய்' },
        { value: 'c', label: 'MGNREGS' },
        { value: 'd', label: 'பிஎம் SVANidhi' },
      ],
    },
    {
      id: 'q2',
      text: 'ஆயுஷ்மான் பாரத் பிஎம்-ஜேஏஒய் குடும்பத்திற்கு ஆண்டுக்கு எவ்வளவு சுகாதார காப்பீடு வழங்குகிறது?',
      options: [
        { value: 'b', label: '₹5 லட்சம்', correct: true },
        { value: 'a', label: '₹1 லட்சம்' },
        { value: 'c', label: '₹2 லட்சம்' },
        { value: 'd', label: '₹10 லட்சம்' },
      ],
    },
    {
      id: 'q3',
      text: 'பெரும்பாலான நலத் திட்டங்களுக்கு விண்ணப்பிக்க பொதுவாக என்ன ஆவணம் தேவை?',
      options: [
        { value: 'c', label: 'ஆதார் அட்டை', correct: true },
        { value: 'a', label: 'ஓட்டுநர் உரிமம்' },
        { value: 'b', label: 'கடவுச்சீட்டு' },
        { value: 'd', label: 'பிறப்பு சான்றிதழ்' },
      ],
    },
  ],
}

// ─── UI strings ───────────────────────────────────────────────────────────────
const UI = {
  en: {
    title: 'Test Your Understanding',
    subtitle: 'Answer 3 quick questions about welfare schemes',
    questionOf: (n, total) => `Question ${n} of ${total}`,
    submit: 'Submit Answer',
    next: 'Next Question',
    seeResult: 'See My Score',
    score: (correct, total) => `You got ${correct} out of ${total} correct!`,
    perfect: 'Excellent! You know your schemes well.',
    good: 'Good job! You have a solid understanding.',
    tryAgain: 'Keep learning — every scheme can change a life.',
    retake: 'Retake Quiz',
    done: 'Done',
    correct: 'Correct!',
    wrong: 'Incorrect',
    correctAnswerWas: 'The correct answer was:',
    skip: 'Skip Quiz',
  },
  hi: {
    title: 'अपनी समझ जाँचें',
    subtitle: 'कल्याण योजनाओं पर 3 त्वरित प्रश्नों के उत्तर दें',
    questionOf: (n, total) => `प्रश्न ${n} / ${total}`,
    submit: 'उत्तर दें',
    next: 'अगला प्रश्न',
    seeResult: 'मेरा स्कोर देखें',
    score: (correct, total) => `आपने ${total} में से ${correct} सही उत्तर दिए!`,
    perfect: 'शानदार! आप योजनाओं को अच्छी तरह जानते हैं।',
    good: 'बहुत अच्छा! आपकी समझ अच्छी है।',
    tryAgain: 'सीखते रहें — हर योजना एक जिंदगी बदल सकती है।',
    retake: 'फिर से प्रयास करें',
    done: 'समाप्त',
    correct: 'सही!',
    wrong: 'गलत',
    correctAnswerWas: 'सही उत्तर था:',
    skip: 'छोड़ें',
  },
  ta: {
    title: 'உங்கள் புரிதலை சோதியுங்கள்',
    subtitle: 'நலத் திட்டங்களில் 3 விரைவான கேள்விகளுக்கு பதிலளிக்கவும்',
    questionOf: (n, total) => `கேள்வி ${n} / ${total}`,
    submit: 'பதிலளி',
    next: 'அடுத்த கேள்வி',
    seeResult: 'என் மதிப்பெண் பாருங்கள்',
    score: (correct, total) => `நீங்கள் ${total} இல் ${correct} சரியாக பதிலளித்தீர்கள்!`,
    perfect: 'அருமை! நீங்கள் திட்டங்களை நன்றாக அறிவீர்கள்.',
    good: 'நல்லது! உங்களுக்கு நல்ல புரிதல் உள்ளது.',
    tryAgain: 'தொடர்ந்து கற்றுக்கொள்ளுங்கள் — ஒவ்வொரு திட்டமும் ஒரு வாழ்க்கையை மாற்றலாம்.',
    retake: 'மீண்டும் முயற்சி செய்யுங்கள்',
    done: 'முடிந்தது',
    correct: 'சரி!',
    wrong: 'தவறு',
    correctAnswerWas: 'சரியான பதில்:',
    skip: 'தவிர்',
  },
}

export default function QuizComponent({ language, onDismiss }) {
  const questions = QUIZ_QUESTIONS[language] || QUIZ_QUESTIONS.en
  const t = UI[language] || UI.en

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1
  const correctOption = question?.options.find(o => o.correct)

  function handleSelect(value) {
    if (submitted) return
    setSelected(value)
  }

  function handleSubmit() {
    if (!selected || submitted) return
    const isCorrect = selected === correctOption.value
    setAnswers(prev => [...prev, { correct: isCorrect }])
    setSubmitted(true)
  }

  function handleNext() {
    setSelected(null)
    setSubmitted(false)
    if (isLast) {
      setShowResult(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function handleRetake() {
    setCurrentIndex(0)
    setSelected(null)
    setSubmitted(false)
    setAnswers([])
    setShowResult(false)
  }

  const score = answers.filter(a => a.correct).length
  const isPerfect = score === questions.length
  const isGood = score >= questions.length - 1

  // ── Result screen ────────────────────────────────────────────────────────
  if (showResult) {
    return (
      <div className="border-t pt-4 mt-2 px-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-700 text-sm">{t.title}</h3>
          <button
            onClick={onDismiss}
            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs"
            aria-label="close quiz"
          >
            ✕
          </button>
        </div>

        <div className="bg-green-50 rounded-xl p-5 text-center space-y-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto"
            style={{ backgroundColor: isPerfect ? '#25D366' : isGood ? '#128C7E' : '#6B7280' }}
          >
            {score}/{questions.length}
          </div>

          <p className="font-semibold text-gray-800 text-sm">{t.score(score, questions.length)}</p>
          <p className="text-xs text-gray-600">
            {isPerfect ? t.perfect : isGood ? t.good : t.tryAgain}
          </p>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleRetake}
              className="flex-1 py-2 text-sm font-medium border-2 border-green-500 text-green-700 rounded-xl hover:bg-green-50 transition-colors"
            >
              {t.retake}
            </button>
            <button
              onClick={onDismiss}
              className="flex-1 py-2 text-sm font-medium text-white rounded-xl transition-colors"
              style={{ backgroundColor: '#25D366' }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#128C7E')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#25D366')}
            >
              {t.done}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Question screen ──────────────────────────────────────────────────────
  return (
    <div className="border-t pt-4 mt-2 px-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-gray-700 text-sm">{t.title}</h3>
        <button
          onClick={onDismiss}
          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs"
          aria-label="close quiz"
        >
          ✕
        </button>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">{t.questionOf(currentIndex + 1, questions.length)}</span>
          <span className="text-xs text-gray-400">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              backgroundColor: '#25D366',
            }}
          />
        </div>
      </div>

      {/* Question text */}
      <p className="text-sm font-semibold text-gray-800 mb-3">{question.text}</p>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-3">
        {question.options.map(opt => {
          const isSelected = selected === opt.value
          const isCorrectOpt = !!opt.correct

          let cls = 'w-full py-2.5 px-4 rounded-xl border-2 text-left text-sm font-medium transition-all '

          if (!submitted) {
            cls += isSelected
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 text-gray-700 hover:border-green-300'
          } else {
            if (isCorrectOpt) {
              cls += 'border-green-500 bg-green-50 text-green-700'
            } else if (isSelected) {
              cls += 'border-red-400 bg-red-50 text-red-700'
            } else {
              cls += 'border-gray-200 text-gray-400'
            }
          }

          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cls}
              disabled={submitted}
            >
              <span className="flex items-center justify-between">
                <span>{opt.label}</span>
                {submitted && isCorrectOpt && (
                  <span className="text-green-600 font-bold text-xs ml-2">✓</span>
                )}
                {submitted && isSelected && !isCorrectOpt && (
                  <span className="text-red-500 font-bold text-xs ml-2">✗</span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {/* Inline feedback after submission */}
      {submitted && (
        <p
          className={`text-xs font-semibold mb-3 ${
            answers[answers.length - 1]?.correct ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {answers[answers.length - 1]?.correct
            ? `✓ ${t.correct}`
            : `✗ ${t.wrong} — ${t.correctAnswerWas} ${correctOption?.label}`}
        </p>
      )}

      {/* Primary action */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-all disabled:opacity-40"
          style={{ backgroundColor: '#25D366' }}
          onMouseOver={e => { if (selected) e.currentTarget.style.backgroundColor = '#128C7E' }}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#25D366')}
        >
          {t.submit}
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
          style={{ backgroundColor: '#25D366' }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#128C7E')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#25D366')}
        >
          {isLast ? t.seeResult : t.next}
        </button>
      )}
    </div>
  )
}
