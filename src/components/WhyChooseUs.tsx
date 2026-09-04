import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Wrench, TrendingUp, Handshake, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We combine modern AI technology with practical business growth strategy.',
      accentColor: '#C084FC'
    },
    {
      icon: Wrench,
      title: 'Custom Built',
      description: 'No generic templates. Every funnel and system is tailored directly to your revenue targets.',
      accentColor: '#A033FF'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Systems',
      description: 'Automated infrastructure designed to handle rapidly growing lead volumes effortlessly.',
      accentColor: '#8B5CF6'
    },
    {
      icon: Handshake,
      title: 'End-to-End Partnership',
      description: 'From initial architecture and strategy to ongoing optimization and support.',
      accentColor: '#C084FC'
    }
  ];

  return (
    <section className="relative py-24 bg-[#0D0614] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#A033FF]" />
            The Digilence Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Why Businesses Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">Digilence AI</span>
          </h2>
        </motion.div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-glass-card rounded-[28px] p-8 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-purple-900/30 flex flex-col justify-between"
              >
                <div>
                  {/* Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#170B28] border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#C084FC]" />
                    </div>
                    <span className="text-2xl font-black text-purple-500/20 group-hover:text-[#C084FC]/40 transition-colors font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F4F8FB] mb-3 group-hover:text-[#C084FC] transition-colors">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Bottom Highlight line */}
                <div className="w-12 h-1 rounded-full bg-purple-500/20 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#C084FC] transition-all duration-300 mt-8" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
