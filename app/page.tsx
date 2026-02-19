"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import Projects from "./components/Projects";
import StickyNavbar from "./components/StickyNavbar";

function SpiralAnnotation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative inline-flex flex-col items-center">
      <a
        href="mailto:your@email.com"
        className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-all"
      >
        Get in Touch
      </a>

      {/* Spiral arrow annotation — triggers on scroll into view */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: "-10px", right: "-175px", transform: "rotate(8deg)" }}
      >
        {/* Handwritten label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "15px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            marginBottom: "4px",
            textAlign: "left",
          }}
        >
          or dig deeper ↗
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.9, ease: "easeOut" }}
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "12px",
            color: "rgba(255,255,255,0.28)",
            whiteSpace: "nowrap",
            textAlign: "left",
          }}
        >
          resume's got the full story
        </motion.p>

        {/* Self-drawing spiral SVG arrow */}
        <svg
          width="90"
          height="70"
          viewBox="0 0 90 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "4px", overflow: "visible" }}
        >
          <motion.path
            d="M 10 65 C 8 45, 20 20, 42 18 C 60 16, 72 8, 70 2"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Arrowhead */}
          <motion.path
            d="M 70 2 L 64 9 M 70 2 L 77 7"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.35, delay: 2.0, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <main className="relative min-h-screen bg-luxury-black">
      <StickyNavbar />
      <div id="introduction">
        <HeroSection />
      </div>
      <Projects />

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#111111] px-6 md:px-12">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');`}</style>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-semibold text-white mb-12 tracking-tight">Contact</h3>
          <p className="text-lg text-gray-400 mb-8">Let's build something exceptional together.</p>
          <SpiralAnnotation />
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-luxury-gray text-xs uppercase tracking-widest">
        © 2026 Sushant Kumar. Engineering Excellence.
      </footer>
    </main>
  );
}
