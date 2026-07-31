import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#AB7E5D",
        "chai-brown": "#59351C",
        "dark-brown": "#24130B",
        "sec-cream": "#F8F3EC",
        "border-warm": "#946949",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(36, 19, 11, 0.12)",
        "soft-lg": "0 20px 40px -15px rgba(36, 19, 11, 0.18)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
