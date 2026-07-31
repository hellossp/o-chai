"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MENU_ITEMS } from "@/data/menu";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ANIMATION } from "@/config/animation";

export function SpecialChaiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
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
      id="special-chai"
      className="py-16 sm:py-24 px-4 sm:px-6 w-full border-t border-[#8E6343]/60"
      style={{ backgroundColor: "#AB7E5D" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FFFDF9] bg-[#23120B]/30 px-3 py-1 rounded-full border border-[#FFFDF9]/20 inline-block">
            Handcrafted Blends
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E0F0A]">
            Our Special Chai
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#23120B] font-medium leading-relaxed px-2">
            Each brew is crafted to order using single-origin tea leaves, fresh spices, and slow simmered whole milk.
          </p>
        </div>

        {/* Card Grid - Responsive 1 column on small screens, 2 on tablets, 4 on desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FFFDF9] rounded-2xl border border-[#8E6343]/40 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#AB7E5D]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.popular && (
                    <div className="absolute top-3 right-3 bg-[#23120B] text-[#FFFDF9] text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Card Body with Maximum Text Readability */}
                <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E0F0A]">
                      {item.title}
                    </h3>
                    <span className="font-serif text-lg sm:text-xl font-extrabold text-[#23120B] shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] sm:text-xs uppercase tracking-wider text-[#5C2E16] font-bold">
                    {item.subtitle}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#23120B] font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tags Footer */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 flex flex-wrap gap-1.5 sm:gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-[11px] font-sans font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#F4E8DB] text-[#23120B] border border-[#8E6343]/30 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
