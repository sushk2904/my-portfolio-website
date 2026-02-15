"use client";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Removed ReactLenis for precise scroll control on image sequences
  // The momentum-based smoothing was causing large jumps in frame position
  return <>{children}</>;
}
