import React, { useState, useEffect, useRef } from 'react';

export const StatsSection: React.FC = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    tech: 0,
    satisfaction: 0,
    support: 24
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateStats = () => {
    let start = 0;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;

    const timer = setInterval(() => {
      start++;
      const progress = start / steps;

      setCounts({
        projects: Math.min(50, Math.floor(50 * progress)),
        tech: Math.min(15, Math.floor(15 * progress)),
        satisfaction: Math.min(98, Math.floor(98 * progress)),
        support: 24
      });

      if (start >= steps) {
        clearInterval(timer);
        setCounts({ projects: 50, tech: 15, satisfaction: 98, support: 24 });
      }
    }, stepTime);
  };

  const stats = [
    {
      value: `${counts.projects}+`,
      label: 'Projects Delivered',
      subtext: 'High-performing web, mobile & AI platforms'
    },
    {
      value: `${counts.tech}+`,
      label: 'Technologies Used',
      subtext: 'Modern languages, frameworks & AI SDKs'
    },
    {
      value: `${counts.satisfaction}%`,
      label: 'Client Satisfaction',
      subtext: 'Validated across enterprise engagements'
    },
    {
      value: `${counts.support}/7`,
      label: 'Support & Collaboration',
      subtext: 'Dedicated solutions architecture team'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-[#0B1520] border-y border-white/10 overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-64 bg-radial-glow-cyan pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-3xl bg-glass-card border border-white/10 backdrop-blur-xl hover:border-[#19C6D1]/40 transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#F4F8FB]">
                {stat.label}
              </div>
              <div className="text-xs text-[#AAB8C4] mt-1 font-normal">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
