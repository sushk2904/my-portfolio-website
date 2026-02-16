"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import ImageSequence from "./ImageSequence";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Apple-style reveal: Scale + blur on entrance, then fade out
    const textOpacity = useTransform(scrollYProgress, [0, 0.04, 0.15, 0.28], [0, 1, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.04, 0.15], [0.96, 1, 1.03]);
    const textBlur = useTransform(scrollYProgress, [0, 0.04], [8, 0]);
    const filter = useMotionTemplate`blur(${textBlur}px)`;

    return (
        <section ref={containerRef} className="relative h-[2500vh] bg-luxury-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ImageSequence
                    folderPath="/portfolio_final"
                    frameCount={203}
                    startFrame={13}
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
                            filter
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
