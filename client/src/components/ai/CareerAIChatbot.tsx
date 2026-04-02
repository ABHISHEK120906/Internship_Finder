import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, Sparkles, RefreshCw } from 'lucide-react';
import axios from 'axios';

const CareerAIChatbot: React.FC<{ primaryColor: string }> = ({ primaryColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: '👋 Hello! I am your Claude-powered Career Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${baseURL}/ai/chat`, { 
        messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) 
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="w-[400px] h-[600px] bg-[#1a1a1a] border border-white/10 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden mb-6">
            
            {/* Header */}
            <div className="p-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border border-white/5" style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="font-black tracking-tight text-white uppercase text-sm">Claude Career AI</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Assistant</span>
                  </div>
                </div>
              </div>
              <button aria-label="Close Chat" onClick={() => setIsOpen(false)} className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white transition-all"><X size={20} /></button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}>
                  {msg.role === 'assistant' && <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 border border-white/5"><Bot size={16} /></div>}
                  <div className={`max-w-[75%] p-4 text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-[#FFD700] text-black rounded-[24px_24px_4px_24px]' : 'bg-white/5 text-white/80 rounded-[24px_24px_24px_4px] border border-white/5'}`} style={{ backgroundColor: msg.role === 'user' ? primaryColor : undefined }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 border border-white/5"><RefreshCw size={16} className="animate-spin" /></div>
                  <div className="bg-white/5 p-4 rounded-[24px_24px_24px_4px] flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Footer / Input */}
            <form onSubmit={handleSend} className="p-6 bg-white/[0.03] border-t border-white/5 flex gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about roles, resumes..." className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/20 focus:bg-white/10 transition-all outline-none" />
              <button aria-label="Send Message" disabled={loading} type="submit" className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl group hover:scale-105 active:scale-95 disabled:opacity-50" style={{ backgroundColor: primaryColor, color: primaryColor === '#FFD700' ? 'black' : 'white' }}>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button aria-label="Toggle Chatbot" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="w-[84px] h-[84px] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div key="icon" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <MessageCircle size={36} color={primaryColor === '#FFD700' ? 'black' : 'white'} />
            </motion.div>
          ) : (
            <motion.div key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <X size={36} color={primaryColor === '#FFD700' ? 'black' : 'white'} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-4 border-black rounded-full box-content"></div>
      </motion.button>
    </div>
  );
};

export default CareerAIChatbot;
