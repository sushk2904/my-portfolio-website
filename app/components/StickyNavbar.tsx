"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyNavbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(true);
    const [activeSection, setActiveSection] = useState("");

    const opacity = useTransform(scrollY, [0, 100], [0, 1]);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setHidden(latest < 50);
        });
    }, [scrollY]);

    // Smooth scroll to section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    // Track active section by scroll position — reliable even with very tall sections
    useEffect(() => {
        const sectionIds = ["introduction", "projects", "contact"];

        const updateActive = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.3; // 30% down the viewport

            let current = sectionIds[0];
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    current = id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", updateActive, { passive: true });
        updateActive(); // run once on mount
        return () => window.removeEventListener("scroll", updateActive);
    }, []);

    const navItems = [
        { label: "Introduction", id: "introduction" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" }
    ];

    return (
        <motion.nav
            style={{
                backgroundColor: "rgba(2, 6, 23, 0.85)",
                backdropFilter: "blur(12px)",
                opacity
            }}
            className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-center px-6 md:px-12 border-b border-white/5 transition-opacity duration-500"
        >
            {/* Center: Navigation Links */}
            <div className="flex items-center gap-8 text-xs font-medium text-white/70 mr-12">
                {navItems.map(({ label, id }) => (
                    <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`transition-all duration-200 ${activeSection === id
                            ? "text-white font-semibold -translate-y-0.5"
                            : "text-white/50 font-medium hover:text-white hover:-translate-y-0.5"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="absolute right-6 md:right-12">
                <Link
                    href="/resume"
                    className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-luxury-gray transition-all inline-block"
                >
                    Resume
                </Link>

                {/* Annotation: visible only when Projects section is active */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={activeSection === "projects" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute top-10 right-[-24px] pointer-events-none select-none w-64 flex flex-col items-end"
                >
                    <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');`}</style>

                    {/* Spiral arrow — larger, with a looping slow rotate */}
                    <motion.svg
                        width="80"
                        height="65"
                        viewBox="0 0 90 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-10 mb-0"
                        style={{ transform: "rotate(20deg) scaleX(-1)" }}
                        animate={activeSection === "projects" ? { rotate: [20, 24, 20] } : {}}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Main spiral curve */}
                        <motion.path
                            d="M 75 62 C 60 62, 20 55, 14 30 C 10 14, 22 4, 36 8 C 50 12, 52 28, 38 32 C 26 36, 16 28, 20 18"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={activeSection === "projects" ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {/* Arrowhead */}
                        <motion.path
                            d="M 20 18 L 27 22 M 20 18 L 18 26"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={activeSection === "projects" ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 1.4, duration: 0.25 }}
                        />
                    </motion.svg>

                    {/* Handwritten text */}
                    <div className="text-right mr-8 -mt-1">
                        <p style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "17px",
                            color: "rgba(255,255,255,0.65)",
                            lineHeight: 1.25,
                            whiteSpace: "nowrap",
                        }}>
                            full story in here
                        </p>
                        <p style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.32)",
                            whiteSpace: "nowrap",
                        }}>
                            & detailed case studies
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
