import React from 'react';
import { ArrowRight, Sparkles, Calendar, MessageSquare } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenProjectForm: () => void;
  onOpenEstimator: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenProjectForm,
  onOpenEstimator
}) => {
  return (
    <section className="relative py-24 bg-[#0B1520] overflow-hidden">
      {/* Radial Background Glow Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-radial-glow-cyan pointer-events-none opacity-60 blur-3xl" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="bg-glass-card rounded-[36px] p-8 sm:p-14 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#19C6D1] text-[10px] font-bold tracking-widest uppercase mb-6 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#19C6D1]" />
            Let's Create The Future
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F4F8FB] tracking-tight leading-tight mb-6">
            Have an Idea? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C6D1] via-slate-300 to-white">Let's Build Something Intelligent.</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#AAB8C4] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Tell us about your project and discover how Degenlience AI can turn your vision into a powerful digital solution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenProjectForm}
              className="bg-[#19C6D1] hover:bg-[#15b0ba] text-[#101B26] px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenEstimator}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#19C6D1]" />
              <span>Book a Free Consultation</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
