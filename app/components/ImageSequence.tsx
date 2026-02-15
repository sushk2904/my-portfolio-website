"use client";

import { MotionValue, useScroll } from "framer-motion";
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize(); // Initial size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Buttery smooth render loop with frame interpolation
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d", {
            alpha: false,
            desynchronized: true // Hint browser for smoother animation
        });
        if (!canvas || !ctx) return;

        let animationFrameId: number;
        let currentFrame = 0; // Smooth interpolated frame position

        const render = () => {
            const currentProgress = activeProgress.get();
            // Calculate target frame
            const targetFrame = Math.min(
                frameCount - 1,
                Math.max(0, currentProgress * (frameCount - 1))
            );

            // Lerp (linear interpolation) for buttery smoothness
            // Higher lerp = faster catch-up, lower = smoother but more lag
            const lerpFactor = 0.12;
            currentFrame += (targetFrame - currentFrame) * lerpFactor;

            // Get the actual frame index to display
            const frameIndex = Math.round(currentFrame);

            // Always render for smooth interpolation
            if (images[frameIndex]) {
                const img = images[frameIndex];

                // Calculate cover fit
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                const width = img.width * scale;
                const height = img.height * scale;

                ctx.drawImage(img, x, y, width, height);
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
                    WebkitFontSmoothing: 'antialiased',
                    transform: 'translateZ(0)', // GPU acceleration
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
