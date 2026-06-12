const UI = {
  en: { benefit: 'Benefit', eligibility: 'Eligibility' },
  hi: { benefit: 'लाभ', eligibility: 'पात्रता' },
  ta: { benefit: 'பலன்', eligibility: 'தகுதி' },
}

export default function SchemeCard({ scheme, language, actionLabel, onAction }) {
  const t = UI[language]

  const name = scheme.name || scheme.scheme_name || scheme.title || 'Unknown Scheme'
  const benefit = scheme.benefit || scheme.benefits || scheme.description || ''
  const eligibility = scheme.eligibility || scheme.eligibility_summary || ''

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Color accent bar */}
      <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-2">{name}</h3>

        {benefit && (
          <div className="mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase">{t.benefit}: </span>
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        )}

        {eligibility && (
          <div className="mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase">{t.eligibility}: </span>
            <span className="text-sm text-gray-600">{eligibility}</span>
          </div>
        )}

        <button
          onClick={onAction}
          className="w-full py-2 text-sm font-medium text-white rounded-lg transition-colors"
          style={{ backgroundColor: '#25D366' }}
          onMouseOver={e => e.target.style.backgroundColor = '#128C7E'}
          onMouseOut={e => e.target.style.backgroundColor = '#25D366'}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
