"use client";

import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import ImageSequence from "./ImageSequence";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Spring-smooth the raw scroll value — this is the key fix for mouse-wheel jitter.
    // stiffness + damping tuned so wheel ticks glide like a trackpad.
    const springProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 22,
        mass: 0.4,
        restDelta: 0.0001,
    });

    // Text overlay driven by the spring value so text also glides smoothly
    const textOpacity = useTransform(springProgress, [0, 0.03, 0.15, 0.25], [0, 1, 1, 0]);
    const textScale = useTransform(springProgress, [0, 0.03, 0.12], [0.98, 1, 1.02]);
    const textBlur = useTransform(springProgress, [0, 0.03], [4, 0]);
    const filter = useMotionTemplate`blur(${textBlur}px)`;

    // Scroll hint fades out once user begins scrolling
    const scrollHintOpacity = useTransform(springProgress, [0, 0.04], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[3000vh] bg-luxury-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ImageSequence
                    folderPath="/new_portfolio_animation"
                    frameCount={60}
                    startFrame={0}
                    filePrefix="Cinematic_applestyle_product_1080p_202602151_"
                    digitPadding={3}
                    className="opacity-75"
                    scrollProgress={springProgress}
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

                {/* ── Scroll hint: stacked arrows on the right ───── */}
                <motion.div
                    style={{ opacity: scrollHintOpacity }}
                    className="absolute right-87 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none select-none"
                >
                    {/* Vertical "scroll" label */}
                    <span
                        className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-light mb-3"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                        scroll
                    </span>

                    {/* 3 cascading chevrons */}
                    {[0, 1, 2].map((i) => (
                        <motion.svg
                            key={i}
                            width="16"
                            height="9"
                            viewBox="0 0 16 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ y: [0, 6, 0], opacity: [0.15, 0.85, 0.15] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.25,
                            }}
                        >
                            <path
                                d="M1 1L8 8L15 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    ))}
                </motion.div>

                {/* Gradient overlay for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-luxury-black to-transparent" />
            </div>
        </section>
    );
}
