import React from 'react';
import { Search, Compass, Palette, Code, Rocket, CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand the business, users, challenges, and goals.',
      icon: Search
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'Create the technical architecture and product roadmap.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Build intuitive user experiences and modern interfaces.',
      icon: Palette
    },
    {
      num: '04',
      title: 'Develop',
      desc: 'Develop secure, scalable, and high-performing solutions.',
      icon: Code
    },
    {
      num: '05',
      title: 'Launch & Grow',
      desc: 'Deploy, optimize, maintain, and improve the product.',
      icon: Rocket
    }
  ];

  return (
    <section id="process" className="relative py-24 bg-[#0B1520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#19C6D1] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit mx-auto">
            Our Execution Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            How We Turn Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C6D1] via-slate-300 to-white">Digital Products</span>
          </h2>
        </div>

        {/* Desktop Connected Horizontal Timeline / Mobile Vertical */}
        <div className="relative">
          
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#19C6D1]/20 via-slate-400/40 to-[#19C6D1]/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="group bg-glass-card rounded-[24px] p-6 border border-white/12 backdrop-blur-xl hover:border-[#19C6D1]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#101B26] border border-white/15 flex items-center justify-center group-hover:bg-[#19C6D1] transition-all duration-300 shadow-lg">
                        <Icon className="w-6 h-6 text-[#19C6D1] group-hover:text-[#0B1520] transition-colors" />
                      </div>
                      <span className="text-xl font-extrabold text-[#19C6D1] font-mono bg-[#19C6D1]/10 px-3 py-1 rounded-full border border-[#19C6D1]/20">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-[#F4F8FB] mb-2 group-hover:text-[#19C6D1] transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-[#AAB8C4] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/08 flex items-center gap-1.5 text-[11px] font-semibold text-[#A9D8FF]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#19C6D1]" />
                    <span>Phase {idx + 1} Milestone</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
