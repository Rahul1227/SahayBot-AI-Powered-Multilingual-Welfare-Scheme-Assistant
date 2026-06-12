export default function LanguageSelector({ language, setLanguage }) {
  const options = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' },
  ]

  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button
          key={opt.code}
          onClick={() => setLanguage(opt.code)}
          className={`flex-1 py-2 px-3 rounded-full text-sm font-medium border-2 transition-all ${
            language === opt.code
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
