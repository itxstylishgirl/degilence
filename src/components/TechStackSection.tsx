import React, { useState } from 'react';
import { TECH_STACK } from '../data/initialData';
import { Layers, Server, Cpu, Smartphone, Database, Terminal } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'ai' | 'mobile' | 'cloud'>('all');

  const categories = [
    { id: 'all', name: 'All Stack' },
    { id: 'frontend', name: 'Frontend', icon: Layers },
    { id: 'backend', name: 'Backend', icon: Server },
    { id: 'ai', name: 'AI & Data', icon: Cpu },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'cloud', name: 'Cloud & Database', icon: Database }
  ];

  const allItems = [
    ...TECH_STACK.frontend.map(item => ({ name: item, cat: 'Frontend' })),
    ...TECH_STACK.backend.map(item => ({ name: item, cat: 'Backend' })),
    ...TECH_STACK.aiAndData.map(item => ({ name: item, cat: 'AI & Data' })),
    ...TECH_STACK.mobile.map(item => ({ name: item, cat: 'Mobile' })),
    ...TECH_STACK.cloudAndDatabase.map(item => ({ name: item, cat: 'Cloud & Database' }))
  ];

  const getFilteredItems = () => {
    switch (activeTab) {
      case 'frontend':
        return TECH_STACK.frontend.map(i => ({ name: i, cat: 'Frontend' }));
      case 'backend':
        return TECH_STACK.backend.map(i => ({ name: i, cat: 'Backend' }));
      case 'ai':
        return TECH_STACK.aiAndData.map(i => ({ name: i, cat: 'AI & Data' }));
      case 'mobile':
        return TECH_STACK.mobile.map(i => ({ name: i, cat: 'Mobile' }));
      case 'cloud':
        return TECH_STACK.cloudAndDatabase.map(i => ({ name: i, cat: 'Cloud & Database' }));
      case 'all':
      default:
        return allItems;
    }
  };

  return (
    <section className="relative py-24 bg-[#0B1520] border-t border-white/08">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#19C6D1] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit mx-auto">
            Engineering Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Built With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19C6D1] via-slate-300 to-white">Modern Technology</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id as any)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === c.id
                  ? 'bg-[#19C6D1] text-[#101B26] font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/05 text-[#AAB8C4] hover:text-white hover:bg-white/10 border border-white/08'
              }`}
            >
              {c.icon && <c.icon className="w-3.5 h-3.5" />}
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {getFilteredItems().map((item, idx) => (
            <div
              key={idx}
              className="group bg-glass-card rounded-2xl p-4 border border-white/10 hover:border-[#19C6D1]/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-950/30 flex flex-col items-center justify-center text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-[#101B26] border border-white/10 flex items-center justify-center mb-2.5 group-hover:bg-[#19C6D1]/10 group-hover:border-[#19C6D1]/30 transition-colors">
                <Terminal className="w-5 h-5 text-[#19C6D1]" />
              </div>
              <span className="text-xs font-bold text-[#F4F8FB] tracking-wide">
                {item.name}
              </span>
              <span className="text-[10px] text-[#AAB8C4] mt-0.5">
                {item.cat}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
