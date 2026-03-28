import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../lib/store';
import './AIAssistant.css';

const SendIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChipAIIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chip body */}
    <rect x="8" y="8" width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    {/* Pins top */}
    <line x1="12" y1="8" x2="12" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="12" cy="3.5" r="1.2" fill="currentColor"/>
    <line x1="20" y1="8" x2="20" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="20" cy="3.5" r="1.2" fill="currentColor"/>
    {/* Pins bottom */}
    <line x1="12" y1="24" x2="12" y2="28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="12" cy="28.5" r="1.2" fill="currentColor"/>
    <line x1="20" y1="24" x2="20" y2="28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="20" cy="28.5" r="1.2" fill="currentColor"/>
    {/* Pins left */}
    <line x1="8" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="3.5" cy="12" r="1.2" fill="currentColor"/>
    <line x1="8" y1="20" x2="4" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="3.5" cy="20" r="1.2" fill="currentColor"/>
    {/* Pins right */}
    <line x1="24" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="28.5" cy="12" r="1.2" fill="currentColor"/>
    <line x1="24" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="28.5" cy="20" r="1.2" fill="currentColor"/>
    {/* AI label */}
    <text x="16" y="20.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" fontFamily="sans-serif" letterSpacing="0.5">AI</text>
  </svg>
);

const QUICK_REPLIES_ES = [
  '¿Qué sucursales tienen?',
  '¿Tienen iPhone disponible?',
  '¿Qué métodos de pago aceptan?',
  '¿Hacen servicio técnico?',
];

const QUICK_REPLIES_EN = [
  'Where are your locations?',
  'Do you have iPhones available?',
  'What payment methods do you accept?',
  'Do you do tech repairs?',
];

export default function AIAssistant() {
  const { t, i18n } = useTranslation();
  const { aiOpen, toggleAI } = useUIStore();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('ai.greeting') }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickReplies = i18n.language === 'es' ? QUICK_REPLIES_ES : QUICK_REPLIES_EN;

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg = { role: 'user', content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Lo siento, no pude procesar tu consulta.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Hubo un error. Por favor contáctanos por WhatsApp: wa.me/584123621133'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!aiOpen && (
        <button className="ai-fab" onClick={toggleAI} aria-label="Asistente AI">
          <ChipAIIcon size={22} />
          <span className="ai-fab__label">Asistente AI</span>
          <span className="ai-fab__dot" />
        </button>
      )}

      {/* Chat panel */}
      <div className={`ai-panel${aiOpen ? ' ai-panel--open' : ''}`}>
        {/* Header */}
        <div className="ai-panel__header">
          <div className="ai-panel__header-info">
            <div className="ai-panel__avatar">
              <ChipAIIcon size={18} />
            </div>
            <div>
              <p className="ai-panel__title">{t('ai.title')}</p>
              <p className="ai-panel__status">
                <span className="ai-panel__dot" />
                En línea
              </p>
            </div>
          </div>
          <button className="ai-panel__close" onClick={toggleAI}><CloseIcon /></button>
        </div>

        {/* Messages */}
        <div className="ai-panel__messages">
          {messages.map((msg, i) => (
            <div key={i} className={`ai-msg ai-msg--${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="ai-msg__avatar"><ChipAIIcon size={16} /></div>
              )}
              <div className="ai-msg__bubble">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="ai-msg ai-msg--assistant">
              <div className="ai-msg__avatar"><ChipAIIcon size={16} /></div>
              <div className="ai-msg__bubble ai-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {/* Quick replies — only show after first message */}
          {messages.length === 1 && (
            <div className="ai-quick">
              {quickReplies.map(q => (
                <button key={q} className="ai-quick__btn" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="ai-panel__input-wrap">
          <textarea
            className="ai-panel__input"
            placeholder={t('ai.placeholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <button
            className={`ai-panel__send${input.trim() ? ' ai-panel__send--active' : ''}`}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}
