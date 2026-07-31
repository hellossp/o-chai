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

  const { manifest, frames, progress, isInitialReady } = useFrameLoader();

  // Dynamic scroll height calculation based on manifest
  const dynamicScrollHeight = useMemo(() => {
    const minPixels = manifest.totalFrames * manifest.pixelsPerFrame;
    return `${Math.max(minPixels, 2400)}px`;
  }, [manifest]);

  // Current frame object passed to stateless HeroCanvas
  const currentFrame = useMemo(() => {
    return frames[currentFrameIndex] || null;
  }, [frames, currentFrameIndex]);

  useEffect(() => {
    if (!triggerRef.current || !containerRef.current || !isInitialReady) return;

    const total = manifest.totalFrames;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        const targetIndex = Math.min(Math.floor(p * total), total - 1);
        setCurrentFrameIndex(targetIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [manifest, isInitialReady]);

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

          {/* Steadily Displayed Text Overlay & CTA Button */}
          <HeroOverlay onExploreClick={handleExploreClick} />

          {/* Minimal Scroll Hint */}
          <ScrollHint visible={isLoaded && currentFrameIndex < 5} />
        </div>
      </div>
    </>
  );
}
