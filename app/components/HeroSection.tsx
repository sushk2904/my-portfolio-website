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

    // Spring — tight and responsive, not sluggish
    const springProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 25,
        mass: 0.3,
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
        <section ref={containerRef} className="relative h-[900vh] bg-luxury-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ImageSequence
                    folderPath="/new_portfolio_animation"
                    frameCount={73}
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
                        {/* Main name — grey gradient. Drop-shadow lives on the wrapper div
                            because filter + webkit-background-clip:text conflict on the same element. */}
                        <div style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.8))" }}>
                            <h1
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-10 leading-[0.95]"
                                style={{
                                    background: "linear-gradient(180deg, #ffffff 0%, #a0a0a0 55%, #6B6B6B 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    transform: "scale(0.975)",
                                    transformOrigin: "center",
                                    display: "inline-block",
                                }}
                            >
                                Sushant Kumar
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <h2
                            className="text-2xl md:text-4xl font-medium mb-6"
                            style={{
                                color: "#E4E4E7",
                                letterSpacing: "0.03em",
                                textShadow: "0 1px 12px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.5)",
                                transform: "scale(1.02)",
                                transformOrigin: "center",
                                display: "block",
                            }}
                        >
                            AI Systems Engineer
                        </h2>

                        {/* One-liner */}
                        <p
                            className="text-base md:text-xl font-light leading-relaxed"
                            style={{
                                color: "#C4C4C8",
                                textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)",
                                transform: "scale(1.02)",
                                display: "inline-block",
                            }}
                        >
                            Designing and deploying scalable AI systems.
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
