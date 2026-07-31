"use client";

import { Coffee, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4A3426] text-[#F8F3EC] py-16 px-6 border-t border-[#9B795A]/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#A66A3F] flex items-center justify-center text-[#F8F3EC]">
              <Coffee className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl font-medium tracking-wide">O Chai</span>
          </div>
          <p className="font-sans text-xs text-[#F8F3EC]/70 max-w-sm">
            Handcrafted Indian tea experience. Brewing conversations, warm moments, and authentic kulhad traditions.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 font-sans text-xs uppercase tracking-widest text-[#F8F3EC]/80">
          <a href="#about" className="hover:text-[#A66A3F] transition-colors">
            About
          </a>
          <a href="#special-chai" className="hover:text-[#A66A3F] transition-colors">
            Special Chai
          </a>
          <a href="#gallery" className="hover:text-[#A66A3F] transition-colors">
            Gallery
          </a>
          <a href="#visit" className="hover:text-[#A66A3F] transition-colors">
            Visit Us
          </a>
        </div>

        {/* Handcrafted Badge */}
        <div className="flex items-center space-x-2 font-sans text-xs text-[#F8F3EC]/60">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#A66A3F] fill-current" />
          <span>for tea lovers</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#F8F3EC]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F3EC]/40 space-y-2 sm:space-y-0">
        <p>© {new Date().getFullYear()} O Chai. All rights reserved.</p>
        <p className="font-serif italic text-[#F8F3EC]/60">ଚା ଗୋଟେ ଗୋଟେ ହଉ — Let&apos;s have tea, one by one.</p>
      </div>
    </footer>
  );
}
