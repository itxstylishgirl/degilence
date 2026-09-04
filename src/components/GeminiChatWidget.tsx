import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronDown } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const GeminiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hello! I am Degenlience Gemini AI Advisor. How can I assist you with custom AI software, project estimations, or student internships today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMsgText = inputValue.trim();
    setInputValue('');

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Format chat history for Gemini API
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          history
        })
      });

      const data = await res.json();

      const botReplyText = data.reply || "I'm here to help you build software or explore career opportunities at Degenlience AI!";

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat API Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'bot',
          text: 'Apologies, I encountered a temporary connection glitch. Please feel free to submit a direct message using our contact form!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-[#101B26] border border-white/20 text-white shadow-2xl hover:border-[#19C6D1] transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#19C6D1] to-slate-400 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-[#0B1520] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#19C6D1]" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              Gemini AI Advisor
              <span className="w-2 h-2 rounded-full bg-[#19C6D1] animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-400">Chat with AI Consultant</span>
          </div>
        </button>
      )}

      {/* Chat Window Overlay */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#101B26] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 bg-[#0B1520] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#19C6D1] to-slate-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#101B26] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#19C6D1]" />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Degenlience Gemini AI
                  <span className="text-[9px] font-mono bg-[#19C6D1]/20 text-[#19C6D1] px-1.5 py-0.5 rounded border border-[#19C6D1]/30">
                    3.8 FLASH
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Live AI Solutions & Internship Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#0B1520] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#19C6D1]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-[#19C6D1] text-[#101B26] font-medium rounded-tr-none'
                      : 'bg-[#0B1520] border border-white/10 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] text-right ${
                      msg.sender === 'user' ? 'text-[#101B26]/70' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#19C6D1]/20 border border-[#19C6D1]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-[#19C6D1]" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-lg bg-[#0B1520] border border-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#19C6D1] animate-pulse" />
                </div>
                <div className="px-3.5 py-2 rounded-2xl bg-[#0B1520] border border-white/10 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#19C6D1]" />
                  <span className="text-[11px]">Gemini AI thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-3 py-2 bg-[#0B1520]/80 border-t border-white/05 flex items-center gap-2 overflow-x-auto text-[10px] text-slate-300 no-scrollbar">
            <button
              onClick={() => setInputValue('How can I apply for an internship?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 shrink-0 cursor-pointer"
            >
              🎓 Internships?
            </button>
            <button
              onClick={() => setInputValue('What AI services do you build?')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 shrink-0 cursor-pointer"
            >
              🤖 AI Services?
            </button>
            <button
              onClick={() => setInputValue('Estimate budget for custom AI software')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 shrink-0 cursor-pointer"
            >
              💰 Price Estimate?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#0B1520] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Gemini AI anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#101B26] border border-white/12 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#19C6D1]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="p-2 rounded-xl bg-[#19C6D1] hover:bg-[#15b0ba] text-[#101B26] font-bold disabled:opacity-50 cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
