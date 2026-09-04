import React from 'react';
import { Cpu, Cloud, Globe, Smartphone, Zap, Database, Server, Terminal } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const techBadges = [
    { name: 'Artificial Intelligence', icon: Cpu, label: 'AI' },
    { name: 'Cloud Engineering', icon: Cloud, label: 'Cloud' },
    { name: 'Web Architecture', icon: Globe, label: 'Web' },
    { name: 'Mobile Ecosystems', icon: Smartphone, label: 'Mobile' },
    { name: 'Intelligent Automation', icon: Zap, label: 'Automation' },
    { name: 'Big Data & Analytics', icon: Database, label: 'Data' },
    { name: 'Server Infrastructure', icon: Server, label: 'Infra' },
    { name: 'API Systems', icon: Terminal, label: 'REST/gRPC' }
  ];

  return (
    <section className="relative py-12 bg-[#0B1520]/80 border-y border-white/08 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#AAB8C4] mb-8">
          Technology That Moves Businesses Forward
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-center">
          {techBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/08 hover:border-[#19C6D1]/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-white/05 group-hover:bg-[#19C6D1]/10 flex items-center justify-center mb-1.5 transition-colors">
                  <Icon className="w-4 h-4 text-[#AAB8C4] group-hover:text-[#19C6D1] transition-colors" />
                </div>
                <span className="text-[11px] font-bold text-[#F4F8FB] tracking-wide">
                  {badge.label}
                </span>
                <span className="text-[9px] text-[#AAB8C4] opacity-0 group-hover:opacity-100 transition-opacity">
                  Enterprise
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
