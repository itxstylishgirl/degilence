import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="relative py-24 bg-[#0D0614]">
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
            Client Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">Clients Say</span>
          </h2>
        </motion.div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-glass-card rounded-[28px] p-8 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-purple-900/30 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C084FC] text-[#C084FC]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#A033FF]/30 group-hover:text-[#A033FF]/60 transition-colors" />
                </div>

                {/* Quote Body */}
                <p className="text-sm text-[#F4F8FB] leading-relaxed italic mb-8 font-normal">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 border-t border-purple-500/20 flex items-center gap-4">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {t.clientName}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C084FC]" />
                  </h4>
                  <p className="text-xs text-slate-300">{t.role}, {t.company}</p>
                  <span className="inline-block mt-1 text-[10px] text-[#C084FC] bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    {t.projectType}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
