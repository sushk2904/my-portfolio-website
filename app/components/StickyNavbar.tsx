"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function StickyNavbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(true);

    // useTransform to map scrollY to opacity/blur
    // We want it to be hidden at 0, and fade in by 100px
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setHidden(latest < 50);
        });
    }, [scrollY]);

    return (
        <motion.nav
            style={{
                backgroundColor: "rgba(2, 6, 23, 0.85)", // crave-bg
                backdropFilter: "blur(12px)",
                opacity
            }}
            className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-6 md:px-12 border-b border-white/5 transition-opacity duration-500"
        >
            {/* Left: Logo */}
            <div className="text-white font-medium tracking-tight text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-luxury-accent rounded-full" />
                SUSHANT KUMAR
            </div>

            {/* Center: Links (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/70">
                <a href="#" className="hover:text-luxury-accent transition-colors">Work</a>
                <a href="#" className="hover:text-luxury-accent transition-colors">Stack</a>
                <a href="#" className="hover:text-luxury-accent transition-colors">About</a>
                <a href="#" className="hover:text-luxury-accent transition-colors">Contact</a>
            </div>

            {/* Right: CTA */}
            <div>
                <button className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-luxury-gray transition-all">
                    Resume
                </button>
            </div>
        </motion.nav>
    );
}
