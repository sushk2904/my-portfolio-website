"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImageSequence from "./ImageSequence";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Text fades IN when scrolling starts (0-10%), then fades OUT later (15-25%)
    const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.2], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.1, 0.2], [20, 0, -50]);

    return (
        <section ref={containerRef} className="relative h-[1200vh] bg-luxury-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ImageSequence
                    folderPath="/portfolio_final"
                    frameCount={215}
                    filePrefix="ezgif-frame-"
                    digitPadding={3}
                    className="opacity-60 mix-blend-screen"
                    scrollProgress={scrollYProgress}
                />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                        style={{ opacity: textOpacity, y: textY }}
                        className="text-center px-4"
                    >
                        <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-4">
                            Sushant Kumar
                        </h1>
                        <h2 className="text-xl md:text-3xl text-luxury-gray font-light tracking-wide uppercase mb-8">
                            AI Systems Engineer
                        </h2>
                        <p className="text-sm md:text-base text-luxury-accent max-w-md mx-auto font-mono">
                            Building production-grade intelligent systems.
                        </p>
                    </motion.div>
                </div>

                {/* Gradient overlay for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-luxury-black to-transparent" />
            </div>
        </section>
    );
}
