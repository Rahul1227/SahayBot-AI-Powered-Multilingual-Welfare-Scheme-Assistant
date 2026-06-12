import { useState, useEffect } from 'react'
import axios from 'axios'

const UI = {
  en: {
    title: 'Required Documents',
    print: 'Print / Save',
    sms: 'SMS this list',
    close: 'Close',
    loading: 'Loading checklist...',
    error: 'Could not load checklist.',
    phonePlaceholder: '+91 98765 43210',
    sendSms: 'Send SMS',
    smsNote: 'Standard SMS charges may apply',
    smsSending: 'Sending...',
    smsSuccess: 'SMS sent to',
    smsError: 'Failed to send SMS',
  },
  hi: {
    title: 'आवश्यक दस्तावेज़',
    print: 'प्रिंट / सेव',
    sms: 'SMS करें',
    close: 'बंद करें',
    loading: 'सूची लोड हो रही है...',
    error: 'सूची लोड नहीं हो सकी।',
    phonePlaceholder: '+91 98765 43210',
    sendSms: 'SMS भेजें',
    smsNote: 'सामान्य SMS शुल्क लागू हो सकते हैं',
    smsSending: 'भेज रहे हैं...',
    smsSuccess: 'SMS भेजा गया',
    smsError: 'SMS भेजने में विफल',
  },
  ta: {
    title: 'தேவையான ஆவணங்கள்',
    print: 'அச்சிடு / சேமி',
    sms: 'SMS அனுப்பு',
    close: 'மூடு',
    loading: 'பட்டியல் ஏற்றுகிறோம்...',
    error: 'பட்டியலை ஏற்ற முடியவில்லை.',
    phonePlaceholder: '+91 98765 43210',
    sendSms: 'SMS அனுப்பு',
    smsNote: 'வழக்கமான SMS கட்டணங்கள் பொருந்தலாம்',
    smsSending: 'அனுப்புகிறோம்...',
    smsSuccess: 'SMS அனுப்பப்பட்டது',
    smsError: 'SMS அனுப்ப முடியவில்லை',
  },
}

export default function DocumentChecklist({ scheme, language, onClose }) {
  const t = UI[language] || UI.en
  const [documents, setDocuments]     = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  // SMS form state
  const [showSmsForm, setShowSmsForm] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [smsSending, setSmsSending]   = useState(false)
  const [smsStatus, setSmsStatus]     = useState(null)  // { type: 'success'|'error', message: string }

  useEffect(() => {
    async function fetchChecklist() {
      try {
        const res = await axios.get(`/api/checklist/${scheme.id}?lang=${language}`)
        setDocuments(res.data.documents || res.data.checklist || [])
      } catch (err) {
        console.error('Checklist error:', err)
        setError(t.error)
      } finally {
        setLoading(false)
      }
    }
    fetchChecklist()
  }, [scheme.id, language])

  async function handleSendSms(e) {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    setSmsSending(true)
    setSmsStatus(null)

    try {
      await axios.post('/api/send-sms', {
        phone:    phoneNumber.trim(),
        schemeId: scheme.id,
        language,
      })
      setSmsStatus({ type: 'success', message: `${t.smsSuccess} ${phoneNumber.trim()}` })
      setPhoneNumber('')
    } catch (err) {
      const msg = err.response?.data?.error || t.smsError
      setSmsStatus({ type: 'error', message: msg })
    } finally {
      setSmsSending(false)
    }
  }

  function handleSmsToggle() {
    setShowSmsForm(prev => !prev)
    setSmsStatus(null)
    setPhoneNumber('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 no-print">
      <div className="bg-white rounded-t-2xl w-full max-w-sm flex flex-col" style={{ maxHeight: '75vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-bold text-gray-800">{t.title}</h3>
            <p className="text-xs text-gray-500">{scheme.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 typing-dot"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 typing-dot"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 typing-dot"></div>
              </div>
            </div>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {!loading && !error && (
            <ol className="space-y-2">
              {documents.map((doc, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 pt-0.5">{doc}</span>
                </li>
              ))}
            </ol>
          )}

          {/* Inline SMS form — shown below the list when SMS button is clicked */}
          {showSmsForm && (
            <form
              onSubmit={handleSendSms}
              className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={smsSending}
                />
                <button
                  type="submit"
                  disabled={smsSending || !phoneNumber.trim()}
                  className="text-sm font-medium text-white rounded-lg px-3 py-2 disabled:opacity-50"
                  style={{ backgroundColor: '#25D366' }}
                >
                  {smsSending ? t.smsSending : t.sendSms}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">{t.smsNote}</p>
              {smsStatus && (
                <p
                  className={`text-xs mt-2 font-medium ${
                    smsStatus.type === 'success' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {smsStatus.type === 'success' ? '✓ ' : '✗ '}
                  {smsStatus.message}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 text-sm font-medium text-white rounded-lg"
            style={{ backgroundColor: '#25D366' }}
          >
            {t.print}
          </button>
          <button
            onClick={handleSmsToggle}
            className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
              showSmsForm
                ? 'bg-green-50 border-green-400 text-green-700'
                : 'bg-white border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-700'
            }`}
          >
            {t.sms}
          </button>
        </div>
      </div>
    </div>
  )
}
