"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useFrameLoader } from "@/hooks/useFrameLoader";
import { HeroCanvas } from "./HeroCanvas";
import { HeroOverlay } from "./HeroOverlay";
import { LoadingScreen } from "./LoadingScreen";
import { ScrollHint } from "./ScrollHint";

export function HeroWrapper() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { manifest, frames, progress, isInitialReady } = useFrameLoader();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic scroll height calculation: lighter scroll distance on mobile for smooth scrubbing
  const dynamicScrollHeight = useMemo(() => {
    const multiplier = isMobile ? 12 : 15;
    const minPixels = manifest.totalFrames * multiplier;
    return `${Math.max(minPixels, isMobile ? 1800 : 2400)}px`;
  }, [manifest, isMobile]);

  // Current frame object passed to stateless HeroCanvas
  const currentFrame = useMemo(() => {
    return frames[currentFrameIndex] || null;
  }, [frames, currentFrameIndex]);

  useEffect(() => {
    if (!triggerRef.current || !containerRef.current || !isInitialReady) return;

    const total = manifest.totalFrames;

    // Direct 1:1 scrub on mobile (0.1) for zero touch lag, 0.5 on desktop for smooth physics
    const scrubValue = isMobile ? 0.1 : 0.5;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: true,
      scrub: scrubValue,
      onUpdate: (self) => {
        const p = self.progress;
        const targetIndex = Math.min(Math.floor(p * total), total - 1);
        setCurrentFrameIndex(targetIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [manifest, isInitialReady, isMobile]);

  const handleExploreClick = () => {
    const menuSection = document.getElementById("special-chai");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <LoadingScreen
        progress={progress}
        isReady={isInitialReady}
        onComplete={() => setIsLoaded(true)}
      />

      <div
        ref={triggerRef}
        className="relative w-full"
        style={{ height: dynamicScrollHeight }}
      >
        <div
          ref={containerRef}
          className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden bg-[#AB7E5D]"
        >
          {/* Stateless High-DPI Canvas */}
          <HeroCanvas currentFrame={currentFrame} containerRef={containerRef} />

          {/* Centered Brand Logo & CTA Overlay */}
          <HeroOverlay onExploreClick={handleExploreClick} />

          {/* Minimal Scroll Hint */}
          <ScrollHint visible={isLoaded && currentFrameIndex < 5} />
        </div>
      </div>
    </>
  );
}
