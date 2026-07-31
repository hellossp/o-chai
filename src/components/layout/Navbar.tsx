"use client";

import { useEffect, useState } from "react";
import { Coffee, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 5 || window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Our Special Chai", href: "#special-chai" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit Us", href: "#visit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#AB7E5D]/95 backdrop-blur-md shadow-md py-4 border-b border-[#8E6343]/60"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-[#FFFDF9] flex items-center justify-center text-[#23120B] border border-[#8E6343]/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Coffee className="w-5 h-5 text-[#361C10]" />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-wide text-[#FFFDF9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            O Chai
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-semibold text-[#FFFDF9] hover:text-[#F7E8D0] transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#visit"
            className="px-5 py-2.5 rounded-full bg-[#23120B] hover:bg-[#3D1E10] text-[#FFFDF9] font-sans text-xs font-semibold uppercase tracking-widest transition-colors duration-300 shadow-md border border-[#F7E8D0]/20"
          >
            Visit Café
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#FFFDF9] focus:outline-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#AB7E5D] border-b border-[#8E6343] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif text-lg font-medium text-[#FFFDF9] hover:text-[#F7E8D0]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-full bg-[#23120B] text-[#FFFDF9] font-sans text-sm font-semibold"
          >
            Visit Café
          </a>
        </div>
      )}
    </header>
  );
}
