"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ImageSequence from "./ImageSequence";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
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

    // Text overlay — opacity + subtle scroll-driven vertical rise (no scale, no blur)
    const textOpacity = useTransform(springProgress, [0, 0.05, 0.15, 0.25], [0, 1, 1, 0]);
    const textY = useTransform(springProgress, [0, 0.12], [18, 0]);

    // Scroll hint fades out once user begins scrolling
    const scrollHintOpacity = useTransform(springProgress, [0, 0.04], [1, 0]);

    // Glass card 1 — visible at load, fades out BEFORE name appears (name starts at 0.04)
    const card1Opacity = useTransform(springProgress, [0, 0.02, 0.04], [1, 1, 0]);

    // Glass card 1.5 — RIGHT SIDE: enters from right, exits to left
    const card15Opacity = useTransform(springProgress, [0.26, 0.34, 0.44, 0.52], [0, 1, 1, 0]);
    const card15X = useTransform(springProgress, [0.26, 0.34, 0.44, 0.52], [24, 0, 0, -24]);

    // Glass card 2 — enters from left, exits to left
    const card2Opacity = useTransform(springProgress, [0.38, 0.48, 0.75, 0.85], [0, 1, 1, 0]);
    const card2X = useTransform(springProgress, [0.38, 0.48, 0.75, 0.85], [-24, 0, 0, -24]);

    return (
        <section ref={containerRef} className="relative h-[900vh] bg-luxury-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <style>{`
                    @font-face {
                        font-family: 'ClashGrotesk';
                        src: url('/resume/clashgrotesk-semibold.woff2') format('woff2');
                        font-weight: 600;
                    }
                `}</style>
                <ImageSequence
                    folderPath="/new_portfolio_animation"
                    frameCount={73}
                    startFrame={0}
                    filePrefix="Cinematic_applestyle_product_1080p_202602151_"
                    digitPadding={3}
                    className="opacity-75"
                    scrollProgress={springProgress}
                    onLoad={() => setLoaded(true)}
                />

                {/* Lighting ramp: dark overlay fades away on load for a product-reveal feel */}
                <motion.div
                    className="absolute inset-0 bg-black pointer-events-none z-50"
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Text overlay — opacity + subtle vertical rise */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                        style={{
                            opacity: textOpacity,
                            y: textY,
                        }}
                        className="text-center px-6 max-w-7xl"
                    >
                        {/* Main name — grey gradient. Drop-shadow lives on the wrapper div
                            because filter + webkit-background-clip:text conflict on the same element. */}
                        <div style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.8))", textAlign: "center" }}>
                            <h1
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-10 leading-[0.95] uppercase"
                                style={{
                                    background: "linear-gradient(180deg, #ffffff 0%, #a0a0a0 55%, #6B6B6B 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    display: "inline-block",
                                    fontFamily: "'ClashGrotesk', sans-serif",
                                    fontWeight: 600,
                                    letterSpacing: "-0.02em",
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
                                letterSpacing: "-0.01em",
                                textShadow: "0 1px 12px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.5)",
                                display: "block",
                                textAlign: "center",
                                fontFamily: "'ClashGrotesk', sans-serif",
                                fontWeight: 500,
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
                                display: "block",
                                textAlign: "center",
                                fontFamily: "'ClashGrotesk', sans-serif",
                                fontWeight: 500,
                                letterSpacing: "-0.01em",
                                transform: "translateX(-0.5px)",
                            }}
                        >
                            Designing and deploying scalable AI systems.
                        </p>
                    </motion.div>
                </div>

                {/* ── Scroll hint: stacked arrows on the right ───── */}
                <motion.div
                    style={{ opacity: loaded ? scrollHintOpacity : 0 }}
                    className="absolute right-87 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none select-none"
                >
                    {/* Vertical "scroll" label */}
                    <span
                        className="text-white/25 text-[8px] tracking-[0.3em] uppercase font-light mb-3"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                        scroll
                    </span>

                    {/* 3 cascading chevrons */}
                    {[0, 1, 2].map((i) => (
                        <motion.svg
                            key={i}
                            width="13"
                            height="7"
                            viewBox="0 0 16 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ y: [0, 4, 0], opacity: [0.08, 0.45, 0.08] }}
                            transition={{
                                duration: 2.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.45,
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

                {/* ── Glass card 1: Welcome ─────────────────────── */}
                <motion.div
                    style={{ opacity: loaded ? card1Opacity : 0 }}
                    className="absolute top-16 left-10 md:left-7 z-20 max-w-xs"
                >
                    <div style={{
                        background: "rgba(30, 30, 30, 0.42)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px",
                        padding: "28px 32px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}>

                        <h3 className="text-2xl font-semibold text-white leading-snug">
                            Watch <br />it
                            come<br />together.
                        </h3>
                        <p className="text-sm text-white/30 mt-2 leading-relaxed font-light">
                            Scroll to begin.
                        </p>
                    </div>
                </motion.div>

                {/* ── Glass card 1.5: Right-side stat — fills the gap ── */}
                <motion.div
                    style={{ opacity: card15Opacity, x: card15X }}
                    className="absolute top-1/2 -translate-y-1/2 right-10 md:right-16 z-20 max-w-[220px]"
                >
                    <div style={{
                        background: "rgba(30, 30, 30, 0.42)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px",
                        padding: "24px 28px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-4 font-medium">Based in India</p>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-2xl font-semibold text-white" style={{ fontFamily: "'ClashGrotesk', sans-serif" }}>AI</p>
                                <p className="text-[11px] text-white/40 mt-0.5 font-light">Systems Engineering</p>
                            </div>
                            <div className="w-full h-px bg-white/8" />
                            <div>
                                <p className="text-2xl font-semibold text-white" style={{ fontFamily: "'ClashGrotesk', sans-serif" }}>Scale</p>
                                <p className="text-[11px] text-white/40 mt-0.5 font-light">Production-grade builds</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Glass card 2: Brief intro ─────────────────── */}
                <motion.div
                    style={{ opacity: card2Opacity, x: card2X }}
                    className="absolute bottom-20 left-10 md:left-3 z-20 max-w-sm"
                >
                    <div style={{
                        background: "rgba(30, 30, 30, 0.42)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px",
                        padding: "28px 32px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 mb-3 font-medium">About</p>
                        <h3 className="text-xl font-semibold text-white leading-snug mb-3">
                            I'm <br />Sushant
                        </h3>
                        <p className="text-sm text-white/55 leading-relaxed font-light">
                            An engineer <br />carving a path<br /> in AI building systems<br /> that think, learn,
                            and scale.
                        </p>
                    </div>
                </motion.div>

                {/* Gradient overlay for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-luxury-black to-transparent" />
            </div>
        </section>
    );
}
