import React, { useState } from 'react';
import { Linkedin, Facebook, Instagram, Github, ArrowUp, Shield, FileText, X, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { DigilenceLogo } from './DigilenceLogo';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0614] border-t border-purple-500/20 pt-16 pb-12 text-slate-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-purple-500/15">
          
          {/* Logo & Info */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#hero" className="inline-block">
              <DigilenceLogo size="lg" lightText={true} />
            </a>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              We create AI-powered marketing systems, high-converting funnels, and scalable growth strategies that drive real business results. ROI isn't a goal. It's our baseline.
            </p>

            {/* Address & Contact Info */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>F2 WAPDA Town, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:hello@digilenceai.com" className="hover:text-[#C084FC] transition-colors">hello@digilenceai.com</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/05 hover:bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/05 hover:bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/05 hover:bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/05 hover:bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-[#C084FC] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#C084FC] transition-colors">Services</a></li>
              <li><a href="#ai-solutions" className="hover:text-[#C084FC] transition-colors">Solutions</a></li>
              <li><a href="#portfolio" className="hover:text-[#C084FC] transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-[#C084FC] transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#C084FC] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Solutions & Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-[#C084FC] transition-colors">AI Marketing Systems</a></li>
              <li><a href="#services" className="hover:text-[#C084FC] transition-colors">High-Converting Growth Funnels</a></li>
              <li><a href="#services" className="hover:text-[#C084FC] transition-colors">Custom Software Architecture</a></li>
              <li><a href="#services" className="hover:text-[#C084FC] transition-colors">Web & App Development</a></li>
              <li><a href="#services" className="hover:text-[#C084FC] transition-colors">Business Process Automation</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Digilence AI. All Rights Reserved. F2 WAPDA Town, Lahore.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/05 hover:bg-purple-600/30 border border-purple-500/30 text-[#C084FC] transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Legal Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#1A0B2E] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {modalType === 'privacy' ? <Shield className="w-5 h-5 text-[#C084FC]" /> : <FileText className="w-5 h-5 text-slate-300" />}
                {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-4 leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>At Digilence AI, we prioritize the confidentiality and security of our partners and client inquiries.</p>
                  <h4 className="font-bold text-white">Data Collection & Usage</h4>
                  <p>All contact information, project details, and business specifications submitted through our portal or WhatsApp are stored securely and used strictly for project estimation and communication.</p>
                  <h4 className="font-bold text-white">NDAs & Intellectual Property</h4>
                  <p>We honor strict non-disclosure agreements (NDAs). All proprietary code, custom AI models, and intellectual property developed during client engagements belong 100% to the client.</p>
                </>
              ) : (
                <>
                  <p>By using the Digilence AI platform and submitting project inquiries, you agree to the following terms:</p>
                  <h4 className="font-bold text-white">Engagements & Estimates</h4>
                  <p>Project hour estimates and budget breakdowns generated by our AI Estimator or preliminary forms are for planning purposes and subject to formal statement of work (SOW) agreement.</p>
                  <h4 className="font-bold text-white">Service Level Guarantees</h4>
                  <p>All deliverables undergo rigorous QA testing and security audits before production launch.</p>
                </>
              )}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
