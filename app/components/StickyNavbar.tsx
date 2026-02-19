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

    // Track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const sections = ["introduction", "projects", "contact"];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
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
                        className={`hover:text-white hover:-translate-y-0.5 transition-all duration-200 ${activeSection === id ? "text-white" : ""
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
            </div>
        </motion.nav>
    );
}
