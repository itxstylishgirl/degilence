import React from 'react';

export const BubblesAnimation: React.FC = () => {
  // Generate a set of dynamic bubbles with distinct positions, sizes, speeds, and opacities
  const bubbles = [
    { size: 140, left: '8%', delay: '0s', duration: '18s', color: 'from-[#19C6D1]/20 to-slate-400/10' },
    { size: 90, left: '22%', delay: '3s', duration: '14s', color: 'from-slate-400/25 to-cyan-500/10' },
    { size: 200, left: '38%', delay: '1s', duration: '22s', color: 'from-[#19C6D1]/15 to-[#0B1520]/0' },
    { size: 110, left: '55%', delay: '6s', duration: '16s', color: 'from-slate-400/20 to-slate-500/10' },
    { size: 160, left: '72%', delay: '2s', duration: '19s', color: 'from-[#19C6D1]/20 to-slate-400/15' },
    { size: 75, left: '88%', delay: '5s', duration: '12s', color: 'from-slate-300/25 to-[#19C6D1]/10' },
    { size: 130, left: '15%', delay: '8s', duration: '20s', color: 'from-[#19C6D1]/15 to-slate-400/20' },
    { size: 180, left: '82%', delay: '10s', duration: '24s', color: 'from-slate-400/15 to-[#19C6D1]/25' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <style>{`
        @keyframes floatBubble {
          0% {
            transform: translateY(110vh) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(50vh) scale(1.1) rotate(180deg);
            opacity: 0.8;
          }
          85% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-20vh) scale(0.9) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {bubbles.map((b, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full bg-gradient-to-tr ${b.color} backdrop-blur-3xl border border-white/10 shadow-[0_0_30px_rgba(25,198,209,0.15)]`}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: b.left,
            bottom: '-250px',
            animation: `floatBubble ${b.duration} ease-in-out infinite`,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
};
