"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ progress, isReady, onComplete }: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isReady && progress >= 100) {
      const timer1 = setTimeout(() => {
        setIsFadingOut(true);
      }, 400);

      const timer2 = setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isReady, progress, onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#AB7E5D] transition-opacity duration-700 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-6 px-6">
        {/* Steam Pulse Animation */}
        <div className="relative w-12 h-16 flex items-center justify-center">
          <div className="absolute top-0 w-1 h-6 bg-[#24130B]/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="absolute top-1 left-3 w-1 h-7 bg-[#24130B]/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="absolute top-0 right-3 w-1 h-5 bg-[#24130B]/40 rounded-full animate-bounce" />
          <div className="absolute bottom-0 text-2xl text-[#24130B]">☕</div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-wide text-[#24130B]">
            O Chai
          </h1>
          <p className="font-sans text-sm tracking-widest uppercase text-[#F8F3EC] font-semibold">
            Crafting your experience...
          </p>
        </div>

        {/* Progress Counter & Bar */}
        <div className="w-48 space-y-2">
          <div className="w-full bg-[#946949] h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#F8F3EC] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="font-sans text-xs font-semibold tracking-wider text-[#24130B]">
            {Math.min(progress, 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
