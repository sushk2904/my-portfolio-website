"use client";

import { MotionValue, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImageSequenceProps {
    folderPath?: string;
    frameCount?: number;
    startFrame?: number;
    filePrefix?: string;
    digitPadding?: number;
    className?: string;
    scrollProgress?: MotionValue<number>;
}

export default function ImageSequence({
    folderPath = "/food_bowl_animation",
    frameCount = 240,
    startFrame = 1,
    filePrefix = "ezgif-frame-",
    digitPadding = 3,
    className = "",
    scrollProgress
}: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Use passed motion value or fallback to global page scroll
    const defaultScroll = useScroll().scrollYProgress;
    const activeProgress = scrollProgress || defaultScroll;

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

    // Resize Handler
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

    // Buttery smooth render loop with frame interpolation
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", {
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
        });
        if (!canvas || !ctx) return;

        // High-quality rendering settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        let animationFrameId: number;
        let currentFrame = 0;

        const render = () => {
            const currentProgress = activeProgress.get();
            const targetFrame = Math.min(
                frameCount - 1,
                Math.max(0, currentProgress * (frameCount - 1))
            );

            // Lower lerp = smoother, more gradual transitions
            const lerpFactor = 0.37; // Reduced from 0.2
            currentFrame += (targetFrame - currentFrame) * lerpFactor;

            const frameIndex = Math.round(currentFrame);

            if (images[frameIndex]) {
                const img = images[frameIndex];

                // Calculate cover fit
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                const width = img.width * scale;
                const height = img.height * scale;

                // Clear canvas first for clean rendering
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, width, height);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isLoaded, images, activeProgress, frameCount]);

    return (
        <div className={`sticky top-0 h-screen w-full overflow-hidden bg-luxury-black ${className}`}>
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
                style={{
                    imageRendering: '-webkit-optimize-contrast',
                    WebkitFontSmoothing: 'antialiased',
                    transform: 'translateZ(0)',
                    willChange: 'transform'
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
