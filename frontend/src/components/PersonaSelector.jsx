const PERSONA_DATA = {
  farmer: {
    icon: '🌾',
    label: { en: 'Farmer', hi: 'किसान', ta: 'விவசாயி' },
  },
  gig_worker: {
    icon: '🛵',
    label: { en: 'Gig Worker', hi: 'गिग कर्मचारी', ta: 'கிக் தொழிலாளி' },
  },
  woman_hoh: {
    icon: '👩',
    label: { en: 'Woman HoH', hi: 'महिला प्रमुख', ta: 'பெண் தலைவர்' },
  },
}

export default function PersonaSelector({ persona, setPersona, language }) {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(PERSONA_DATA).map(([key, data]) => (
        <button
          key={key}
          onClick={() => setPersona(persona === key ? null : key)}
          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
            persona === key
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white hover:border-green-300'
          }`}
        >
          <span className="text-2xl">{data.icon}</span>
          <span className={`font-medium ${persona === key ? 'text-green-700' : 'text-gray-700'}`}>
            {data.label[language]}
          </span>
          {persona === key && (
            <span className="ml-auto text-green-500">✓</span>
          )}
        </button>
      ))}
    </div>
  )
}
