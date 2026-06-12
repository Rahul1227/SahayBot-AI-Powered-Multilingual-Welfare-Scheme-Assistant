import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import DocumentChecklist from './DocumentChecklist.jsx'

const UI = {
  en: { placeholder: 'Type a message...', send: 'Send', typing: 'SahayBot is typing...', checklist: 'Get Document Checklist', lang: 'EN' },
  hi: { placeholder: 'संदेश लिखें...', send: 'भेजें', typing: 'SahayBot टाइप कर रहा है...', checklist: 'दस्तावेज़ सूची देखें', lang: 'HI' },
  ta: { placeholder: 'செய்தி தட்டச்சு செய்யுங்கள்...', send: 'அனுப்பு', typing: 'SahayBot தட்டச்சு செய்கிறது...', checklist: 'ஆவண பட்டியல் பெறுக', lang: 'TA' },
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">S</div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
        <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot"></div>
      </div>
    </div>
  )
}

function Message({ msg, language, onChecklistRequest }) {
  const t = UI[language]
  const isUser = msg.role === 'user'

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs flex-shrink-0">S</div>
      )}
      <div className={`max-w-xs ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {msg.schemeName && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full self-start">
            {msg.schemeName}
          </span>
        )}
        <div
          className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-green-500 text-white rounded-br-sm'
              : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
          }`}
        >
          {isUser ? msg.text : (
            <ReactMarkdown
              components={{
                p:      ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em:     ({ children }) => <em className="italic">{children}</em>,
                ul:     ({ children }) => <ul className="list-disc list-inside space-y-0.5 mt-1 mb-1">{children}</ul>,
                ol:     ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mt-1 mb-1">{children}</ol>,
                li:     ({ children }) => <li className="ml-1">{children}</li>,
                h1:     ({ children }) => <h1 className="font-bold text-base mt-2 mb-1">{children}</h1>,
                h2:     ({ children }) => <h2 className="font-bold text-sm mt-2 mb-1">{children}</h2>,
                h3:     ({ children }) => <h3 className="font-semibold mt-1 mb-0.5">{children}</h3>,
                code:   ({ children }) => <code className="bg-gray-100 text-gray-800 px-1 rounded text-xs">{children}</code>,
                hr:     () => <hr className="border-gray-200 my-2" />,
              }}
            >
              {msg.text}
            </ReactMarkdown>
          )}
        </div>
        {!isUser && msg.schemeId && (
          <button
            onClick={() => onChecklistRequest(msg.schemeId, msg.schemeName)}
            className="text-xs text-green-600 hover:text-green-800 underline mt-1"
          >
            {t.checklist}
          </button>
        )}
        <span className="text-xs text-gray-400">{msg.time}</span>
      </div>
    </div>
  )
}

export default function ChatInterface({ language, sessionId, initialScheme }) {
  const t = UI[language]
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [checklistScheme, setChecklistScheme] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function addBotMessage(text, extra = {}) {
    setMessages(prev => [...prev, {
      role: 'bot',
      text,
      time: getTime(),
      ...extra,
    }])
  }

  function addUserMessage(text) {
    setMessages(prev => [...prev, {
      role: 'user',
      text,
      time: getTime(),
    }])
  }

  async function sendMessage(text) {
    setIsTyping(true)
    try {
      const res = await axios.post('/api/chat', {
        message: text,
        sessionId,
        language,
        ...(initialScheme ? { schemeId: initialScheme.id } : {}),
      })
      const data = res.data
      addBotMessage(data.reply || data.message || 'Hello! How can I help you?', {
        schemeId: data.schemeId,
        schemeName: data.schemeName,
      })
    } catch (err) {
      console.error('Chat error:', err)
      addBotMessage('Sorry, I could not connect to the server. Please try again.')
    } finally {
      setIsTyping(false)
    }
  }

  // On mount: send greeting
  useEffect(() => {
    const greetText = initialScheme
      ? `Tell me about ${initialScheme.name || initialScheme.scheme_name || 'this scheme'}`
      : ''
    sendMessage(greetText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    addUserMessage(text)
    setInput('')
    sendMessage(text)
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleChecklistRequest(schemeId, schemeName) {
    setChecklistScheme({ id: schemeId, name: schemeName })
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '600px' }}>
      {/* Header */}
      <div className="bg-whatsapp-green p-4 flex items-center gap-3 text-white shadow-sm">
        <div className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center font-bold">S</div>
        <div className="flex-1">
          <p className="font-semibold">SahayBot 🇮🇳</p>
          <p className="text-xs opacity-80">Government Scheme Assistant</p>
        </div>
        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full font-medium">
          {t.lang}
        </span>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 chat-scroll"
        style={{ backgroundColor: '#ECE5DD', minHeight: '450px', maxHeight: '450px' }}
      >
        {messages.map((msg, i) => (
          <Message
            key={i}
            msg={msg}
            language={language}
            onChecklistRequest={handleChecklistRequest}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>

      {/* Document Checklist Modal */}
      {checklistScheme && (
        <DocumentChecklist
          scheme={checklistScheme}
          language={language}
          onClose={() => setChecklistScheme(null)}
        />
      )}
    </div>
  )
}
