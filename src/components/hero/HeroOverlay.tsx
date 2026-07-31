"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ANIMATION } from "@/config/animation";

interface HeroOverlayProps {
  onExploreClick?: () => void;
}

export function HeroOverlay({ onExploreClick }: HeroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance animation on load so the official brand logo arrives smoothly
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, scale: 0.95, y: 16 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: ANIMATION.reveal,
        stagger: 0.1,
        ease: ANIMATION.ease,
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto bg-gradient-to-b from-black/25 via-transparent to-black/35 px-4 sm:px-6"
    >
      {/* Content Container - Official O' Chai Brand Logo Artwork (Original Sizing) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-6 sm:space-y-8">
        {/* Official Brand Logo Image */}
        <div className="relative w-64 xs:w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="O' Chai Official Brand Logo"
            width={450}
            height={450}
            className="w-full h-auto object-contain mix-blend-multiply drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] filter contrast-[1.05]"
            priority
          />
        </div>

        {/* CTA Button - Positioned Centered Below Logo */}
        <div className="pt-2">
          <button
            onClick={onExploreClick}
            className="px-8 py-4 sm:px-9 sm:py-4.5 bg-[#23120B] hover:bg-[#3D1E10] text-[#FFFDF9] font-sans font-bold text-xs sm:text-base tracking-wider rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-[#FFFDF9]/30"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  );
}
