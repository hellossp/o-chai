"use client";

import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ANIMATION } from "@/config/animation";

export function VisitUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.reveal,
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

  const handleOpenGoogleMaps = () => {
    window.open("https://maps.google.com/?q=O+Chai+Tea+House", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="py-24 px-6 w-full border-t border-[#8E6343]/60"
      style={{ backgroundColor: "#AB7E5D" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#FFFDF9] bg-[#23120B]/30 px-3 py-1 rounded-full border border-[#FFFDF9]/20 inline-block">
            Gathering Space
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E0F0A]">
            Visit Us
          </h2>
          <p className="font-sans text-base text-[#23120B] font-medium">
            Step into our quiet sanctuary. Steaming kettle, earthen cups, and warm hospitality await.
          </p>
        </div>

        <div
          ref={cardRef}
          className="bg-[#FFFDF9] rounded-3xl border border-[#8E6343]/40 shadow-soft-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Warm Parchment Styled Map Visual Placeholder */}
          <div className="lg:col-span-7 bg-[#F4E8DB]/60 p-8 sm:p-12 relative flex flex-col justify-between min-h-[340px] border-b lg:border-b-0 lg:border-r border-[#8E6343]/30">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFFDF9] rounded-full text-xs font-sans font-bold text-[#23120B] border border-[#8E6343]/40">
                <MapPin className="w-3.5 h-3.5 text-[#361C10]" />
                <span>Location Preview</span>
              </div>
              <h3 className="font-serif text-3xl text-[#1E0F0A] font-bold">
                O Chai Tea House
              </h3>
              <p className="font-sans text-sm text-[#23120B] font-medium max-w-md">
                Plot 42, Saheed Nagar Main Road, opposite Ram Mandir Square, Bhubaneswar, Odisha 751007
              </p>
            </div>

            {/* Aesthetic parchment grid pattern */}
            <div className="my-8 h-32 rounded-2xl border border-dashed border-[#8E6343]/40 bg-[#FFFDF9] flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <MapPin className="w-6 h-6 text-[#23120B] mx-auto animate-bounce" />
                <p className="font-serif text-sm text-[#1E0F0A] font-bold">Interactive Map Preview</p>
                <p className="font-sans text-xs text-[#23120B] font-medium">Saheed Nagar • Bhubaneswar</p>
              </div>
            </div>

            <button
              onClick={handleOpenGoogleMaps}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#23120B] hover:bg-[#3D1E10] text-[#FFFDF9] font-sans font-bold text-sm rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-98 w-full sm:w-auto cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Operating Hours & Info Column */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-8 flex flex-col justify-between bg-[#FFFDF9]">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#23120B]">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1E0F0A]">
                    Opening Hours
                  </h4>
                </div>
                <ul className="space-y-2 font-sans text-sm text-[#23120B] font-medium border-l-2 border-[#8E6343]/40 pl-4">
                  <li className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-bold text-[#1E0F0A]">7:00 AM – 10:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday – Sunday:</span>
                    <span className="font-bold text-[#1E0F0A]">7:00 AM – 11:30 PM</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#23120B]">
                  <Phone className="w-5 h-5" />
                  <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1E0F0A]">
                    Get In Touch
                  </h4>
                </div>
                <div className="space-y-1 font-sans text-sm text-[#23120B] font-medium border-l-2 border-[#8E6343]/40 pl-4">
                  <p className="font-bold text-[#1E0F0A]">+91 98765 43210</p>
                  <p>namaste@ochai.in</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#8E6343]/30 text-xs font-sans text-[#23120B] italic">
              &quot;A cup of tea is an excuse to share great thoughts with great mind.&quot;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
