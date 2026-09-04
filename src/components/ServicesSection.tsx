import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Code2, Globe, Smartphone, Zap, Layout, ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenProjectForm: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onOpenProjectForm }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#C084FC]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#A033FF]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#8B5CF6]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#C084FC]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#A033FF]" />;
      case 'Layout':
      default:
        return <Layout className="w-6 h-6 text-[#8B5CF6]" />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#0D0614]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#A033FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#A033FF]" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">Expertise</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From intelligent AI systems to high-converting marketing funnels, we build technology designed to drive real growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-glass-card rounded-[24px] p-8 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-purple-900/30 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#170B28] border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-purple-400/60 transition-all duration-300 shadow-md">
                  {getIcon(service.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#F4F8FB] mb-3 group-hover:text-[#C084FC] transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {service.shortDescription}
                </p>

                {/* Key Bullet Feature Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {service.features.slice(0, 2).map((feat, idx) => (
                    <span key={idx} className="text-[11px] font-medium text-[#C084FC] bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interaction Link */}
              <button
                onClick={() => setActiveModalService(service)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C084FC] group-hover:text-white transition-colors cursor-pointer pt-4 border-t border-purple-500/20"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Drawer Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#130A1F] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-purple-500/20 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#170B28] border border-purple-500/30 flex items-center justify-center">
                  {getIcon(activeModalService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#C084FC] uppercase tracking-wider">Service Overview</span>
                  <h3 className="text-2xl font-bold text-white">{activeModalService.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-2 rounded-full bg-white/05 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {activeModalService.fullDescription}
            </p>

            {/* Key Features List */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C084FC] mb-3">Key Deliverables</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                    <Check className="w-4 h-4 text-[#A033FF] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#F4F8FB] font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalService.technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs font-mono text-[#C084FC] bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-500/20">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeModalService.title;
                  setActiveModalService(null);
                  onOpenProjectForm(title);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] hover:brightness-110 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                Inquire For This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
