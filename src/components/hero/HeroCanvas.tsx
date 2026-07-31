"use client";

import { useRef } from "react";
import { useCanvasRenderer } from "@/hooks/useCanvasRenderer";

interface HeroCanvasProps {
  currentFrame: ImageBitmap | HTMLCanvasElement | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function HeroCanvas({ currentFrame, containerRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High-DPI, object-fit cover stateless canvas renderer with dynamic transparent background removal
  useCanvasRenderer(canvasRef, currentFrame, containerRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover block transition-opacity duration-300"
      style={{ touchAction: "none" }}
    />
  );
}
