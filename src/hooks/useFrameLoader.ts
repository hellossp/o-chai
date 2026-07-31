"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FrameManifest, DEFAULT_MANIFEST, getFramePath } from "@/config/frames";

export interface FrameLoaderResult {
  manifest: FrameManifest;
  frames: (HTMLImageElement | ImageBitmap | HTMLCanvasElement | null)[];
  progress: number;
  isInitialReady: boolean;
  isFullyLoaded: boolean;
}

// Fallback procedural canvas generator with matching #AB7E5D background
function createProceduralFrameCanvas(index: number, total: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return canvas;

  const t = index / Math.max(total - 1, 1);

  // Warm background matching #AB7E5D
  ctx.fillStyle = "#AB7E5D";
  ctx.fillRect(0, 0, 1920, 1080);

  // Earthen Kulhad Tea Cup in center
  const cupX = 960;
  const cupY = 620;
  const cupRadius = 140;

  // Shadow
  ctx.beginPath();
  ctx.ellipse(cupX, cupY + 120, cupRadius * 1.4, 40, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(36, 19, 11, 0.15)";
  ctx.fill();

  // Cup body gradient
  const cupGrad = ctx.createLinearGradient(cupX - cupRadius, cupY, cupX + cupRadius, cupY + 200);
  cupGrad.addColorStop(0, "#A66A3F");
  cupGrad.addColorStop(0.5, "#8B522B");
  cupGrad.addColorStop(1, "#6B3B1D");

  ctx.beginPath();
  ctx.moveTo(cupX - cupRadius, cupY);
  ctx.lineTo(cupX + cupRadius, cupY);
  ctx.lineTo(cupX + cupRadius * 0.7, cupY + 200);
  ctx.lineTo(cupX - cupRadius * 0.7, cupY + 200);
  ctx.closePath();
  ctx.fillStyle = cupGrad;
  ctx.fill();

  // Tea Liquid inside cup
  ctx.beginPath();
  ctx.ellipse(cupX, cupY, cupRadius, 40, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#A66A3F";
  ctx.fill();

  // Swirling Chai Cream Surface
  const liquidGrad = ctx.createRadialGradient(cupX - 20 * Math.cos(t * Math.PI * 4), cupY - 10, 5, cupX, cupY, cupRadius * 0.9);
  liquidGrad.addColorStop(0, "#F8F3EC");
  liquidGrad.addColorStop(0.4, "#A66A3F");
  liquidGrad.addColorStop(1, "#24130B");
  ctx.beginPath();
  ctx.ellipse(cupX, cupY, cupRadius * 0.92, 35, 0, 0, Math.PI * 2);
  ctx.fillStyle = liquidGrad;
  ctx.fill();

  // Rising Steam Particles based on scroll progress t
  ctx.save();
  for (let i = 0; i < 7; i++) {
    const offset = (i * 0.15 + t * 2) % 1;
    const opacity = Math.sin(offset * Math.PI) * 0.35;
    const sx = cupX + Math.sin(offset * Math.PI * 3 + i) * 35;
    const sy = cupY - 40 - offset * 220;
    const sSize = 25 + offset * 45;

    const steamGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sSize);
    steamGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    steamGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
    ctx.fillStyle = steamGrad;
    ctx.fill();
  }
  ctx.restore();

  return canvas;
}

export function useFrameLoader(): FrameLoaderResult {
  const [manifest, setManifest] = useState<FrameManifest>(DEFAULT_MANIFEST);
  const [progress, setProgress] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const framesRef = useRef<(HTMLImageElement | ImageBitmap | HTMLCanvasElement | null)[]>([]);

  const loadSingleFrame = useCallback(async (index: number, currentManifest: FrameManifest): Promise<HTMLImageElement | ImageBitmap | HTMLCanvasElement | null> => {
    const path = getFramePath(index, currentManifest);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = path;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
      });

      // Mobile check
      const isMobile = typeof window !== "undefined" && (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      );

      // On mobile devices, return HTMLImageElement directly without uncompressing heavy bitmaps
      if (isMobile) {
        return img;
      }

      // Desktop: use createImageBitmap if supported
      if ("createImageBitmap" in window) {
        return await createImageBitmap(img);
      }
      return img;
    } catch {
      return createProceduralFrameCanvas(index, currentManifest.totalFrames);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function initLoader() {
      let activeManifest = DEFAULT_MANIFEST;

      try {
        const res = await fetch("/frames/manifest.json");
        if (res.ok) {
          const json = await res.json();
          activeManifest = { ...DEFAULT_MANIFEST, ...json };
          setManifest(activeManifest);
        }
      } catch {
        // Use default manifest
      }

      const total = activeManifest.totalFrames;
      const initialBatch = Math.min(activeManifest.initialBatchSize, total);
      framesRef.current = new Array(total).fill(null);

      // Phase 1: Rapidly load initial batch (10 frames ~0.5s) to unlock screen instantly
      for (let i = 0; i < initialBatch; i++) {
        if (isCancelled) return;
        const frame = await loadSingleFrame(i, activeManifest);
        framesRef.current[i] = frame;
        const p = Math.round(((i + 1) / initialBatch) * 100);
        setProgress(p);
      }

      if (!isCancelled) {
        setIsInitialReady(true);
      }

      // Phase 2: Asynchronously load remaining frames
      for (let i = initialBatch; i < total; i++) {
        if (isCancelled) return;
        const frame = await loadSingleFrame(i, activeManifest);
        framesRef.current[i] = frame;
      }

      if (!isCancelled) {
        setIsFullyLoaded(true);
      }
    }

    initLoader();

    return () => {
      isCancelled = true;
      framesRef.current.forEach((item) => {
        if (item && "close" in item && typeof item.close === "function") {
          (item as ImageBitmap).close();
        }
      });
      framesRef.current = [];
    };
  }, [loadSingleFrame]);

  return {
    manifest,
    frames: framesRef.current,
    progress,
    isInitialReady,
    isFullyLoaded,
  };
}
