'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  Leaf, 
  MessageSquare,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const SUGGESTIONS = [
  "🌿 Benefits of Moringa Soup?",
  "🥤 How to prepare ABC Malt?",
  "🍫 Is Choco Malt sugar-free?",
  "🚚 Shipping & Delivery policy?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "👋 **Hello & Welcome to Ayurmor Wellness!**\n\nI am your **AI Assistant**. I know all about our 100% natural organic mixes, ingredients, health benefits, usage instructions, and order policies.\n\nHow can I help you today? Feel free to select a topic below or type your question!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Build history context for API call
      const history = messages
        .filter(m => m.id !== 'welcome-1')
        .slice(-6)
        .map(m => ({ sender: m.sender, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history })
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "I'm sorry, I ran into an issue retrieving the answer. Please try asking again!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "Connection error. Please check your network connection and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: "👋 Chat reset! How else can I assist you with Ayurmor wellness products?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to format bot responses nicely (bold text, lists, line breaks)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Bold text replacement **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-[#0F3D2E]">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <span key={lineIdx} className="block min-h-[1.2em]">
          {formattedLine}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#0F3D2E] to-[#1b5e47] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-amber-200/30 hover:border-amber-300 transition-all duration-300"
          aria-label="Toggle AI Wellness Assistant"
        >
          {/* Animated Glow Pulse */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />

          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          )}

          {/* Unread indicator badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 bg-[#E7977D] text-[#0F3D2E] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow border border-white animate-bounce">
              AI
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-22 left-4 sm:bottom-24 sm:left-8 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[calc(100vh-140px)] bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6] rounded-3xl shadow-2xl border border-[#0F3D2E]/10 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#0F3D2E] text-white px-5 py-4 flex items-center justify-between shadow-md relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center relative shadow-inner">
                  <Bot className="w-5 h-5 text-amber-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0F3D2E] rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base tracking-wide text-white flex items-center gap-1.5">
                    Ayurmor AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 inline" />
                  </h3>
                  <p className="text-[11px] text-emerald-200/90 font-light flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Powered by Gemini AI • Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="bg-[#0F3D2E]/5 px-4 py-2.5 border-b border-[#0F3D2E]/5 overflow-x-auto flex items-center gap-2 no-scrollbar scrollbar-none">
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug)}
                  disabled={isLoading}
                  className="whitespace-nowrap text-[11px] font-medium bg-white/80 hover:bg-[#0F3D2E] hover:text-white text-[#0F3D2E] px-3 py-1.5 rounded-full border border-[#0F3D2E]/15 shadow-sm transition-all duration-200 active:scale-95 flex-shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-[#0F3D2E] text-amber-300 flex items-center justify-center flex-shrink-0 shadow mt-0.5">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl shadow-sm leading-relaxed text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#0F3D2E] to-[#175340] text-white rounded-tr-none'
                        : 'bg-white border border-[#0F3D2E]/10 text-charcoal rounded-tl-none font-sans'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                    <span
                      className={`block text-[9px] mt-1.5 text-right font-light ${
                        msg.sender === 'user' ? 'text-white/60' : 'text-sage-grey'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5 items-center justify-start text-xs text-sage-grey"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#0F3D2E] text-amber-300 flex items-center justify-center shadow">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-[#0F3D2E]/10 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#0F3D2E]/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-[#0F3D2E]/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-[#0F3D2E]/60 rounded-full animate-bounce" />
                    <span className="text-[11px] font-medium text-[#0F3D2E]/70 ml-1">Ayurmor AI thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#0F3D2E]/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products, ingredients, usage..."
                disabled={isLoading}
                className="flex-1 bg-cream/50 border border-[#0F3D2E]/15 rounded-full px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-[#0F3D2E] focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-[#0F3D2E] text-white rounded-full flex items-center justify-center shadow hover:bg-[#175340] active:scale-95 disabled:bg-sage-grey disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
