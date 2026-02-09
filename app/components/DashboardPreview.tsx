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
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-3 h-3 bg-crave-accent rounded-full" />
                                <span className="text-zinc-300 font-bold text-xs tracking-widest">MENU</span>
                            </div>
                            {["Overview", "Inventory", "Engineering", "Customers", "Settings"].map((item) => (
                                <div key={item} className="h-8 w-full flex items-center px-2 rounded hover:bg-zinc-800/50 cursor-pointer transition-colors group">
                                    <span className="text-zinc-500 text-xs font-medium group-hover:text-white transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="col-span-10 p-6">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-white text-lg font-medium">Dashboard</h3>
                                    <p className="text-zinc-500 text-xs">Today, Feb 24</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 text-xs">🔔</div>
                                    <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-crave-accent to-emerald-900 border border-crave-accent/30">JD</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="h-32 bg-black/40 rounded border border-zinc-800 p-4 flex flex-col justify-between">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Total Revenue</span>
                                    <div className="text-2xl text-white font-mono">$12,450</div>
                                    <div className="text-crave-accent text-xs flex items-center gap-1">
                                        <span>+12.5%</span>
                                        <span className="text-zinc-600">vs last week</span>
                                    </div>
                                </div>
                                <div className="h-32 bg-black/40 rounded border border-zinc-800 p-4 flex flex-col justify-between">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Active Orders</span>
                                    <div className="text-2xl text-white font-mono">84</div>
                                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "70%" }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-orange-500"
                                        />
                                    </div>
                                </div>
                                <div className="h-32 bg-black/40 rounded border border-zinc-800 p-4 flex flex-col justify-between">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Avg. Prep Time</span>
                                    <div className="text-2xl text-white font-mono">14m 20s</div>
                                    <div className="text-emerald-500 text-xs flex items-center gap-1">
                                        <span>-2m 10s</span>
                                        <span className="text-zinc-600">faster</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-64 bg-black/40 rounded border border-zinc-800 w-full relative overflow-hidden p-4">
                                <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-4">Sales Velocity (Hourly)</span>
                                {/* Fake Graph */}
                                <svg className="absolute inset-0 w-full h-full text-crave-accent/20 pt-12" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,150 Q100,100 200,120 T400,80 T600,100 T800,40 V250 H0 Z"
                                        fill="url(#gradient)"
                                        initial={{ d: "M0,250 Q100,250 200,250 T400,250 T600,250 T800,250 V250 H0 Z" }}
                                        whileInView={{ d: "M0,150 Q100,100 200,120 T400,80 T600,100 T800,40 V250 H0 Z" }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                {/* Graph Line */}
                                <svg className="absolute inset-0 w-full h-full text-crave-accent pt-12 pointer-events-none" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,150 Q100,100 200,120 T400,80 T600,100 T800,40"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
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
