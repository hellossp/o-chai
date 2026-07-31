"use client";

import { Coffee, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1E0F0A] text-[#FFFDF9] py-16 px-6 border-t border-[#8E6343]/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#AB7E5D] flex items-center justify-center text-[#23120B] shadow-sm">
              <Coffee className="w-4 h-4 text-[#FFFDF9]" />
            </div>
            <span className="font-serif text-3xl font-bold tracking-wide text-[#FFFDF9]">O Chai</span>
          </div>
          <p className="font-sans text-xs text-[#FFFDF9]/70 max-w-sm">
            Handcrafted Indian tea experience. Brewing conversations, warm moments, and authentic kulhad traditions.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 font-sans text-xs uppercase tracking-widest text-[#FFFDF9]/80 font-medium">
          <a href="#about" className="hover:text-[#F7E8D0] transition-colors">
            About
          </a>
          <a href="#special-chai" className="hover:text-[#F7E8D0] transition-colors">
            Special Chai
          </a>
          <a href="#gallery" className="hover:text-[#F7E8D0] transition-colors">
            Gallery
          </a>
          <a href="#visit" className="hover:text-[#F7E8D0] transition-colors">
            Visit Us
          </a>
        </div>

        {/* Handcrafted Badge */}
        <div className="flex items-center space-x-2 font-sans text-xs text-[#FFFDF9]/70">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#AB7E5D] fill-current" />
          <span>for tea lovers</span>
        </div>
      </div>

      {/* Footer Bottom Bar with Copyright, Odia Tagline, and Developer/Builder Credits */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#FFFDF9]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#FFFDF9]/70 gap-4 text-center md:text-left">
        <p>© {new Date().getFullYear()} O Chai. All rights reserved.</p>

        <p className="font-serif italic text-[#F7E8D0]">
          ଚା ଗୋଟେ ଗୋଟେ ହଉ — Let&apos;s have tea, one by one.
        </p>

        {/* Builder & Developer Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 font-sans text-xs text-[#FFFDF9]/80">
          <span>
            Built with{" "}
            <a
              href="https://www.instantpages.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7E8D0] hover:text-[#FFFDF9] underline font-semibold transition-colors"
            >
              InstantPages
            </a>
          </span>
          <span>•</span>
          <span>
            Developed by{" "}
            <a
              href="https://www.sitansu.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7E8D0] hover:text-[#FFFDF9] underline font-semibold transition-colors"
            >
              Sitansu
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
