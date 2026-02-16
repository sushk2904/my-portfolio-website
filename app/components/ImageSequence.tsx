"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ImageSequenceProps {
    folderPath?: string;
    frameCount?: number;
    startFrame?: number;
    filePrefix?: string;
    digitPadding?: number;
    className?: string;
    triggerElement?: string; // CSS selector for scroll trigger
}

export default function ImageSequence({
    folderPath = "/food_bowl_animation",
    frameCount = 240,
    startFrame = 1,
    filePrefix = "ezgif-frame-",
    digitPadding = 3,
    className = "",
    triggerElement = "body"
}: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const frameIndexRef = useRef({ value: 0 }); // GSAP will animate this object

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        let isMounted = true;

        for (let i = startFrame; i < startFrame + frameCount; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(digitPadding, "0");
            img.src = `${folderPath}/${filePrefix}${frameIndex}.jpg`;
            img.onload = () => {
                if (!isMounted) return;
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
        return () => { isMounted = false; };
    }, [folderPath, frameCount, startFrame, filePrefix, digitPadding]);

    // Canvas resize handler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // GSAP ScrollTrigger animation
    useEffect(() => {
        if (!isLoaded || images.length === 0 || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
        });
        if (!canvas || !ctx) return;

        // Configure high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Render function
        const render = () => {
            const frameIndex = Math.min(
                frameCount - 1,
                Math.max(0, Math.round(frameIndexRef.current.value))
            );

            if (images[frameIndex]) {
                const img = images[frameIndex];

                // Clear with black background
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Calculate cover fit
                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                );
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                const width = img.width * scale;
                const height = img.height * scale;

                ctx.drawImage(img, x, y, width, height);
            }
        };

        // GSAP ScrollTrigger setup
        const scrollTrigger = ScrollTrigger.create({
            trigger: triggerElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1, // Reduced for less lag (was 0.5)
            onUpdate: (self) => {
                // Animate frameIndex smoothly
                gsap.to(frameIndexRef.current, {
                    value: self.progress * (frameCount - 1),
                    duration: 0.15, // Reduced from 0.3
                    ease: "power1.out",
                    onUpdate: render
                });
            }
        });

        // Initial render
        render();

        return () => {
            scrollTrigger.kill();
        };
    }, [isLoaded, images, frameCount, triggerElement]);

    return (
        <div
            ref={containerRef}
            className={`sticky top-0 h-screen w-full overflow-hidden bg-luxury-black ${className}`}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
                style={{
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased',
                    transform: 'translateZ(0) scale(1.001)', // GPU layer + slight scale for sharpness
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                }}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-luxury-black text-luxury-gold">
                    <p className="animate-pulse text-sm tracking-widest uppercase text-white/50">Loading Experience...</p>
                </div>
            )}
        </div>
    );
}
