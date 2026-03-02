import React, { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Premium pacing: loads faster at the start, slows down around 80% for anticipation
        let increment;
        if (prev < 70) {
          increment = Math.floor(Math.random() * 4) + 2; // Fast
        } else if (prev < 90) {
          increment = Math.floor(Math.random() * 2) + 1; // Slow
        } else {
          increment = Math.floor(Math.random() * 3) + 1; // Finish
        }
        
        return Math.min(prev + increment, 100);
      });
    }, 30); 

    if (progress === 100) {
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 1200); // Slightly longer fade for a dramatic entrance
      }, 500); 
    }

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  // Formats the number to always be 3 digits (e.g., 004, 042, 100)
  const formattedProgress = progress.toString().padStart(3, '0');

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#05080f] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100 scale-100'
      }`}
    >
      
      {/* Subtle background ambient glow that expands at 100% */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c2a353]/10 blur-[100px] transition-all duration-1000 ease-out pointer-events-none ${
          progress === 100 ? 'w-[600px] h-[600px] opacity-0' : 'w-[300px] h-[300px] opacity-100'
        }`}
      ></div>

      {/* Brand Name Reveal */}
      <div className="overflow-hidden mb-10 z-10">
        <h1 
          className={`pt-2 text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fceebb] via-[#e4cc76] to-[#c2a353] tracking-[0.25em] md:tracking-[0.35em] uppercase transition-all duration-1000 ease-out transform ${
            progress > 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          Nari Astra
        </h1>
      </div>

      {/* Center-Out Expanding Line */}
      <div className="w-64 md:w-80 h-[1px] bg-white/5 relative overflow-hidden z-10">
        <div 
          className="absolute top-0 h-full bg-gradient-to-r from-transparent via-[#e4cc76] to-transparent transition-all duration-[50ms] ease-out left-1/2 -translate-x-1/2"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Subtitle */}
      <div className="mt-10 overflow-hidden z-10">
        <p 
          className={`text-[#c2a353]/60 text-[10px] uppercase tracking-[0.5em] font-medium transition-all duration-1000 ease-out transform ${
            progress > 20 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
        >
          Empowerment in your hand
        </p>
      </div>

      {/* Premium Editorial Percentage Counter (Bottom Right) */}
      <div 
        className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 font-serif text-[#c2a353]/40 text-sm md:text-base tracking-widest transition-opacity duration-700 ${
          progress > 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {formattedProgress}%
      </div>

    </div>
  );
};

export default Loader;