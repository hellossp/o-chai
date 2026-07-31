"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/gallery";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ANIMATION } from "@/config/animation";

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, scale: 0.96, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: ANIMATION.reveal,
          stagger: ANIMATION.stagger,
          ease: ANIMATION.ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 px-6 w-full border-t border-[#8E6343]/60"
      style={{ backgroundColor: "#AB7E5D" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#FFFDF9] bg-[#23120B]/30 px-3 py-1 rounded-full border border-[#FFFDF9]/20 inline-block">
            Visual Story
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E0F0A]">
            Moments & Traditions
          </h2>
          <p className="font-sans text-base text-[#23120B] font-medium">
            A glimpse into our handcrafted brewing rituals, earthen cups, and warm café atmosphere.
          </p>
        </div>

        {/* 2 columns mobile -> 3 columns desktop grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FFFDF9] shadow-soft border border-[#8E6343]/40"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle warm hover overlay */}
              <div className="absolute inset-0 bg-[#1E0F0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#FFFDF9]">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#F7E8D0]">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
