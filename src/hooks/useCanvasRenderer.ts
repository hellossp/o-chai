"use client";

import { useEffect, useRef, useCallback } from "react";

export interface CanvasDimensions {
  width: number;
  height: number;
  dpr: number;
}

export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentFrame: ImageBitmap | HTMLCanvasElement | null,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const dimensionsRef = useRef<CanvasDimensions>({ width: 0, height: 0, dpr: 1 });
  const rafIdRef = useRef<number | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, dpr } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    // Ensure physical dimensions match DPI
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // High quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fill canvas background with warm #AB7E5D to prevent any grey reload flash
    ctx.fillStyle = "#AB7E5D";
    ctx.fillRect(0, 0, width, height);

    if (currentFrame) {
      const imgWidth = currentFrame.width || 1920;
      const imgHeight = currentFrame.height || 1080;

      // Object-fit: cover matrix calculation
      const containerRatio = width / height;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (containerRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(currentFrame, offsetX, offsetY, drawWidth, drawHeight);
    }

    ctx.restore();
  }, [canvasRef, currentFrame]);

  // Handle Resize with DPI scaling and debouncing
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
        dpr,
      };

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(draw);
    };

    updateDimensions();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(timeoutId);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [containerRef, draw]);

  // Re-draw when currentFrame changes
  useEffect(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(draw);
  }, [currentFrame, draw]);
}
