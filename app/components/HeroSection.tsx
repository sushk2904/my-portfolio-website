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

    // Apple-style reveal: Scale + blur on entrance, then fade out
    const textOpacity = useTransform(scrollYProgress, [0, 0.03, 0.12, 0.25], [0, 1, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.03, 0.12], [0.95, 1, 1.02]);
    const textBlur = useTransform(scrollYProgress, [0, 0.03], [10, 0]);

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

                {/* Apple-style text overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                        style={{
                            opacity: textOpacity,
                            scale: textScale,
                            filter: `blur(${textBlur.get()}px)`
                        }}
                        className="text-center px-6 max-w-7xl"
                    >
                        {/* Main name with Apple-style gradient */}
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-6 bg-linear-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-[0.9]"
                            style={{
                                textShadow: '0 0 80px rgba(255,255,255,0.1)',
                                WebkitTextStroke: '0.5px rgba(255,255,255,0.1)'
                            }}>
                            Sushant Kumar
                        </h1>

                        {/* Subtitle */}
                        <h2 className="text-2xl md:text-4xl font-light tracking-wide text-gray-400 mb-4 uppercase"
                            style={{ letterSpacing: '0.15em' }}>
                            AI Systems Engineer
                        </h2>

                        {/* Apple-style tagline */}
                        <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
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
