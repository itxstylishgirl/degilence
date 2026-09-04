import React from 'react';

interface DigilenceLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightText?: boolean;
}

export const DigilenceLogo: React.FC<DigilenceLogoProps> = ({
  size = 'md',
  showText = true,
  lightText = true
}) => {
  const iconSizeClass =
    size === 'sm' ? 'w-8 h-8 rounded-xl' : size === 'lg' ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10 rounded-xl';

  const textSizeClass =
    size === 'sm' ? 'text-base font-extrabold' : size === 'lg' ? 'text-2xl font-extrabold' : 'text-xl font-extrabold';

  return (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Iconic Purple Logo Badge */}
      <div
        className={`${iconSizeClass} bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#A033FF] p-[2px] shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0`}
      >
        <div className="w-full h-full bg-[#130A1F] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Stylized 'D' + 'Ai' Icon SVG matching uploaded logo */}
          <svg className="w-3/5 h-3/5 text-white" viewBox="0 0 100 100" fill="none">
            {/* Outer D Curve */}
            <path
              d="M25 15 H50 C70 15, 85 30, 85 50 C85 70, 70 85, 50 85 H25 V15 Z"
              fill="url(#purpleGrad)"
            />
            {/* Inner White Cutout with Ai Ribbon */}
            <path
              d="M38 28 H48 C62 28, 72 38, 72 50 C72 62, 62 72, 48 72 H38 V28 Z"
              fill="#130A1F"
            />
            {/* Stylized Ai Ribbon loop inside */}
            <path
              d="M42 62 L48 42 L54 62 M45 54 H51 M58 42 V62 M58 36 V38"
              stroke="#A033FF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Digilence Ai Brand Text */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span className={`${textSizeClass} ${lightText ? 'text-white' : 'text-slate-900'}`}>
            Digilence
          </span>
          <span className={`${textSizeClass} ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#A033FF] via-[#8B5CF6] to-[#C084FC]`}>
            Ai
          </span>
        </div>
      )}
    </div>
  );
};
