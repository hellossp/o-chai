"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { HeroWrapper } from "@/components/hero/HeroWrapper";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

// Lazy-render all sections below the Hero for Core Web Vitals optimization
const DynamicAbout = dynamic(() => import("@/components/sections/AboutSection").then((mod) => mod.AboutSection), {
  ssr: false,
  loading: () => <div className="py-24 min-h-[400px]" style={{ backgroundColor: "#AB7E5D" }} />,
});

const DynamicSpecialChai = dynamic(() => import("@/components/sections/SpecialChaiSection").then((mod) => mod.SpecialChaiSection), {
  ssr: false,
  loading: () => <div className="py-24 min-h-[400px]" style={{ backgroundColor: "#AB7E5D" }} />,
});

const DynamicGallery = dynamic(() => import("@/components/sections/GallerySection").then((mod) => mod.GallerySection), {
  ssr: false,
  loading: () => <div className="py-24 min-h-[400px]" style={{ backgroundColor: "#AB7E5D" }} />,
});

const DynamicVisitUs = dynamic(() => import("@/components/sections/VisitUsSection").then((mod) => mod.VisitUsSection), {
  ssr: false,
  loading: () => <div className="py-24 min-h-[400px]" style={{ backgroundColor: "#AB7E5D" }} />,
});

export default function Home() {
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  return (
    <main className="min-h-screen text-[#24130B] relative w-full" style={{ backgroundColor: "#AB7E5D" }}>
      {/* Dynamic Navbar */}
      <Navbar />

      {/* Hero Image Sequence Scrubbing & Emotional Reveal */}
      <HeroWrapper />

      {/* Lazy Loaded Sections Below Hero */}
      <DynamicAbout />
      <DynamicSpecialChai />
      <DynamicGallery />
      <DynamicVisitUs />

      {/* Footer */}
      <Footer />
    </main>
  );
}
