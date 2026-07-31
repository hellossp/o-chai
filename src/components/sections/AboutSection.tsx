"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ANIMATION } from "@/config/animation";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade & slide image up
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION.reveal,
          ease: ANIMATION.ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Stagger text contents
      gsap.fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.reveal,
          stagger: ANIMATION.stagger,
          ease: ANIMATION.ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 w-full border-t border-[#8E6343]/60"
      style={{ backgroundColor: "#AB7E5D" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Large Ultra-Clear Aesthetic Image Container */}
        <div ref={imageRef} className="lg:col-span-7 relative group">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft-lg bg-[#FFFDF9] border border-[#8E6343]/40">
            <Image
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=85&w=1600"
              alt="Handcrafted Kulhad Tea Experience"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle warm tint overlay */}
            <div className="absolute inset-0 bg-[#23120B]/10 mix-blend-multiply" />
          </div>

          {/* Floating Artisan Badge - High Contrast Parchment */}
          <div className="absolute -bottom-6 -right-2 sm:bottom-6 sm:-right-6 bg-[#FFFDF9] p-6 rounded-2xl shadow-lg border border-[#8E6343]/40 hidden xs:block">
            <span className="font-serif text-3xl font-bold text-[#23120B] block">100%</span>
            <span className="font-sans text-xs uppercase tracking-widest text-[#361C10] font-bold">Pure Whole Spices</span>
          </div>
        </div>

        {/* Storytelling Text Column */}
        <div ref={contentRef} className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#FFFDF9] bg-[#23120B]/30 px-3 py-1 rounded-full border border-[#FFFDF9]/20 inline-block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E0F0A] font-bold leading-tight">
              Slow Boiled. <br />
              <span className="italic text-[#FFFDF9]">Handcrafted with Intention.</span>
            </h2>
          </div>

          <p className="font-sans text-base sm:text-lg text-[#1E0F0A] font-medium leading-relaxed">
            At O Chai, we believe tea is more than a beverage — it is a daily sanctuary.
            Every cup begins with hand-crushed spices, raw jaggery, and unhurried brewing over open kettles, served in traditional unglazed earthen kulhads that impart a subtle, rustic aroma.
          </p>

          <p className="font-sans text-sm sm:text-base text-[#23120B] font-medium leading-relaxed">
            From quiet morning reflections to lively evening catch-ups with friends, we curate an environment of warmth, stillness, and genuine hospitality.
          </p>

          <div className="pt-2">
            <a
              href="#special-chai"
              className="inline-flex items-center space-x-3 font-sans text-sm font-bold tracking-wider text-[#1E0F0A] hover:text-[#FFFDF9] transition-colors group"
            >
              <span>Discover Our Blends</span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
