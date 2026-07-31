"use client";

import { ChevronDown } from "lucide-react";

interface ScrollHintProps {
  visible: boolean;
}

export function ScrollHint({ visible }: ScrollHintProps) {
  return (
    <div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 transition-all duration-700 pointer-events-none ${
        visible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className="font-sans text-xs font-medium tracking-widest uppercase text-[#4A3426]/70">
        Scroll to brew
      </span>
      <ChevronDown className="w-5 h-5 text-[#A66A3F] animate-bounce" />
    </div>
  );
}
