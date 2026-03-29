import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Minimize2 } from 'lucide-react';
import { getAIResponse } from '../data/chatbot';
import './ChatBot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! 👋 I'm your HealthBridge AI Assistant. I can help with symptoms, medicine info, first aid, and health tips. How can I help you today?", time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEnd = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text: text.trim(), time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages(prev => [...prev, { sender: 'bot', text: response, time: new Date() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const quickQuestions = [
    "I have a fever",
    "Headache relief",
    "First aid guide",
    "Check my symptoms",
    "Anxiety help",
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className="chatbot-trigger" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
          <span className="chatbot-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window animate-scale-in">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h3>AI Health Assistant</h3>
                <span className="chatbot-status">
                  <span className="status-dot online"></span>
                  Online — Ready to help
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button onClick={() => setIsOpen(false)} className="chatbot-close">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                <div className="chat-message-avatar">
                  {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="chat-message-content">
                  <div className="chat-bubble" dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                      .replace(/• /g, '&bull; ')
                  }} />
                  <span className="chat-time">
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="chat-message-avatar"><Bot size={16} /></div>
                <div className="chat-message-content">
                  <div className="chat-bubble typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="chatbot-quick">
              {quickQuestions.map((q, i) => (
                <button key={i} className="quick-q-btn" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="chatbot-input-area">
            <button type="button" className={`voice-btn ${isListening ? 'listening' : ''}`} onClick={toggleVoice}>
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your health question..."}
              className="chatbot-input"
            />
            <button type="submit" className="send-btn" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
