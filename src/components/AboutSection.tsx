import React from 'react';
import { Target, Users, Shield, TrendingUp, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Innovation',
      desc: 'Integrating state-of-the-art AI research & modern frameworks to keep your product ahead.',
      icon: Target
    },
    {
      title: 'Collaboration',
      desc: 'Transparent daily engineering syncs, direct communication, and dedicated project management.',
      icon: Users
    },
    {
      title: 'Quality',
      desc: 'Zero-compromise code standards, 100% test coverage for critical paths, and SOC-2 level security.',
      icon: Shield
    },
    {
      title: 'Growth',
      desc: 'Architecting modular software that effortlessly handles 100x user and transaction growth.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0B1520] border-t border-white/08">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#19C6D1] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#19C6D1]" />
              About Degenlience AI
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight mb-6">
              More Than Developers. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C6D1] via-slate-300 to-white">Your Technology Partners.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#AAB8C4] leading-relaxed mb-8">
              Degenlience AI is a forward-thinking software house focused on building intelligent, scalable, and meaningful digital solutions. We combine Artificial Intelligence, creative design, and modern software engineering to help businesses compete and grow in a rapidly changing digital world.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/08 hover:border-[#19C6D1]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#19C6D1]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#19C6D1]" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                    </div>
                    <p className="text-xs text-[#AAB8C4] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Collaboration & Visual Representation */}
          <div className="lg:col-span-5">
            <div className="relative bg-glass-card rounded-[32px] p-6 border border-white/12 backdrop-blur-xl shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#101B26] p-6">
                
                <h3 className="text-base font-bold text-white mb-1">Our Engineering Ethos</h3>
                <p className="text-xs text-[#AAB8C4] mb-6">Delivering production-grade software with speed and elegance.</p>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#172633] border border-white/08 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Agile Development Cycles</span>
                    <span className="text-[10px] font-mono text-[#19C6D1] bg-[#19C6D1]/10 px-2 py-0.5 rounded">2-Week Sprints</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#172633] border border-white/08 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Direct Lead Architect Access</span>
                    <span className="text-[10px] font-mono text-slate-300 bg-slate-500/20 px-2 py-0.5 rounded">100% Dedicated</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#172633] border border-white/08 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Continuous Security Auditing</span>
                    <span className="text-[10px] font-mono text-slate-300 bg-slate-500/20 px-2 py-0.5 rounded">SOC-2 Ready</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
