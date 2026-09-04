import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Activity, Cpu, Globe, Smartphone, Zap, Phone, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenProjectForm: () => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectForm, onOpenEstimator }) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-mesh bg-grid-pattern">
      {/* Background Radial Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gradient-hero pointer-events-none blur-3xl opacity-70" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#A033FF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Copy & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            
            {/* Top Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-purple-800/40 border border-purple-500/40 text-[#C084FC] text-xs font-bold tracking-wide shadow-lg shadow-purple-900/30 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A033FF] animate-pulse" />
              <span>ROI isn't a goal. It's our baseline.</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.08] font-extrabold mb-6 tracking-tight text-[#F4F8FB]"
            >
              We create{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">
                AI-powered marketing systems
              </span>
              , high-converting funnels, and scalable growth strategies.
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-slate-300 text-base sm:text-lg max-w-xl mb-6 leading-relaxed font-normal"
            >
              Transform your business with intelligent automation and precision customer acquisition systems engineered to drive real, profitable business results.
            </motion.p>

            {/* Location Info */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 mb-8 p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs w-full sm:w-auto text-slate-300"
            >
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>F2 WAPDA Town, Lahore, Pakistan</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto"
            >
              <button
                onClick={onOpenProjectForm}
                className="bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] hover:brightness-110 text-white px-8 py-4 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="bg-white/5 hover:bg-white/10 text-white border border-purple-500/30 hover:border-purple-400 px-6 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C084FC]" />
                <span>Calculate Scope & Cost</span>
              </button>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Glassmorphism Visual Composition with Motion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            {/* Background Light Glow Behind Composition */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#A033FF]/30 to-[#7C3AED]/30 blur-2xl opacity-80 -z-10 animate-pulse-glow" />

            {/* Main Rounded Glass Display Card */}
            <div className="relative bg-glass-card rounded-3xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-950/60 backdrop-blur-xl overflow-hidden">
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400">digilence-ai-system v3.0</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#C084FC] font-mono bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-400/30">
                  <Activity className="w-3 h-3 animate-spin text-[#A033FF]" />
                  LIVE • FUNNEL ACTIVE
                </div>
              </div>

              {/* Main Futuristic Neural Matrix Surface */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-[#0D0614] border border-purple-500/30 overflow-hidden flex items-center justify-center p-4">
                {/* SVG Neural Matrix Nodes & Connections Visual */}
                <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 400 300" fill="none">
                  <line x1="50" y1="50" x2="180" y2="120" stroke="#A033FF" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="180" y1="120" x2="320" y2="80" stroke="#C084FC" strokeWidth="1.5" />
                  <line x1="180" y1="120" x2="250" y2="220" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="320" y1="80" x2="350" y2="240" stroke="#A033FF" strokeWidth="1" />
                  <line x1="80" y1="220" x2="250" y2="220" stroke="#7C3AED" strokeWidth="1" strokeDasharray="3 3" />
                  
                  <circle cx="50" cy="50" r="6" fill="#A033FF" className="animate-ping" />
                  <circle cx="50" cy="50" r="4" fill="#A033FF" />
                  <circle cx="180" cy="120" r="10" fill="#0D0614" stroke="#A033FF" strokeWidth="3" />
                  <circle cx="320" cy="80" r="7" fill="#C084FC" />
                  <circle cx="250" cy="220" r="8" fill="#8B5CF6" />
                  <circle cx="80" cy="220" r="5" fill="#A033FF" />
                  <circle cx="350" cy="240" r="6" fill="#7C3AED" />
                </svg>

                {/* Central AI Architecture Widget */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full max-w-xs bg-[#1A0B2E]/90 backdrop-blur-md rounded-2xl p-4 border border-purple-500/40 shadow-2xl text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#A033FF] p-0.5 flex items-center justify-center shadow-lg shadow-purple-600/40">
                    <div className="w-full h-full bg-[#130A1F] rounded-[10px] flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-[#C084FC]" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white">AI Marketing Funnel Engine</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">High-converting customer pipeline</p>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-left">
                    <div className="p-2 rounded-lg bg-white/05 border border-purple-500/20">
                      <div className="text-[10px] text-slate-400">ROI Baseline</div>
                      <div className="text-xs font-bold text-[#C084FC]">3.8x Target</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/05 border border-purple-500/20">
                      <div className="text-[10px] text-slate-400">Conversion</div>
                      <div className="text-xs font-bold text-emerald-400">+142% Avg</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Mini Information Cards Stacked Around Visual */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                
                {/* Mini Card 1: AI Marketing */}
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-purple-500/20 hover:border-purple-400 transition-all duration-300 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-400/30">
                    <Zap className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">AI Marketing</div>
                    <div className="text-[10px] text-slate-400">Smart Funnels</div>
                  </div>
                </div>

                {/* Mini Card 2: Growth Funnels */}
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-purple-500/20 hover:border-purple-400 transition-all duration-300 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-400/30">
                    <Globe className="w-4 h-4 text-[#A033FF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Growth Funnels</div>
                    <div className="text-[10px] text-slate-400">High-Converting</div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

