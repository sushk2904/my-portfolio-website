"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
                {/* Pulse ring — starts at Projects, stays till Contact */}
                {(activeSection === "projects" || activeSection === "contact") && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-white/20 pointer-events-none" />
                )}

                <Link
                    href="/resume"
                    className="relative bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-luxury-gray transition-all inline-block"
                >
                    Resume
                </Link>

                {/* Annotation: visible from Projects section onwards */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={(activeSection === "projects" || activeSection === "contact") ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute top-10 right-[8px] pointer-events-none select-none w-64 flex flex-col items-end"
                >
                    <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');`}</style>

                    <Image
                        src="/resume/resume_pointing_arrow.png"
                        alt="pointing arrow"
                        width={90}
                        height={120}
                        className="mr-6 mb-1"
                        style={{ objectFit: "contain", opacity: 0.8 }}
                    />

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
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
