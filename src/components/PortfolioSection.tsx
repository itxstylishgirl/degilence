import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, X, Cpu, Layers, BarChart, Server, CheckCircle, Sparkles } from 'lucide-react';
import { PortfolioProject } from '../types';

interface PortfolioSectionProps {
  portfolio: PortfolioProject[];
  onOpenProjectForm: (projectName?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  onOpenProjectForm
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioProject | null>(null);

  const categories = ['All', 'AI & Automation', 'Web Applications', 'Enterprise Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-[#0D0614]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#A033FF]" />
            Selected Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F8FB] tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A033FF] to-[#8B5CF6]">Digital Work</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Explore a curated selection of growth systems engineered for modern businesses.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A033FF] text-white shadow-lg shadow-purple-600/30 font-bold'
                  : 'bg-white/05 text-slate-300 hover:text-white hover:bg-white/10 border border-purple-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-glass-card rounded-[28px] overflow-hidden border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-purple-900/30 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Preview */}
                <div className="relative h-56 w-full overflow-hidden bg-[#130A1F]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0614] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-[#130A1F]/90 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/30 text-[11px] font-bold text-[#C084FC]">
                    {project.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="text-xs font-mono text-slate-400 mb-1">
                    Client: {project.client}
                  </div>
                  <h3 className="text-xl font-bold text-[#F4F8FB] mb-3 group-hover:text-[#C084FC] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <span className="block text-xs font-extrabold text-[#C084FC]">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-[#C084FC] bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Interaction */}
              <div className="p-6 pt-0 border-t border-purple-500/20 mt-2">
                <button
                  onClick={() => setActiveCaseStudy(project)}
                  className="w-full mt-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-400 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C084FC]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#130A1F] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-purple-500/20 mb-6">
              <div>
                <span className="text-xs font-bold text-[#C084FC] uppercase tracking-wider">Case Study</span>
                <h3 className="text-2xl font-bold text-white mt-1">{activeCaseStudy.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Built for {activeCaseStudy.client}</p>
              </div>
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="p-2 rounded-full bg-white/05 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-purple-500/30">
              <img
                src={activeCaseStudy.imageUrl}
                alt={activeCaseStudy.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130A1F] via-transparent to-transparent opacity-60" />
            </div>

            {/* Long Description */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-white mb-2">Project Overview</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeCaseStudy.longDescription || activeCaseStudy.description}
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C084FC] mb-3">Key Results & Metrics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeCaseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-center">
                    <span className="text-base font-extrabold text-[#C084FC] block">{m}</span>
                    <span className="text-[10px] text-slate-400">Verified Impact</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            {activeCaseStudy.architectureDetails && (
              <div className="mb-6 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C084FC] mb-2">
                  <Server className="w-4 h-4 text-[#A033FF]" />
                  <span>Technical Architecture</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeCaseStudy.architectureDetails}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Technologies Employed</h4>
              <div className="flex flex-wrap gap-2">
                {activeCaseStudy.technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs font-mono text-[#C084FC] bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-500/20">
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeCaseStudy.title;
                  setActiveCaseStudy(null);
                  onOpenProjectForm(`Similar to ${title}`);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#A033FF] to-[#C084FC] hover:brightness-110 shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                Request Similar System
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
