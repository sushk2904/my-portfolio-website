"use client";

import { MotionValue, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImageSequenceProps {
    folderPath?: string;
    frameCount?: number;
    filePrefix?: string;
    digitPadding?: number;
    className?: string;
    scrollProgress?: MotionValue<number>;
}

export default function ImageSequence({
    folderPath = "/food_bowl_animation",
    frameCount = 240,
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

        for (let i = 1; i <= frameCount; i++) {
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
    }, [folderPath, frameCount, filePrefix, digitPadding]);

    // Resize Handler - Only set canvas dimensions on resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            // Set internal resolution to match window size for sharpness
            // Could strictly limit this for performance if needed (e.g. max 1920)
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize(); // Initial size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Optimized Render Loop
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", { alpha: false }); // alpha: false optimize for non-transparent
        if (!canvas || !ctx) return;

        let animationFrameId: number;
        let lastFrameIndex = -1;

        const render = () => {
            const currentProgress = activeProgress.get();
            // Clamp and map progress to frame index
            const frameIndex = Math.min(
                frameCount - 1,
                Math.max(0, Math.floor(currentProgress * (frameCount - 1)))
            );

            // Only draw if frame changed
            if (frameIndex !== lastFrameIndex && images[frameIndex]) {
                const img = images[frameIndex];

                // Calculate cover (assuming canvas is already sized correctly by resize listener)
                // We calculate draw dimensions here to handle aspect ratio changes
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                const width = img.width * scale;
                const height = img.height * scale;

                // Optimization: no need to clearRect if we cover the whole canvas (which cover does)
                // ctx.clearRect(0, 0, canvas.width, canvas.height); 
                ctx.drawImage(img, x, y, width, height);

                lastFrameIndex = frameIndex;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Start loop
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
                    WebkitFontSmoothing: 'antialiased'
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
