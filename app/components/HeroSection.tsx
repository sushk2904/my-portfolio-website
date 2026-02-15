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

    const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.08], [0, 100]);

    return (
        <section ref={containerRef} className="relative h-[1200vh] bg-luxury-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ImageSequence
                    folderPath="/portfolio_final"
                    frameCount={225}
                    filePrefix="ezgif-frame-"
                    digitPadding={3}
                    className="opacity-60 mix-blend-screen"
                    scrollProgress={scrollYProgress}
                />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                        style={{ opacity, y }}
                        className="text-center px-4"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-4"
                        >
                            Sushant Kumar
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-3xl text-luxury-gray font-light tracking-wide uppercase mb-8"
                        >
                            AI Systems Engineer
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-sm md:text-base text-luxury-accent max-w-md mx-auto font-mono"
                        >
                            Building production-grade intelligent systems.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Gradient overlay for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-luxury-black to-transparent" />
            </div>
        </section>
    );
}
