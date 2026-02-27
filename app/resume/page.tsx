"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Design tokens matching main site ───────────────────────────────────────
// bg:      #0a0a0a  (luxury-black)
// surface: #111111  (slightly lighter)
// card:    #1a1a1a  (card bg)
// border:  rgba(255,255,255,0.08)
// accent:  #94a3b8  (slate-400 metallic)
// text:    #ffffff / #a1a1aa (muted)
// font:    ClashGrotesk (headings) + Inter (body)

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.22)", marginTop: "-1px" }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px 28px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    textAlign: "left",
                }}
            >
                <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "22px", fontWeight: 500 }}>{title}</span>
                <span style={{
                    width: "28px", height: "28px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#94a3b8",
                    fontSize: "18px",
                    flexShrink: 0,
                    transition: "transform 0.3s",
                    transform: open ? "rotate(45deg)" : "none",
                }}>+</span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{
                            padding: "20px 28px 28px",
                            color: "#a1a1aa",
                            borderTop: "1px solid rgba(255,255,255,0.18)",
                            backgroundColor: "rgba(255,255,255,0.03)",
                        }}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ExperienceCard({ company, year, role, period, description, posts }: {
    company: string; year: string; role: string; period: string; description: string; posts: string[];
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                flexDirection: "column",
                padding: "40px",
                display: "flex",
                position: "relative",
                overflow: "hidden",
                minHeight: "260px",
                transition: "border-color 0.3s",
                borderColor: hovered ? "rgba(148,163,184,0.3)" : "rgba(255,255,255,0.06)",
            }}
        >
            <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "32px", fontWeight: 500, margin: "0 0 8px", color: "#fff" }}>{company}</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>{year}</p>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "#1a1a1a",
                            padding: "40px",
                            zIndex: 1,
                            borderLeft: "2px solid #94a3b8",
                        }}
                    >
                        <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{period}</p>
                        <h4 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "24px", fontWeight: 500, margin: "0 0 12px", color: "#fff" }}>{role}</h4>
                        <p style={{ color: "#a1a1aa", fontSize: "14px", margin: "0 0 20px", lineHeight: "1.6" }}>{description}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {posts.map((post, i) => (
                                <span key={i} style={{
                                    fontSize: "11px",
                                    color: "#94a3b8",
                                    border: "1px solid rgba(148,163,184,0.3)",
                                    padding: "4px 12px",
                                    letterSpacing: "0.05em",
                                }}>{post}</span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ResumePage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    // Track which section is in view — scroll-position approach works reliably
    // regardless of section height (IntersectionObserver fails on short sections)
    useEffect(() => {
        const sections = ["about", "experience", "project", "coding", "contact"];

        const updateActive = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.3;

            let current = sections[0];
            for (const id of sections) {
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

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const offset = el.getBoundingClientRect().top + window.scrollY - 64; // 64px = navbar height
        window.scrollTo({ top: offset, behavior: "smooth" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, phone, subject, message } = formData;
        const parts = [
            name && `Name: ${name}`,
            email && `Email: ${email}`,
            phone && `Phone: ${phone}`,
            subject && `Subject: ${subject}`,
            message && `\n${message}`,
        ].filter(Boolean).join("\n");

        const waUrl = `https://wa.me/919891343285?text=${encodeURIComponent(parts)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <main style={{
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#080808",
            color: "#ffffff",
            fontSize: "16px",
            lineHeight: "1.6",
            WebkitFontSmoothing: "antialiased",
        }}>
            <style>{`
                @font-face {
                    font-family: 'ClashGrotesk';
                    src: url('/resume/clashgrotesk-semibold.woff2') format('woff2');
                    font-weight: 600;
                }
                @font-face {
                    font-family: 'ClashGrotesk';
                    src: url('/resume/clashgrotesk-medium.woff2') format('woff2');
                    font-weight: 500;
                }
                .resume-nav-link {
                    color: rgba(255,255,255,0.45);
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                    transition: color 0.25s, transform 0.25s, text-shadow 0.25s;
                    padding: 4px 0;
                    display: inline-block;
                }
                .resume-nav-link:hover {
                    color: rgba(255,255,255,0.85);
                    transform: translateY(-1px);
                }
                .resume-nav-link--active {
                    color: #ffffff !important;
                    transform: translateY(-2px);
                }
                .resume-btn {
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #fff;
                    background: transparent;
                    padding: 10px 24px;
                    font-size: 13px;
                    font-weight: 500;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    transition: all 0.25s;
                    cursor: pointer;
                    font-family: 'Inter', sans-serif;
                    display: inline-block;
                }
                .resume-btn:hover {
                    background: rgba(148,163,184,0.1);
                    border-color: #94a3b8;
                }
                .resume-btn-accent {
                    background: #fff;
                    color: #0a0a0a;
                    border-color: #fff;
                    font-weight: 600;
                }
                .resume-btn-accent:hover {
                    background: #94a3b8;
                    border-color: #94a3b8;
                    color: #0a0a0a;
                }
                .project-link {
                    text-decoration: none;
                    display: block;
                }
                .project-img-wrap {
                    overflow: hidden;
                    margin-bottom: 20px;
                }
                .project-img-inner {
                    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
                }
                .project-link:hover .project-img-inner {
                    transform: scale(1.04);
                }
                .social-card {
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.06);
                    padding: 20px 24px;
                    text-decoration: none;
                    display: block;
                    transition: border-color 0.25s, background 0.25s;
                    margin-top: 12px;
                }
                .social-card:hover {
                    border-color: rgba(148,163,184,0.4);
                    background: #1a1a1a;
                }
                .footer-link {
                    color: rgba(255,255,255,0.5);
                    text-decoration: none;
                    font-size: 13px;
                    transition: color 0.2s;
                }
                .footer-link:hover { color: #fff; }
                .form-input-dark {
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    height: 52px;
                    padding: 0 18px;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    outline: none;
                    width: 100%;
                    transition: border-color 0.2s;
                    box-sizing: border-box;
                }
                .form-input-dark::placeholder { color: rgba(255,255,255,0.3); }
                .form-input-dark:focus { border-color: #94a3b8; }
                .form-textarea-dark {
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    height: 140px;
                    padding: 14px 18px;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    outline: none;
                    width: 100%;
                    resize: none;
                    transition: border-color 0.2s;
                    box-sizing: border-box;
                }
                .form-textarea-dark::placeholder { color: rgba(255,255,255,0.3); }
                .form-textarea-dark:focus { border-color: #94a3b8; }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .rotating-circle { animation: spin-slow 12s linear infinite; }
                .skill-tag {
                    font-size: 12px;
                    color: #94a3b8;
                    border: 1px solid rgba(148,163,184,0.25);
                    padding: 4px 12px;
                    letter-spacing: 0.04em;
                    display: inline-block;
                    margin: 4px 4px 4px 0;
                }
            `}</style>

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                backgroundColor: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                height: "56px",
                display: "flex", alignItems: "center",
            }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>SK</span>
                    </Link>

                    {/* Center-pinned nav links */}
                    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "32px", alignItems: "center" }}>
                        {([
                            { href: "#about", label: "About" },
                            { href: "#experience", label: "Experience" },
                            { href: "#project", label: "Projects" },
                            { href: "#coding", label: "Coding" },
                            { href: "#contact", label: "Contact" },
                        ] as { href: string; label: string }[]).map(({ href, label }) => {
                            const id = href.replace("#", "");
                            return (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={`resume-nav-link${activeSection === id ? " resume-nav-link--active" : ""}`}
                                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => scrollToSection("contact")}
                        className="resume-btn resume-btn-accent"
                        style={{ fontSize: "12px", padding: "8px 20px", cursor: "pointer", fontFamily: "inherit" }}
                    >
                        Hire me
                    </button>
                </div>
            </nav>

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section id="about" style={{ paddingTop: "120px", paddingBottom: "0px", overflow: "hidden" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px", position: "relative", minHeight: "500px" }}>
                    {/* Big name */}
                    <div style={{ marginBottom: "55px" }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontFamily: "'ClashGrotesk', sans-serif",
                                color: "#fff",
                                textTransform: "uppercase",
                                fontSize: "clamp(72px, 10vw, 140px)",
                                fontWeight: 600,
                                margin: "0 0 24px",
                                lineHeight: "1em",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Sushant<br />Kumar
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ color: "#a1a1aa", maxWidth: "380px", margin: "0 0 32px", lineHeight: "1.7" }}
                        >
                            Developing scalable AI systems  <br /> from research to deployment for high impact.
                        </motion.p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                            <a href="/resume.pdf" className="resume-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                Download CV
                            </a>
                        </motion.div>
                    </div>

                    {/* Right side contact card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        style={{ position: "absolute", right: "90px", top: "140px", maxWidth: "280px" }}
                    >
                        <div style={{
                            background: "rgba(20, 20, 20, 0.6)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "16px",
                            padding: "24px 28px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)" }}></div>
                                <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>Open to work</p>
                            </div>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "28px", fontWeight: 500, margin: "0 0 16px", color: "#fff", lineHeight: "1.2" }}>Let's <br /> Work Together</h2>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                sushantk2904@gmail.com
                            </p>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                +91 98913 43285
                            </p>
                        </div>
                    </motion.div>

                    {/* Hero image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{ position: "absolute", right: "350px", top: "19px", width: "390px" }}
                    >
                        <Image src="/resume/new_hero_image_v2.png" alt="Sushant Kumar" width={340} height={440} style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(20%)" }} />
                    </motion.div>

                    {/* Rotating circle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        style={{ position: "absolute", right: "-15px", top: "-10px", width: "100px", height: "100px" }}
                        className="rotating-circle"
                    >
                        <svg viewBox="0 0 120 120" style={{ overflow: "visible" }}>
                            {/* Hidden path for the text to follow: Starts bottom (60,110), goes clockwise through left to top to right */}
                            <path id="textCircle" d="M 60,110 A 50,50 0 1 1 60,10 A 50,50 0 1 1 60,110" fill="none" />

                            {/* Text centered at the exact top of the circle */}
                            <text fill="#ffffff" fontSize="13" fontWeight="500" letterSpacing="0.32em" style={{ textTransform: "uppercase", opacity: 0.6 }}>
                                <textPath href="#textCircle" startOffset="50%" textAnchor="middle">
                                    AI Systems Engineer
                                </textPath>
                            </text>

                            {/* The red/magenta arc at the bottom connecting the text ends */}
                            <path
                                d="M 19 100 A 52 52 0 0 0 103 100"
                                fill="none"
                                stroke="#9d0a5e"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ opacity: 0.8 }}
                            />
                        </svg>
                    </motion.div>

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        style={{ position: "absolute", left: "370px", bottom: "130px" }}
                    >
                        <Image src="/resume/singature-removebg-preview.png" alt="Signature" width={100} height={90} style={{ opacity: 0.9, filter: "invert(1)" }} />
                    </motion.div>
                </div>
            </section>

            {/* ── Typographical Statement ──────────────────────────────────── */}
            <section style={{ padding: "0px 0 40px", position: "relative", zIndex: 10 }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontFamily: "'ClashGrotesk', system-ui, sans-serif",
                            fontSize: "clamp(28px, 4vw, 50px)",
                            color: "#f8fafc",
                            lineHeight: "1.5",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            maxWidth: "1200px"
                        }}
                    >
                        {"I'm Sushant, an "}
                        <span style={{ borderBottom: "4px solid #10b981", paddingBottom: "2px" }}>AI/ML engineer</span>
                        {" focused on building "}
                        <span style={{ borderBottom: "4px solid #10b981", paddingBottom: "2px" }}>scalable intelligence</span>
                        {". I started with machine learning experiments and research implementations, and now I design & deploy "}
                        <span style={{ borderBottom: "4px solid #10b981", paddingBottom: "2px" }}>production-ready AI systems</span>
                        {" that operate at "}
                        <span style={{ borderBottom: "4px solid #10b981", paddingBottom: "2px" }}>real-world scale</span>
                        {"."}
                    </motion.h3>
                </div>
            </section>

            {/* ── Personal Info + Education ────────────────────────────────── */}
            <section style={{ paddingTop: "60px", paddingBottom: "80px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8 }}
                        style={{ display: "grid", gridTemplateColumns: "0.6fr 1.4fr", gap: "80px", alignItems: "start" }}
                    >
                        {/* ── Personal Info ── */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "18px", fontWeight: 500, color: "#fff" }}>Personal Info</span>
                            </div>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: "1.7", margin: "0 0 28px", maxWidth: "280px" }}>
                                Focused on building <br /> reliable AI systems that bridge <br />research and real-world applications.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {[
                                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, text: "Noida, India" },
                                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, text: "sushantk2904@gmail.com" },
                                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, text: "+91 98913 43285" },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#a1a1aa", fontSize: "14px" }}>
                                        <span style={{ color: "#6b7280", flexShrink: 0 }}>{item.icon}</span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Education Timeline ── */}
                        <div>
                            {/* Heading sits ABOVE the grid, centered over the timeline */}
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                                <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "18px", fontWeight: 500, color: "#fff" }}>Education</span>
                            </div>

                            {/* 3-column timeline grid */}
                            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "24px", rowGap: "0" }}>
                                {/* Vertical connecting line */}
                                <div style={{ position: "absolute", left: "50%", top: "8px", bottom: "8px", width: "1px", backgroundColor: "rgba(255,255,255,0.08)", transform: "translateX(-50%)", zIndex: 0 }} />

                                {[
                                    { institution: "Amity University, Uttar Pradesh", date: "2024 – 2028 | CGPA: 8.30 / 10", degree: "B.Tech in Computer Science", desc: "Focused coursework in AI/ML, distributed systems, and large-scale software architecture." },
                                    { institution: "Vidya Bal Bhawan Sr. Sec. School", date: "2021 – 2023", degree: "Senior Secondary — Science", desc: "Mathematics, Physics, Chemistry, Computer Science and English" },
                                ].map((edu, i, arr) => (
                                    <>
                                        <div key={`left-${i}`} style={{ textAlign: "right", paddingBottom: i < arr.length - 1 ? "40px" : "0" }}>
                                            <p style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "16px", fontWeight: 500, color: "#fff", margin: "0 0 4px" }}>{edu.institution}</p>
                                            <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>{edu.date}</p>
                                        </div>
                                        <div key={`dot-${i}`} style={{ display: "flex", justifyContent: "center", paddingTop: "4px", zIndex: 1 }}>
                                            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981", border: "2px solid #0a0a0a", boxShadow: "0 0 0 3px rgba(16,185,129,0.2)", flexShrink: 0 }} />
                                        </div>
                                        <div key={`right-${i}`} style={{ paddingBottom: i < arr.length - 1 ? "40px" : "0" }}>
                                            <p style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "16px", fontWeight: 500, color: "#fff", margin: "0 0 6px" }}>{edu.degree}</p>
                                            <p style={{ color: "#71717a", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{edu.desc}</p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ── Experience ─────────────────────────────────────────── */}
            <section id="experience" style={{ paddingTop: "80px", paddingBottom: "120px", backgroundColor: "#080808" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "inline-block", textAlign: "center" }}>
                        <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Career</h2>
                        <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 48px" }}>Experience</p>
                    </div>

                    {/* Minimal Horizontal Timeline */}
                    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>

                        {/* ── Experience arrow + label ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            viewport={{ once: false, margin: "-60px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                top: "-62px",   /* ← move up/down */
                                left: "-36px",  /* ← move left/right */
                                display: "flex",
                                alignItems: "flex-end",
                                gap: "3px",
                                pointerEvents: "none",
                                userSelect: "none",
                            }}>
                            <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');`}</style>
                            <Image
                                src="/resume/experience_arrow.png"
                                alt=""
                                width={45}
                                height={150}
                                style={{
                                    opacity: 0.8,
                                    transform: "scaleX(-1)",
                                    flexShrink: 0,
                                }}
                            />
                            <p style={{
                                fontFamily: "'ClashGrotesk', sans-serif",
                                fontSize: "10px",
                                opacity: 0.8,
                                color: "rgba(255,255,255,0.6)",
                                margin: "0 0 18px",
                                whiteSpace: "nowrap",
                                lineHeight: 1.2,
                            }}>
                                "View Details"
                            </p>
                        </motion.div>

                        {/* ── Line + Dot row — hover on whole row triggers panel ── */}
                        <motion.div
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            style={{ position: "relative", height: "9px", display: "flex", alignItems: "center", cursor: "crosshair" }}
                        >
                            {/* Full-width horizontal line */}
                            <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: "1px", backgroundColor: "rgba(255,255,255,0.22)", transform: "translateY(-50%)" }} />

                            {/* Dot — inherits hover from parent */}
                            <motion.div
                                style={{ position: "relative", zIndex: 10, flexShrink: 0 }}
                            >
                                {/* Circle */}
                                <motion.div
                                    variants={{
                                        rest: { backgroundColor: "#3f3f46", boxShadow: "0 0 0 0 rgba(16,185,129,0)", scale: 1 },
                                        hover: { backgroundColor: "#10b981", boxShadow: "0 0 0 10px rgba(16,185,129,0.12)", scale: 1.3 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{ width: "9px", height: "9px", borderRadius: "50%" }}
                                />

                                {/* Hover panel floats down-right of the dot */}
                                <motion.div
                                    variants={{
                                        rest: { opacity: 0, y: 8, pointerEvents: "none" },
                                        hover: { opacity: 1, y: 0, pointerEvents: "auto" }
                                    }}
                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                    style={{
                                        position: "absolute",
                                        top: "20px",
                                        left: "0px",
                                        width: "380px",
                                        padding: "28px 30px",
                                        backgroundColor: "rgba(8,8,8,0.88)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "14px",
                                        boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(16,185,129,0.06)",
                                        zIndex: 100
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 6px rgba(16,185,129,0.6)" }} />
                                        <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "14px", fontWeight: 500, color: "#fff" }}>Key Research Areas</span>
                                    </div>
                                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {[
                                            "Built modular scraping systems across pre-existing multi-platform pipelines (7+ scrapers)",
                                            "Developed 3 production-grade platform integrations handling multimodal data extraction.",
                                            "Improved data collection throughput by ~20% in pre-existing pipelines by code refactoring",
                                            "Maintained schema integrity and consistent structured storage of multimodal datasets.",
                                        ].map((point, i) => (
                                            <li key={i} style={{ display: "flex", gap: "10px", color: "#a1a1aa", fontSize: "13px", lineHeight: "1.65" }}>
                                                <span style={{ color: "#10b981", flexShrink: 0 }}>›</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* ── Text content below the line ── */}
                        <div style={{ paddingTop: "20px" }}>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Jan 2026 — Present</p>
                            <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "22px", fontWeight: 500, color: "#fff", margin: "0 0 4px" }}>Research Assistant (Applied AI)</h3>
                            <p style={{ color: "#a1a1aa", fontSize: "15px", margin: "0 0 14px" }}>BIT Lab under Dokyun Lee</p>
                            <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0, maxWidth: "520px" }}>
                                Engineering scalable AI research infrastructure <br /> and large-scale data acquisition systems supporting <br /> model behavior analysis and applied ML experiments.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Counter ────────────────────────────────────────────── */}
            <section style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                        {[
                            { num: "01", label: "Companies Worked" },
                            { num: "04", label: "Projects" },
                            { num: "04", label: "Certifications" },
                            { num: "0-1", label: "Years Experience" },
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: "48px 30px",
                                textAlign: "center",
                                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            }}>
                                <div style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "56px", fontWeight: 600, color: "#fff", lineHeight: 1 }}>{item.num}</div>
                                <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px", letterSpacing: "0.04em" }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Skills ─────────────────────────────────────────────── */}
            <section style={{ paddingTop: "100px", paddingBottom: "60px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div>
                        <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Skillsets</h2>
                        <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "1px 75px 48px" }}>Expertise</p>

                        <div style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", overflow: "hidden" }}>

                            {[
                                {
                                    title: "Machine Learning & AI",
                                    techs: ["LangChain", "HuggingFace", "MLOps", "PyTorch"],
                                    bullets: ["Built and deployed end-to-end training and inference pipelines", "Optimized models for latency, memory, and production constraints", "Designed evaluation workflows with reproducible experimentation"],
                                },
                                {
                                    title: "Application Systems",
                                    techs: ["React / Next.js", "Node.js", "Python / FastAPI", "REST", "GraphQL"],
                                    bullets: ["Designed RESTful and GraphQL APIs with production-ready structure", "Built modular backend services with clear separation of concerns", "Implemented authentication, routing, and scalable API patterns"],
                                },
                                {
                                    title: "Data Infrastructure",
                                    techs: ["PostgreSQL", "Redis", "Schema Design", "Caching"],
                                    bullets: ["Designed relational and NoSQL schemas optimized for query performance", "Implemented indexing and caching strategies for low-latency access", "Ensured data consistency, transactions, and reliability under load"],
                                },
                                {
                                    title: "Infrastructure & DevOps",
                                    techs: ["Docker", "Kubernetes", "AWS", "CI/CD"],
                                    bullets: ["Containerized services and managed deployments across environments", "Automated build and deployment pipelines for consistent releases", "Orchestrated scalable services using container-based infrastructure"],
                                },
                                {
                                    title: "System Architecture",
                                    techs: ["Distributed Systems", "Scalability", "Fault Tolerance", "System Tradeoffs"],
                                    bullets: ["Applied distributed systems principles while structuring backend architectures", "Modeled scalable system designs considering load, failure, and bottlenecks", "Evaluated architectural tradeoffs across consistency, latency, and complexity"],
                                },
                            ].map(({ title, techs, bullets }) => (
                                <Accordion key={title} title={title}>
                                    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
                                        {/* Bullets — left column */}
                                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                                            {bullets.map((pt, i) => (
                                                <li key={i} style={{ display: "flex", gap: "10px", color: "#a1a1aa", fontSize: "14px", lineHeight: "1.6" }}>
                                                    <span style={{ color: "#10b981", flexShrink: 0 }}>›</span><span>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* Tags — right column, 2 per row */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", flexShrink: 0, width: "260px" }}>
                                            {techs.map(t => (
                                                <span key={t} style={{ fontSize: "12px", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "6px", padding: "6px 10px", backgroundColor: "#0d0d0d", whiteSpace: "nowrap", textAlign: "center" }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion>
                            ))}

                        </div>
                    </div>
                </div>
            </section>

            {/* ── Projects ───────────────────────────────────────────── */}
            <section id="project" style={{ paddingTop: "60px", paddingBottom: "77px", backgroundColor: "#080808" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
                        {/* Left */}
                        <div>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Projects</h2>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "10px 70px    48px" }}>Showcase</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                                {[
                                    { title: "AI Product Design", desc: "Production-grade AI system for intelligent product recommendations" },
                                    { title: "ML Pipeline", desc: "End-to-end machine learning pipeline with automated retraining" },
                                    { title: "System Architecture", desc: "Distributed system design for high-availability applications" },
                                ].map((proj, i) => (
                                    <a key={i} href="#" className="project-link">
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                                            <div>
                                                <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "22px", fontWeight: 500, margin: "0 0 6px", color: "#fff" }}>{proj.title}</h3>
                                                <p style={{ color: "#71717a", fontSize: "14px", margin: 0 }}>{proj.desc}</p>
                                            </div>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: "4px" }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div style={{ display: "flex", flexDirection: "column", paddingTop: "80px" }}>
                            {/* Achievements */}
                            <div style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", padding: "32px 40px", borderRadius: "8px" }}>
                                <div style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "22px", fontWeight: 600, color: "#fff", marginBottom: "24px" }}>Achievements</div>
                                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
                                    {[
                                        "Led my team to secure Second Runner-Up in Human Capital theme at the First Global AI Summit 2K26 Hackathon in Collaboration with TATA Advanced Systems Limited",
                                        "Won 3rd Prize in the Pitch Perfect event organized by Amity School of Engineering and Technology"
                                    ].map((pt, i) => (
                                        <li key={i} style={{ display: "flex", gap: "12px", color: "#a1a1aa", fontSize: "14px", lineHeight: "1.7" }}>
                                            <span style={{ color: "#10b981", flexShrink: 0, fontSize: "16px" }}>›</span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* DevOps — marginTop aligns it with System Architecture row */}
                            <a href="#" className="project-link" style={{ marginTop: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                                    <div>
                                        <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "22px", fontWeight: 500, margin: "0 0 6px", color: "#fff" }}>DevOps Automation</h3>
                                        <p style={{ color: "#71717a", fontSize: "14px", margin: 0 }}>CI/CD pipeline automation with intelligent rollback capabilities</p>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: "4px" }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Coding Profiles ─────────────────────────────────────── */}
            <section id="coding" style={{ paddingTop: "20px", paddingBottom: "60px", backgroundColor: "#080808" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>

                    {/* Header */}
                    <div style={{ marginBottom: "56px" }}>
                        <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Coding</h2>
                        <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>Profiles</p>
                    </div>

                    {/* Cards Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
                        {[
                            {
                                name: "LeetCode",
                                handle: "sushk2904",
                                href: "https://leetcode.com/u/sushk2904/",
                                stat: "Solving DSA problems consistently",
                                badge: "DSA",
                                color: "#f89f1b",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                                    </svg>
                                ),
                            },
                            {
                                name: "GitHub",
                                handle: "sushk2904",
                                href: "https://github.com/sushk2904",
                                stat: "Open source · AI & systems projects",
                                badge: "Code Den",
                                color: "#94a3b8",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                    </svg>
                                ),
                            },
                            {
                                name: "Codeforces",
                                handle: "sushk2904",
                                href: "https://codeforces.com/profile/sushk2904",
                                stat: "Competitive programming",
                                badge: "CP",
                                color: "#3b82f6",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                                        <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5A1.5 1.5 0 0 1 22.5 21h-3A1.5 1.5 0 0 1 18 19.5V12a1.5 1.5 0 0 1 1.5-1.5h3z" />
                                    </svg>
                                ),
                            },

                        ].map((platform) => (
                            <motion.a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "36px 40px",
                                    backgroundColor: "#111111",
                                    textDecoration: "none",
                                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                                    transition: "background 0.25s",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#161616")}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#111111")}
                            >
                                {/* Accent glow on left edge */}
                                <div style={{
                                    position: "absolute", left: 0, top: 0, bottom: 0,
                                    width: "3px",
                                    backgroundColor: platform.color,
                                    opacity: 0.7,
                                }} />

                                {/* Icon + text */}
                                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                    <div style={{ color: platform.color, flexShrink: 0 }}>
                                        {platform.icon}
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                                            <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "20px", fontWeight: 500, color: "#fff" }}>
                                                {platform.name}
                                            </span>
                                            <span style={{
                                                fontSize: "10px", color: platform.color,
                                                border: `1px solid ${platform.color}44`,
                                                padding: "2px 8px",
                                                letterSpacing: "0.08em",
                                            }}>
                                                {platform.badge}
                                            </span>
                                        </div>
                                        <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 4px" }}>
                                            @{platform.handle}
                                        </p>
                                        <p style={{ color: "#a1a1aa", fontSize: "13px", margin: 0 }}>
                                            {platform.stat}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact / Footer ───────────────────────────────────── */}
            <footer id="contact" style={{ paddingTop: "60px", paddingBottom: "40px", backgroundColor: "#080808" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 16px" }}>Get in touch</p>
                    <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 500, maxWidth: "700px", marginBottom: "80px", color: "#fff", lineHeight: "1.1" }}>
                        That's it! Now it's your turn to say hi.
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginBottom: "60px" }}>
                        {/* Social */}
                        <div>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: "0 0 4px" }}>Follow me on the net</p>
                            {[
                                { icon: "/resume/x1com.png", name: "X", desc: "Most controversial place", href: "https://x.com/sushantk2904", w: 48, h: 48 },
                                { icon: "/resume/iglogo.png", name: "Instagram", desc: "Most lovable place", href: "https://www.instagram.com/imakepeoplegosushhh/", w: 51, h: 48 },
                                { icon: "/resume/linkedin.jpeg", name: "LinkedIn", desc: "All working people visit this", href: "https://www.linkedin.com/in/sushantk2904/", w: 48, h: 48 },
                                { icon: "/resume/github.png", name: "GitHub", desc: "Techies head over to this", href: "https://github.com/sushk2904", w: 48, h: 48 },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-card">
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <Image src={s.icon} alt={s.name} width={s.w} height={s.h} style={{ borderRadius: "10px", objectFit: "cover" }} />
                                        <div>
                                            <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{s.name}</div>
                                            <div style={{ color: "#71717a", fontSize: "12px" }}>{s.desc}</div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Form — sends to WhatsApp */}
                        <form onSubmit={handleWhatsAppSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <input
                                type="text" name="name" required
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input-dark"
                            />
                            <input
                                type="email" name="email" required
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input-dark"
                            />
                            <input
                                type="tel" name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-input-dark"
                            />
                            <input
                                type="text" name="subject" required
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-input-dark"
                            />
                            <textarea
                                name="message" required
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={handleChange}
                                className="form-textarea-dark"
                                style={{ gridColumn: "1 / -1" }}
                            />
                            <button
                                type="submit"
                                className="resume-btn resume-btn-accent"
                                style={{
                                    gridColumn: "1 / -1",
                                    height: "52px",
                                    fontSize: "13px",
                                    letterSpacing: "0.06em",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    transition: "background 0.25s, color 0.25s",
                                    backgroundColor: sent ? "#25D366" : undefined,
                                    borderColor: sent ? "#25D366" : undefined,
                                    color: sent ? "#fff" : undefined,
                                }}
                            >
                                {sent ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.18 1.6 6L0 24l6.18-1.57A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52ZM12 22c-1.85 0-3.67-.5-5.25-1.45l-.38-.22-3.67.93.97-3.56-.25-.4A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.65 0 5.14 1.03 7.01 2.99A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.46-7.54c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.17 8.17 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
                                        Opening WhatsApp…
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                        Send via WhatsApp
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer bottom */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#71717a", fontSize: "13px", margin: 0 }}>© 2026 Sushant Kumar. All rights reserved.</p>
                        <div style={{ display: "flex", gap: "24px" }}>
                            <Link href="/" className="footer-link">← Back to Portfolio</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main >
    );
}
