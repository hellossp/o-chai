import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ochai.in"),
  title: "O Chai — Modern Handcrafted Indian Tea Experience",
  description: "Experience O Chai. Slow-boiled masala chai, green cardamom brews, and authentic earthen kulhad tradition. Brewing conversations, one cup at a time.",
  keywords: ["O Chai", "Chai", "Masala Chai", "Kulhad Tea", "Indian Tea House", "Bhubaneswar Cafe", "Handcrafted Tea"],
  authors: [{ name: "O Chai Team" }],
  creator: "O Chai",
  openGraph: {
    title: "O Chai — Modern Handcrafted Indian Tea Experience",
    description: "Brewing conversations, one cup at a time. Discover slow-simmered artisanal Indian chais.",
    url: "https://ochai.in",
    siteName: "O Chai",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://ochai.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "O Chai Steaming Tea Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O Chai — Modern Handcrafted Indian Tea Experience",
    description: "Brewing conversations, one cup at a time. Authentic kulhad chai tradition.",
    images: ["https://ochai.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ochai.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body
        className="text-[#24130B] font-sans antialiased selection:bg-[#946949] selection:text-[#F8F3EC]"
        style={{ backgroundColor: "#AB7E5D" }}
      >
        {children}
      </body>
    </html>
  );
}
