import React, { useState } from 'react';
import { MessageCircle, X, Send, MapPin, Sparkles } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phoneNumber = '923143905772';
  const locationText = 'F2 WAPDA Town, Lahore, Pakistan';

  const handleSendWhatsApp = (msgText?: string) => {
    const textToSend = msgText || customMsg || 'Hello Digilence AI! I would like to inquire about your AI marketing systems and software development services.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating WhatsApp Logo Button (Static Overlay across entire website) */}
      {!isOpen && (
        <div className="relative group">
          {/* Pulsing Aura */}
          <div className="absolute -inset-1 rounded-full bg-[#A033FF] opacity-75 blur animate-pulse" />
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] text-white shadow-2xl hover:brightness-110 transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white/20 shadow-purple-600/40"
            title="Chat with Digilence AI on WhatsApp"
            aria-label="WhatsApp Contact"
          >
            {/* WhatsApp Official SVG Logo */}
            <svg
              className="w-8 h-8 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.105 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#A033FF] border-2 border-white text-[9px] font-black text-white items-center justify-center">
                1
              </span>
            </span>
          </button>
        </div>
      )}

      {/* WhatsApp Popup Card */}
      {isOpen && (
        <div className="w-[320px] sm:w-[360px] bg-[#130A1F] border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden text-white backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.105 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-2">
                  Digilence AI Support
                </h4>
                <p className="text-[10px] text-white/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Typically replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-black/20 hover:bg-black/30 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Info */}
          <div className="p-4 space-y-3 bg-[#130A1F] text-xs">
            {/* Quick Location Info */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center gap-2 text-slate-300 text-[11px]">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{locationText}</span>
            </div>

            {/* Chat greeting bubble */}
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-500/30 text-slate-200 text-xs leading-relaxed">
              👋 Hi there! Welcome to <strong>Digilence AI</strong>. How can we help you build AI-powered marketing systems, funnels, or custom software?
            </div>

            {/* Predefined Quick Questions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Quick Options:</span>
              <button
                onClick={() => handleSendWhatsApp('Hi, I need a consultation for an AI Marketing System & Funnel.')}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-400/50 text-xs text-slate-200 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>🚀 AI Marketing System Inquiry</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </button>
              <button
                onClick={() => handleSendWhatsApp('Hello! I would like to inquire about Student Internships in Lahore.')}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-400/50 text-xs text-slate-200 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>🎓 Internship & Course Inquiries</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>

            {/* Direct Open WhatsApp Button */}
            <div className="pt-2">
              <button
                onClick={() => handleSendWhatsApp()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-purple-600/30"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.105 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z" />
                </svg>
                <span>Start Direct WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

