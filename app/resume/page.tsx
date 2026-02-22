"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "-1px" }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px 0",
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
                        <div style={{ paddingBottom: "28px", color: "#a1a1aa" }}>{children}</div>
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
    return (
        <main style={{
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#0a0a0a",
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
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                    transition: color 0.2s;
                    padding: 4px 0;
                    border-bottom: 1px solid transparent;
                }
                .resume-nav-link:hover {
                    color: #fff;
                    border-bottom-color: #94a3b8;
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
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>SK</span>
                    </Link>
                    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                        <a href="#about" className="resume-nav-link">About</a>
                        <a href="#experience" className="resume-nav-link">Experience</a>
                        <a href="#project" className="resume-nav-link">Projects</a>
                        <a href="#contact" className="resume-nav-link">Contact</a>
                    </div>
                    <a href="#contact" className="resume-btn resume-btn-accent" style={{ fontSize: "12px", padding: "8px 20px" }}>Hire me</a>
                </div>
            </nav>

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section style={{ paddingTop: "120px", paddingBottom: "40px", overflow: "hidden" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px", position: "relative" }}>
                    {/* Big name */}
                    <div style={{ marginBottom: "280px" }}>
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
                            Building scalable AI systems from <br /> research to production.
                        </motion.p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                            <a href="/resume.pdf" className="resume-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                Download CV
                            </a>
                        </motion.div>
                    </div>

                    {/* Right side contact card */}
                    <div style={{ position: "absolute", right: "30px", top: "120px", maxWidth: "280px" }}>
                        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "24px" }}>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px" }}>Available for work</p>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "28px", fontWeight: 500, margin: "0 0 16px", color: "#fff", lineHeight: "1.2" }}>Let's Work Together</h2>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: "0 0 4px" }}>your@email.com</p>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>+1 234 567 890</p>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div style={{ position: "absolute", right: "350px", bottom: "0", width: "390px" }}>
                        <Image src="/resume/new_hero_image_v2.png" alt="Sushant Kumar" width={340} height={440} style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(20%)" }} />
                    </div>

                    {/* Rotating circle */}
                    <div style={{ position: "absolute", right: "-15px", top: "-10px", width: "100px", height: "100px" }} className="rotating-circle">
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
                    </div>

                    {/* Signature */}
                    <div style={{ position: "absolute", left: "225px", bottom: "20px" }}>
                        <Image src="/resume/singature-removebg-preview.png" alt="Signature" width={100} height={90} style={{ opacity: 0.9, filter: "invert(1)" }} />
                    </div>
                </div>
            </section>

            {/* ── Divider ────────────────────────────────────────────── */}
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* ── About ──────────────────────────────────────────────── */}
            <section id="about" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    {/* Skill rows */}
                    {[
                        { label: "ML Engineering", img: "/resume/01.webp" },
                        { label: "System Design", img: "/resume/02.webp" },
                        { label: "Full-Stack Development", img: "/resume/03.jpg" },
                        { label: "& DevOps", img: "/resume/04.webp" },
                    ].map((item, i) => (
                        <div key={i} style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "20px 0",
                        }}>
                            <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 500, color: "#fff" }}>{item.label}</span>
                            <div style={{ overflow: "hidden", width: "160px", height: "90px", position: "relative", flexShrink: 0 }}>
                                <Image src={item.img} alt={item.label} fill style={{ objectFit: "cover", filter: "grayscale(30%)" }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

                    {/* Personal info + Education */}
                    <div style={{ display: "grid", gridTemplateColumns: "0.75fr 1.25fr", gap: "60px", marginTop: "80px" }}>
                        {/* Personal Info */}
                        <div>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 16px" }}>Personal Info</p>
                            <p style={{ color: "#a1a1aa", lineHeight: "1.7", margin: "0 0 28px" }}>
                                Building scalable AI solutions at the intersection of machine learning and software engineering.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {[
                                    { icon: "📍", text: "Your City, Your Country" },
                                    { icon: "✉️", text: "your@email.com" },
                                    { icon: "📞", text: "+1 234 567 890" },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#a1a1aa", fontSize: "14px" }}>
                                        <span>{item.icon}</span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 24px" }}>Education</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                                {[
                                    { place: "Your University", date: "2020 – 2024", degree: "B.Tech in Computer Science", desc: "Specialized in AI/ML systems and distributed computing." },
                                    { place: "Your School", date: "2018 – 2020", degree: "Higher Secondary Education", desc: "Science stream with Mathematics and Computer Science." },
                                ].map((edu, i) => (
                                    <div key={i} style={{ display: "flex", gap: "20px" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#94a3b8", flexShrink: 0 }} />
                                            {i === 0 && <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(255,255,255,0.1)", marginTop: "8px" }} />}
                                        </div>
                                        <div>
                                            <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 4px" }}>{edu.date}</p>
                                            <p style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "18px", fontWeight: 500, color: "#fff", margin: "0 0 4px" }}>{edu.degree}</p>
                                            <p style={{ color: "#a1a1aa", fontSize: "13px", margin: "0 0 4px" }}>{edu.place}</p>
                                            <p style={{ color: "#71717a", fontSize: "13px", margin: 0 }}>{edu.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Experience ─────────────────────────────────────────── */}
            <section id="experience" style={{ paddingTop: "100px", paddingBottom: "100px", backgroundColor: "#080808" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 16px" }}>Career</p>
                    <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 500, margin: "0 0 60px", color: "#fff", lineHeight: "1.1" }}>In a previous life</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                        <ExperienceCard company="Company 1" year="2023 – Present" role="Senior AI Engineer" period="January 2023 – Present" description="Building production-grade ML systems and intelligent automation pipelines." posts={["ML Ops", "System Design", "Python"]} />
                        <ExperienceCard company="Company 2" year="2021 – 2023" role="Full-Stack Developer" period="June 2021 – December 2022" description="Developed scalable web applications and RESTful APIs serving millions of users." posts={["React", "Node.js", "PostgreSQL"]} />
                        <ExperienceCard company="Company 3" year="2020 – 2021" role="Software Engineer" period="January 2020 – May 2021" description="Designed and implemented microservices architecture for enterprise applications." posts={["Python", "Django", "Docker"]} />
                        <ExperienceCard company="Company 4" year="2019 – 2020" role="Software Intern" period="June 2019 – December 2019" description="Contributed to frontend development and learned industry best practices." posts={["JavaScript", "APIs", "React"]} />
                    </div>
                </div>
            </section>

            {/* ── Counter ────────────────────────────────────────────── */}
            <section style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                        {[
                            { num: "04", label: "Companies Worked" },
                            { num: "09", label: "Freelance Projects" },
                            { num: "03", label: "Certifications" },
                            { num: "05", label: "Years Experience" },
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
            <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
                        {/* Image */}
                        <div style={{ position: "relative" }}>
                            <Image src="/resume/about-skill.webp" alt="Skills" width={560} height={680} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(20%)" }} />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, #0a0a0a, transparent)", zIndex: 1 }} />
                        </div>

                        {/* Accordions */}
                        <div>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 16px" }}>Expertise</p>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, margin: "0 0 40px", color: "#fff", lineHeight: "1.1" }}>Skillsets</h2>
                            <Accordion title="Machine Learning & AI">
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {["Deep Learning", "NLP & LLMs", "Computer Vision", "MLOps", "Model Optimization", "Data Pipelines"].map(s => <span key={s} className="skill-tag">{s}</span>)}
                                </div>
                            </Accordion>
                            <Accordion title="Full-Stack Development">
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {["React / Next.js", "Node.js", "Python / FastAPI", "REST & GraphQL", "PostgreSQL", "MongoDB"].map(s => <span key={s} className="skill-tag">{s}</span>)}
                                </div>
                            </Accordion>
                            <Accordion title="DevOps & Cloud">
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Terraform"].map(s => <span key={s} className="skill-tag">{s}</span>)}
                                </div>
                            </Accordion>
                            <Accordion title="System Design">
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {["Distributed Systems", "Microservices", "Event-Driven Architecture", "API Design", "Caching Strategies"].map(s => <span key={s} className="skill-tag">{s}</span>)}
                                </div>
                            </Accordion>
                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Projects ───────────────────────────────────────────── */}
            <section id="project" style={{ paddingTop: "100px", paddingBottom: "100px", backgroundColor: "#080808" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
                        {/* Left */}
                        <div>
                            <p style={{ color: "#94a3b8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 16px" }}>Selected Work</p>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, margin: "0 0 48px", color: "#fff", lineHeight: "1.1" }}>Showcase</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
                                {[
                                    { img: "/resume/01.webp", title: "AI Product Design", desc: "Production-grade AI system for intelligent product recommendations" },
                                    { img: "/resume/02.webp", title: "ML Pipeline", desc: "End-to-end machine learning pipeline with automated retraining" },
                                ].map((proj, i) => (
                                    <a key={i} href="#" className="project-link">
                                        <div className="project-img-wrap">
                                            <div className="project-img-inner">
                                                <Image src={proj.img} alt={proj.title} width={600} height={380} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(10%)" }} />
                                            </div>
                                        </div>
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
                        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
                            <a href="#" className="project-link">
                                <div className="project-img-wrap">
                                    <div className="project-img-inner">
                                        <Image src="/resume/03.jpg" alt="System Architecture" width={600} height={380} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(10%)" }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                                    <div>
                                        <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "22px", fontWeight: 500, margin: "0 0 6px", color: "#fff" }}>System Architecture</h3>
                                        <p style={{ color: "#71717a", fontSize: "14px", margin: 0 }}>Distributed system design for high-availability applications</p>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: "4px" }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                </div>
                            </a>

                            {/* Testimonial */}
                            <div style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.06)", padding: "40px", position: "relative" }}>
                                <div style={{ color: "#94a3b8", fontSize: "40px", lineHeight: 1, marginBottom: "16px", fontFamily: "Georgia, serif" }}>"</div>
                                <p style={{ color: "#a1a1aa", lineHeight: "1.7", margin: "0 0 24px", fontSize: "15px" }}>
                                    "Sushant delivered an exceptional AI system that transformed our data pipeline. His technical depth and attention to detail are unmatched."
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <Image src="/resume/01-1.webp" alt="Author" width={40} height={40} style={{ borderRadius: "50%", filter: "grayscale(20%)" }} />
                                    <div>
                                        <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>Dennis Barrett</div>
                                        <div style={{ color: "#71717a", fontSize: "12px" }}>Founder, TechCo</div>
                                    </div>
                                </div>
                            </div>

                            <a href="#" className="project-link">
                                <div className="project-img-wrap">
                                    <div className="project-img-inner">
                                        <Image src="/resume/04.webp" alt="DevOps Automation" width={600} height={380} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(10%)" }} />
                                    </div>
                                </div>
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

            {/* ── Contact / Footer ───────────────────────────────────── */}
            <footer id="contact" style={{ paddingTop: "100px", paddingBottom: "40px", backgroundColor: "#0a0a0a" }}>
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
                                { icon: "/resume/twitter.svg", name: "Twitter", desc: "Most controversial place", href: "https://twitter.com/" },
                                { icon: "/resume/instagram.svg", name: "Instagram", desc: "Most lovable place", href: "https://instagram.com/" },
                                { icon: "/resume/dribble.svg", name: "Dribbble", desc: "All designers visit this", href: "https://dribbble.com/" },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-card">
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <Image src={s.icon} alt={s.name} width={36} height={36} style={{ filter: "invert(1) opacity(0.7)" }} />
                                        <div>
                                            <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{s.name}</div>
                                            <div style={{ color: "#71717a", fontSize: "12px" }}>{s.desc}</div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Form */}
                        <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <input type="text" placeholder="Name" className="form-input-dark" />
                            <input type="email" placeholder="Email" required className="form-input-dark" />
                            <input type="tel" placeholder="Phone" className="form-input-dark" />
                            <input type="text" placeholder="Subject" required className="form-input-dark" />
                            <textarea placeholder="Your message..." className="form-textarea-dark" style={{ gridColumn: "1 / -1" }} />
                            <button type="submit" className="resume-btn resume-btn-accent" style={{ gridColumn: "1 / -1", height: "52px", fontSize: "13px", letterSpacing: "0.06em" }}>
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Footer bottom */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#71717a", fontSize: "13px", margin: 0 }}>© 2026 Sushant Kumar. All rights reserved.</p>
                        <div style={{ display: "flex", gap: "24px" }}>
                            <a href="#" className="footer-link">GitHub</a>
                            <a href="#" className="footer-link">LinkedIn</a>
                            <Link href="/" className="footer-link">← Back to Portfolio</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
