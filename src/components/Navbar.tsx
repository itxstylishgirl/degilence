import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles, GraduationCap, Phone } from 'lucide-react';
import { DigilenceLogo } from './DigilenceLogo';

interface NavbarProps {
  onOpenProjectForm: () => void;
  onOpenEstimator: () => void;
  onOpenAdmin: () => void;
  onOpenStudentPortal: () => void;
  unreadLeadsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjectForm,
  onOpenEstimator,
  onOpenAdmin,
  onOpenStudentPortal,
  unreadLeadsCount = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#ai-solutions' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Jobs & Internships', href: '#jobs' },
    { name: 'Products & Courses', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#130A1F]/90 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/40 py-3 px-4 sm:px-6'
            : 'bg-white/[0.04] backdrop-blur-md border border-white/10 py-4 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* LEFT: Digilence AI Logo */}
          <a href="#hero" className="flex items-center cursor-pointer">
            <DigilenceLogo size="md" lightText={true} />
          </a>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-[11px] font-semibold text-slate-300 uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-[#A033FF]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* RIGHT: WhatsApp, CTAs, Student Portal & Admin Access */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Student Portal Trigger */}
            <button
              onClick={onOpenStudentPortal}
              className="text-[11px] font-bold text-purple-300 uppercase tracking-wider hover:text-white bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              title="Access Student & Customer Portal"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Portal
            </button>

            {/* AI Scope Estimator Trigger */}
            <button
              onClick={onOpenEstimator}
              className="text-[11px] font-bold text-slate-300 uppercase tracking-wider hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-purple-400/40 px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              title="Calculate estimated hours & project scope"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
              AI Estimator
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="relative text-[11px] font-bold text-slate-300 uppercase tracking-wider hover:text-[#F4F8FB] bg-white/[0.04] hover:bg-white/08 border border-white/10 px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              title="Admin Control Center"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Admin
              {unreadLeadsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#A033FF] animate-ping" />
              )}
            </button>

            {/* Main Primary CTA */}
            <button
              onClick={onOpenProjectForm}
              className="bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] hover:brightness-110 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ml-1"
            >
              <span>Book Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="https://wa.me/923143905772"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold px-2.5 py-1.5 rounded-full text-white bg-[#25D366] flex items-center gap-1"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/05 border border-white/10 text-[#F4F8FB] hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden pt-4 pb-3 border-t border-white/10 mt-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-[#F4F8FB] px-3 py-2 rounded-lg hover:bg-white/05 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/08 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentPortal();
                }}
                className="w-full text-left text-xs font-medium text-purple-300 px-3 py-2 rounded-lg bg-purple-500/10 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Student & Customer Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full text-left text-xs font-medium text-slate-300 px-3 py-2 rounded-lg bg-white/05 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C084FC]" />
                  Launch AI Project Estimator
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-left text-xs font-medium text-slate-400 px-3 py-2 rounded-lg bg-white/05 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                Admin Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectForm();
                }}
                className="w-full mt-1 text-center py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] shadow-lg shadow-purple-600/30"
              >
                Book a Demo / Start Project
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
