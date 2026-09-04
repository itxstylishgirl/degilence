import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Building2, Users, Code, Award, Home, ChevronRight as BreadcrumbArrow } from 'lucide-react';

interface SoftwareHouseSliderProps {
  onOpenProjectForm: () => void;
}

const slides = [
  {
    id: 1,
    title: "Luxury AI Software House & Innovation Tower",
    subtitle: "Digilence AI Executive Headquarters • Lahore, Pakistan",
    description: "Our world-class engineering studio builds high-converting enterprise AI systems, bespoke automation, and luxury web experiences.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=95",
    tag: "Luxury Headquarters",
    stat: "50+ Senior Engineers"
  },
  {
    id: 2,
    title: "Executive AI Command Center & Lab",
    subtitle: "High-Performance GPU Clusters & Automation",
    description: "Equipped with state-of-the-art AI architecture, deep learning infrastructure, and real-time data streaming capabilities.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2400&q=95",
    tag: "AI Command Center",
    stat: "99.9% Funnel Uptime"
  },
  {
    id: 3,
    title: "Bespoke Web & Mobile Software Studio",
    subtitle: "Scalable Cloud Architecture & Custom Systems",
    description: "Crafting elite digital products, high-impact growth funnels, and enterprise application codebases for international brands.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=95",
    tag: "Luxury Developer Suite",
    stat: "150+ Projects Delivered"
  },
  {
    id: 4,
    title: "High-Rise Strategy & ROI Command Suite",
    subtitle: "Data-Driven Scalability & Funnel Optimization",
    description: "Collaborative growth strategy sessions turning complex business models into automated, high-yield revenue systems.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=2400&q=95",
    tag: "Executive Strategy Room",
    stat: "3.8x Avg Client ROI"
  }
];

export const SoftwareHouseSlider: React.FC<SoftwareHouseSliderProps> = ({ onOpenProjectForm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full relative overflow-hidden bg-[#0D0614] border-b border-purple-500/20 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Slider Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-950/80 bg-[#130A1F] h-[380px] sm:h-[440px] md:h-[480px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image with slight atmospheric blur and lighting enhancement */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center blur-[3px] scale-105 brightness-110 contrast-105 transition-all duration-700"
              />
              
              {/* Vibrant Purple Glow & Lightening Overlays */}
              <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#A033FF]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#8B5CF6]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D0614]/90 via-[#0D0614]/65 to-purple-950/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0614] via-transparent to-transparent opacity-85" />

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-between max-w-2xl z-10">
                
                {/* Top Badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/90 border border-purple-400/60 text-[#E9D5FF] text-xs font-extrabold shadow-lg shadow-purple-950/80 backdrop-blur-md mb-4">
                    <Building2 className="w-3.5 h-3.5 text-[#C084FC]" />
                    <span>{currentSlide.tag}</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E9D5FF] to-[#C084FC]">
                      {currentSlide.title}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#C084FC] mt-1.5">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* Bottom Overlay Info & CTA */}
                <div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 line-clamp-2 sm:line-clamp-none max-w-lg font-medium">
                    {currentSlide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={onOpenProjectForm}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#A033FF] via-[#8B5CF6] to-[#C084FC] hover:brightness-110 text-white font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-purple-600/40 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Start Your Project</span>
                    </button>

                    <div className="px-4 py-2 rounded-full bg-purple-950/70 backdrop-blur-md border border-purple-400/50 text-xs font-bold text-[#E9D5FF] flex items-center gap-2 shadow-md">
                      <Award className="w-4 h-4 text-[#C084FC]" />
                      <span>{currentSlide.stat}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#130A1F]/80 hover:bg-[#A033FF] border border-purple-500/40 text-white flex items-center justify-center transition-all backdrop-blur-md z-20 cursor-pointer hover:scale-110"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#130A1F]/80 hover:bg-[#A033FF] border border-purple-500/40 text-white flex items-center justify-center transition-all backdrop-blur-md z-20 cursor-pointer hover:scale-110"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20 bg-[#0D0614]/70 px-3 py-1.5 rounded-full border border-purple-500/30 backdrop-blur-md">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'w-6 bg-[#C084FC]'
                    : 'w-2 bg-purple-500/40 hover:bg-purple-400/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
