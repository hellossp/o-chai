export interface FrameManifest {
  totalFrames: number;
  extension: string;
  padding: number;
  framePrefix: string;
  pixelsPerFrame: number;
  initialBatchSize: number;
}

export const DEFAULT_MANIFEST: FrameManifest = {
  totalFrames: 260,
  extension: "jpg",
  padding: 3,
  framePrefix: "ezgif-frame-",
  pixelsPerFrame: 15,
  initialBatchSize: 20,
};

export function formatFrameFilename(index: number, manifest: FrameManifest = DEFAULT_MANIFEST): string {
  const frameNum = (index + 1).toString().padStart(manifest.padding, "0");
  return `${manifest.framePrefix}${frameNum}.${manifest.extension}`;
}

export function getFramePath(index: number, manifest: FrameManifest = DEFAULT_MANIFEST): string {
  return `/frames/${formatFrameFilename(index, manifest)}`;
}
