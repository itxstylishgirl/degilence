import React from 'react';
import { CheckCircle2, Sparkles, Cpu, Bot, ArrowRight, Layers, BarChart3, Lock } from 'lucide-react';

interface AISolutionsSectionProps {
  onOpenEstimator: () => void;
  onOpenProjectForm: (serviceName?: string) => void;
}

export const AISolutionsSection: React.FC<AISolutionsSectionProps> = ({
  onOpenEstimator,
  onOpenProjectForm
}) => {
  const checklist = [
    'AI Chatbots & Conversational Agents',
    'AI Automation & ETL Pipelines',
    'Intelligent Business Tools & SaaS',
    'Data-Powered Insights & Analytics',
    'Custom AI Integrations & API Wrappers'
  ];

  return (
    <section id="ai-solutions" className="relative py-24 bg-[#0B1520] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#19C6D1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Futuristic AI Brain / Interface Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-glass-card rounded-[32px] p-6 border border-white/12 backdrop-blur-xl shadow-2xl overflow-hidden group">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs">
                <span className="font-mono text-[#19C6D1] flex items-center gap-1.5 font-bold">
                  <Bot className="w-4 h-4 text-[#19C6D1]" />
                  DEGEN-AI AGENT MATRIX
                </span>
                <span className="text-[10px] text-[#AAB8C4] font-mono">STATUS: ACTIVE</span>
              </div>

              {/* Central Neural Brain Graphic Stage */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#101B26] border border-white/10 flex items-center justify-center overflow-hidden p-6">
                
                {/* SVG Digital Brain Nodes & Cyan Glow Rays */}
                <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 400 400" fill="none">
                  {/* Concentric neural rings */}
                  <circle cx="200" cy="200" r="140" stroke="#19C6D1" strokeWidth="1" strokeDasharray="4 8" className="animate-spin-slow" />
                  <circle cx="200" cy="200" r="100" stroke="#94A3B8" strokeWidth="1.5" />
                  <circle cx="200" cy="200" r="60" stroke="#19C6D1" strokeWidth="2" />
                  
                  {/* Neural connections */}
                  <line x1="200" y1="60" x2="200" y2="340" stroke="#19C6D1" strokeWidth="1" />
                  <line x1="60" y1="200" x2="340" y2="200" stroke="#19C6D1" strokeWidth="1" />
                  <line x1="100" y1="100" x2="300" y2="300" stroke="#94A3B8" strokeWidth="1" />
                  <line x1="300" y1="100" x2="100" y2="300" stroke="#94A3B8" strokeWidth="1" />
                  
                  {/* Glowing Node Points */}
                  <circle cx="200" cy="60" r="6" fill="#19C6D1" />
                  <circle cx="340" cy="200" r="6" fill="#94A3B8" />
                  <circle cx="200" cy="340" r="6" fill="#19C6D1" />
                  <circle cx="60" cy="200" r="6" fill="#94A3B8" />
                  <circle cx="300" cy="100" r="5" fill="#CBD5E1" />
                  <circle cx="100" cy="300" r="5" fill="#CBD5E1" />
                </svg>

                {/* Central AI Processor Core */}
                <div className="relative z-10 flex flex-col items-center text-center bg-[#172633]/95 backdrop-blur-xl border border-[#19C6D1]/40 rounded-3xl p-6 shadow-2xl max-w-xs">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#19C6D1] to-slate-400 p-0.5 mb-3 shadow-lg shadow-cyan-500/30">
                    <div className="w-full h-full bg-[#0B1520] rounded-[14px] flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-[#19C6D1] animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-base font-extrabold text-white">RAG & Agent Engine</h4>
                  <p className="text-xs text-[#AAB8C4] mt-1">Multi-modal knowledge integration & tool execution</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#19C6D1] bg-[#19C6D1]/10 px-3 py-1 rounded-full border border-[#19C6D1]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Zero-shot Accuracy: 99.6%
                  </div>
                </div>

                {/* Floating Micro Interface Widgets */}
                <div className="absolute top-4 left-4 bg-glass-surface rounded-xl p-2.5 border border-white/20 text-slate-900 shadow-lg text-[10px] font-bold flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Real-Time Inference</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#172633]/90 border border-white/12 rounded-xl p-2.5 shadow-lg text-[10px] text-white flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#19C6D1]" />
                  <span>SOC-2 Enterprise Security</span>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: Content Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#19C6D1] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#19C6D1]" />
              Intelligence At Scale
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight mb-6">
              AI That Works for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C6D1] via-slate-300 to-white">Your Business</span>.
            </h2>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-[#AAB8C4] leading-relaxed mb-8">
              We design practical Artificial Intelligence solutions that help businesses automate processes, understand data, improve customer experiences, and unlock new opportunities.
            </p>

            {/* Checklist */}
            <div className="space-y-3 mb-8 w-full">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/08 hover:border-[#19C6D1]/30 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-[#19C6D1] shrink-0" />
                  <span className="text-sm font-semibold text-[#F4F8FB]">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenProjectForm('Artificial Intelligence Solutions')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#101B26] bg-[#19C6D1] hover:bg-[#15b0ba] shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Explore AI Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-300 bg-white/05 hover:bg-white/10 border border-white/12 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#19C6D1]" />
                <span>Estimate AI ROI & Hours</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
