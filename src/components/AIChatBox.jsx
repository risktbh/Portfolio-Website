import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const defaultResponses = {
  greeting:
    "Hello! I'm Ciel, Riski's portfolio AI companion. Ask me anything about Riski's projects, technical skills, or background!",
  projects:
    "Riski has built 4 key featured projects:\n• BelanjaTech: E-commerce with Post-Quantum ML-DSA Blockchain security.\n• KP-OWL (PT. Krakatau Posco): Enterprise Learning Management System.\n• ElevateHR: Full-Stack HR & Payroll platform.\n• Dokar Platform: Administrative personnel records platform.\nCheck the Featured Projects section for live panorama previews!",
  skills:
    "Riski's core expertise bridges AI Engineering and Full-Stack Development:\n• Languages & Frameworks: Next.js, React, TypeScript, Golang, Python, Java\n• AI & Agents: LangChain, pgvector, RAG, IBM Granite NLP\n• Backend & Database: PostgreSQL, Prisma ORM, REST APIs\n• Automation & Security: n8n, Docker, Cisco CCNA, CCEP Cybersecurity",
  contact:
    "You can reach Riski directly through:\n• Email: mardiantoriski5@gmail.com\n• LinkedIn: linkedin.com/in/riski-m\n• WhatsApp: +62 815-7577-4233\nHe is currently open to full-time, contract, or remote opportunities!",
  education:
    "Riski graduated with a Bachelor's Degree in Computer Engineering from Universitas Amikom Yogyakarta with a 3.74/4.00 GPA. His thesis implemented Post-Quantum ML-DSA signatures and Blockchain audit trails.",
  experience:
    "Riski's professional background includes:\n• Learning Management System Intern at PT. Krakatau Posco (Corporate LMS development & analytics dashboards)\n• Full-Stack Developer at PT Muti Jaya Sejahtera (HR & finance systems)",
  cv:
    "You can download Riski's official CV using the 'Download CV' button in the header or via his portfolio.",
  default:
    "Thanks for asking! I can provide details about Riski's projects, tech stack, academic background, or direct contact information. What would you like to know?",
};

const getAIResponse = (query) => {
  const q = query.toLowerCase();

  if (q.includes('project') || q.includes('portofolio') || q.includes('karya') || q.includes('belanja') || q.includes('posco') || q.includes('elevate') || q.includes('dokar')) {
    return defaultResponses.projects;
  }
  if (q.includes('skill') || q.includes('stack') || q.includes('teknologi') || q.includes('bahasa') || q.includes('langchain') || q.includes('next') || q.includes('python')) {
    return defaultResponses.skills;
  }
  if (q.includes('contact') || q.includes('hubungi') || q.includes('email') || q.includes('wa') || q.includes('whatsapp') || q.includes('hire') || q.includes('kerja')) {
    return defaultResponses.contact;
  }
  if (q.includes('education') || q.includes('kuliah') || q.includes('kampus') || q.includes('amikom') || q.includes('skripsi') || q.includes('thesis') || q.includes('gpa')) {
    return defaultResponses.education;
  }
  if (q.includes('experience') || q.includes('pengalaman') || q.includes('karir') || q.includes('kerja') || q.includes('magang') || q.includes('intern')) {
    return defaultResponses.experience;
  }
  if (q.includes('cv') || q.includes('resume') || q.includes('download')) {
    return defaultResponses.cv;
  }
  if (q.includes('halo') || q.includes('hello') || q.includes('hi') || q.includes('hai') || q.includes('siapa')) {
    return defaultResponses.greeting;
  }
  return defaultResponses.default;
};

const AIChatBox = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ciel',
      text: "Hi! I'm Ciel, Riski's AI assistant. Ask me anything about his projects, tech stack, or career background!",
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sendMessage = async (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      time: 'Just now',
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      // Map current conversation history to OpenAI role/content format
      const apiMessages = updatedMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (!data.reply) {
        throw new Error('No reply from server');
      }

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ciel',
        text: data.reply,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.warn('Backend chat API offline or unconfigured, using local fallback:', err);
      // Graceful local fallback for local development or when API key is missing
      const fallbackReply = getAIResponse(trimmed);
      const fallbackMessage = {
        id: Date.now() + 1,
        sender: 'ciel',
        text: fallbackReply,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (promptText) => {
    sendMessage(promptText);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledWrapper>
          <Motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            {/* Header / Nav Bar */}
            <div className="nav-bar">
              <div className="title-group">
                <span className="status-dot" />
                <a id="chat-title">Chat with Ciel</a>
                <span className="tag">AI</span>
              </div>
              <div
                className="close"
                onClick={onClose}
                role="button"
                tabIndex={0}
                aria-label="Close chat window"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onClose();
                  }
                }}
              >
                <div className="line one" />
                <div className="line two" />
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="quick-prompts">
              <button
                type="button"
                className="chip"
                onClick={() => handleQuickPrompt('Tell me about Featured Projects')}
              >
                🚀 Projects
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleQuickPrompt('What is your Tech Stack?')}
              >
                ⚡ Skills
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleQuickPrompt('How can I contact Riski?')}
              >
                📬 Contact
              </button>
            </div>

            {/* Messages Area with alternating chat bands */}
            <div className="messages-area">
              {messages.map((msg, index) => {
                const isEven = index % 2 === 0;
                const messageClass = `message ${isEven ? 'one' : 'two'} ${msg.sender}`;
                return (
                  <div key={msg.id} className={messageClass}>
                    <div className="message-content">
                      <div className="avatar-badge">
                        {msg.sender === 'ciel' ? 'C' : 'U'}
                      </div>
                      <div className="message-text">
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-1' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="message one ciel typing-msg">
                  <div className="message-content">
                    <div className="avatar-badge">C</div>
                    <div className="typing-indicator">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sender Area */}
            <div className="sender-area">
              <div className="input-place">
                <input
                  placeholder="Send a message..."
                  className="send-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <button
                  type="button"
                  className="send"
                  onClick={handleSend}
                  aria-label="Send message"
                >
                  <svg
                    className="send-icon"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <g>
                      <g>
                        <path
                          fill="currentColor"
                          d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </Motion.div>
        </StyledWrapper>
      )}
    </AnimatePresence>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 5.75rem;
  right: 1.5rem;
  z-index: 60;

  @media (min-width: 640px) {
    bottom: 6.25rem;
    right: 2rem;
  }

  .container {
    width: 320px;
    max-width: calc(100vw - 2.5rem);
    height: 390px;
    background-color: #343541;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(99, 102, 241, 0.22);
    border: 1px solid rgba(129, 140, 248, 0.35);
  }

  .nav-bar {
    width: 100%;
    height: 44px;
    background-color: #2E2F3A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .title-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #10b981;
    box-shadow: 0 0 6px #10b981;
  }

  .nav-bar a {
    color: #e2e8f0;
    font-size: 13.5px;
    font-weight: 600;
    white-space: nowrap;
    user-select: none;
    letter-spacing: -0.01em;
  }

  .tag {
    font-size: 9px;
    font-weight: 700;
    color: #a5b4fc;
    background: rgba(99, 102, 241, 0.25);
    border: 1px solid rgba(129, 140, 248, 0.35);
    padding: 1px 5px;
    border-radius: 9999px;
  }

  .close {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }

  .close:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .line {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #94a3b8;
    border-radius: 30px;
    transition: background-color 0.2s ease;
  }

  .close:hover .line {
    background-color: #ffffff;
  }

  .line.one {
    transform: rotate(45deg);
  }

  .line.two {
    transform: rotate(135deg);
  }

  .quick-prompts {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: #272832;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .quick-prompts::-webkit-scrollbar {
    display: none;
  }

  .chip {
    font-size: 10.5px;
    font-weight: 600;
    white-space: nowrap;
    padding: 3px 8px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.07);
    color: #cbd5e1;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chip:hover {
    background: rgba(99, 102, 241, 0.25);
    color: #ffffff;
    border-color: rgba(129, 140, 248, 0.4);
  }

  /* Refined dark background matching ChatGPT UI */
  .messages-area {
    background-color: #202123;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding: 6px 0;
    display: flex;
    flex-direction: column;
  }

  .message {
    width: 100%;
    padding: 10px 12px;
    transition: background-color 0.2s ease;
  }

  .message.one {
    background-color: #2E2F3A;
  }

  .message.two {
    background-color: #343541;
  }

  .message-content {
    display: flex;
    align-items: flex-start;
    gap: 9px;
  }

  .avatar-badge {
    width: 22px;
    height: 22px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .message.ciel .avatar-badge {
    background: #10a37f;
    color: #ffffff;
  }

  .message.user .avatar-badge {
    background: #6366f1;
    color: #ffffff;
  }

  .message-text {
    font-size: 12px;
    line-height: 1.5;
    color: #ececf1;
    word-break: break-word;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-top: 6px;
  }

  .typing-indicator .dot {
    width: 5px;
    height: 5px;
    background-color: #94a3b8;
    border-radius: 50%;
    animation: typingPulse 1.2s infinite ease-in-out;
  }

  .typing-indicator .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typingPulse {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }

  .sender-area {
    background-color: #343541;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .input-place {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #40414F;
    border-radius: 8px;
    height: 40px;
    width: 100%;
    gap: 6px;
    border: 1px solid #2E2F3A;
    padding: 0 6px 0 10px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .input-place:focus-within {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.25);
  }

  .send-input {
    outline: none;
    border: none;
    background: transparent;
    height: 100%;
    flex: 1;
    color: #ffffff;
    font-size: 12.5px;
  }

  .send-input::placeholder {
    color: #8E8EA0;
  }

  .send {
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 6px;
    color: #8E8EA0;
    transition: all 0.2s ease;
  }

  .send:hover {
    color: #ffffff;
    background-color: #2E2F3A;
  }

  .send-icon {
    width: 15px;
    height: 15px;
  }
`;

export default AIChatBox;
