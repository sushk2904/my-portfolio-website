"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DashboardPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section ref={containerRef} className="min-h-screen bg-black flex items-center justify-center py-20 perspective-1000 overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white text-3xl md:text-5xl font-bold mb-4"
                    >
                        Orchestrate your Menu.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 max-w-xl mx-auto"
                    >
                        Real-time insights on flavor profiles, supply chain velocity, and customer cravings.
                    </motion.p>
                </div>

                {/* 3D Dashboard Container */}
                <motion.div
                    style={{ rotateX, scale, opacity }}
                    className="relative w-full max-w-5xl mx-auto aspect-video bg-zinc-900/50 rounded-xl border border-zinc-800 shadow-2xl backdrop-blur-sm overflow-hidden"
                >
                    {/* Glossy Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                    {/* Simulated UI Content */}
                    <div className="grid grid-cols-12 h-full">
                        {/* Sidebar */}
                        <div className="col-span-2 border-r border-zinc-800 p-4 space-y-4">
                            <div className="h-2 w-8 bg-zinc-700 rounded mb-8" />
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-8 w-full bg-zinc-800/50 rounded" />
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="col-span-10 p-6">
                            <div className="flex justify-between items-center mb-8">
                                <div className="h-4 w-32 bg-zinc-700 rounded" />
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-zinc-800 rounded-full" />
                                    <div className="h-8 w-8 bg-zinc-800 rounded-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-32 bg-black/40 rounded border border-zinc-800 p-4">
                                        <div className="h-2 w-16 bg-zinc-700 rounded mb-4" />
                                        <div className="h-12 w-full bg-crave-accent/10 rounded-full relative overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "60%" }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="absolute inset-y-0 left-0 bg-crave-accent"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-64 bg-black/40 rounded border border-zinc-800 w-full relative overflow-hidden">
                                {/* Fake Graph */}
                                <svg className="absolute inset-0 w-full h-full text-crave-accent/20" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,100 Q200,50 400,80 T800,40 V200 H0 Z"
                                        fill="currentColor"
                                        initial={{ d: "M0,200 Q200,200 400,200 T800,200 V200 H0 Z" }}
                                        whileInView={{ d: "M0,100 Q200,50 400,80 T800,40 V200 H0 Z" }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
