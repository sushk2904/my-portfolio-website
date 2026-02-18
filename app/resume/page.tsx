"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Accordion component matching original Webflow behavior
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ border: "2px solid #000", marginTop: "-2px" }}>
            <div
                onClick={() => setOpen(!open)}
                style={{
                    borderBottom: "2px solid #000",
                    backgroundColor: "#03cd69",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "30px 10px 30px 20px",
                }}
            >
                <h2 style={{ margin: 0, fontSize: "26px", fontWeight: 500, lineHeight: "1.1em" }}>{title}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "20px" }}>
                    <div style={{ height: "2px", backgroundColor: "#000", transition: "transform 0.3s", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
                    <div style={{ height: "2px", backgroundColor: "#000", transition: "opacity 0.3s", opacity: open ? 0 : 1 }} />
                    <div style={{ height: "2px", backgroundColor: "#000", transition: "transform 0.3s", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
                </div>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{ padding: "30px 20px" }}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Experience card with hover overlay
function ExperienceCard({ company, year, role, period, description, posts }: {
    company: string; year: string; role: string; period: string; description: string; posts: string[];
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: "#f5f5f5",
                flexDirection: "column",
                padding: "50px",
                display: "flex",
                position: "relative",
                overflow: "hidden",
                minHeight: "280px",
            }}
        >
            <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "42px", fontWeight: 500, margin: "0 0 10px" }}>{company}</h3>
            <h4 style={{ textAlign: "right", marginBottom: 0, fontSize: "26px", fontWeight: 500 }}>{year}</h4>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "#03cd69",
                            padding: "50px",
                            zIndex: 1,
                        }}
                    >
                        <h5 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "32px", fontWeight: 500, margin: "0 0 10px" }}>{role}</h5>
                        <div style={{ fontSize: "14px", color: "#000", marginBottom: "20px" }}>{period}</div>
                        <p style={{ marginTop: "20px", marginBottom: "20px" }}>{description}</p>
                        {posts.map((post, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                                <Image src="/resume/arrow-right.svg" alt="" width={20} height={20} />
                                <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "18px", fontWeight: 500 }}>{post}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ResumePage() {
    const [activeSection, setActiveSection] = useState("");

    return (
        <main style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#fff", color: "#333", fontSize: "18px", lineHeight: "1.3em" }}>
            {/* Custom font */}
            <style>{`
                @font-face {
                    font-family: 'ClashGrotesk';
                    src: url('/resume/clashgrotesk-semibold.woff2') format('woff2');
                    font-weight: 600;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'ClashGrotesk';
                    src: url('/resume/clashgrotesk-medium.woff2') format('woff2');
                    font-weight: 500;
                    font-style: normal;
                }
                :root {
                    --spring-green: #03cd69;
                    --white-smoke: #f5f5f5;
                    --black: #000;
                    --white: #fff;
                }
                .nav-link-item {
                    color: #000;
                    border-bottom: 3px solid transparent;
                    margin: 0 20px;
                    padding: 0;
                    text-decoration: none;
                    transition: border 0.3s ease-in-out;
                    font-size: 18px;
                }
                .nav-link-item:hover {
                    border-bottom: 3px solid #03cd69;
                }
                .btn-primary {
                    border: 1px solid #000;
                    color: #000;
                    background-color: transparent;
                    padding: 12px 30px;
                    font-size: 18px;
                    text-decoration: none;
                    transition: all 0.3s ease-in-out;
                    cursor: pointer;
                    font-family: 'Poppins', sans-serif;
                }
                .btn-primary:hover {
                    border-color: #03cd69;
                    background-color: #03cd69;
                }
                .project-item-link {
                    text-decoration: none;
                    display: block;
                }
                .project-item-link:hover .project-image-inner {
                    transform: scale(1.05);
                }
                .project-image-inner {
                    transition: transform 0.5s ease;
                }
                .social-item {
                    background-color: #f5f5f5;
                    margin-top: 20px;
                    padding: 20px;
                    text-decoration: none;
                    display: block;
                    transition: background-color 0.3s;
                }
                .social-item:hover {
                    background-color: #03cd69;
                }
                .footer-link-item {
                    border-bottom: 3px solid transparent;
                    text-decoration: none;
                    color: #000;
                    transition: border-color 0.3s ease-in-out;
                }
                .footer-link-item:hover {
                    border-bottom-color: #03cd69;
                }
                .skill-list {
                    padding-left: 20px;
                    margin: 0;
                }
                .skill-list li {
                    margin-bottom: 10px;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .rotating-circle {
                    animation: spin-slow 10s linear infinite;
                }
            `}</style>

            {/* Navbar */}
            <nav style={{ backgroundColor: "transparent", paddingTop: "20px", paddingBottom: "20px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px", display: "grid", gridTemplateColumns: "0.25fr 1fr", alignItems: "center" }}>
                    <Link href="/">
                        <Image src="/resume/jacq.svg" alt="Logo" width={80} height={40} style={{ display: "block" }} />
                    </Link>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <nav style={{ paddingRight: "20px", display: "flex" }}>
                            <a href="#about" className="nav-link-item">About me</a>
                            <a href="#experience" className="nav-link-item">Experience</a>
                            <a href="#project" className="nav-link-item">Projects</a>
                            <a href="#contact" className="nav-link-item">Contact me</a>
                        </nav>
                        <a href="#contact" className="btn-primary">Hire me</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ paddingTop: "80px", paddingBottom: "20px", overflow: "hidden" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px", position: "relative" }}>
                    {/* Hero content */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", marginBottom: "300px" }}>
                        <h1 style={{
                            fontFamily: "'ClashGrotesk', sans-serif",
                            color: "#000",
                            textTransform: "uppercase",
                            fontSize: "clamp(80px, 10vw, 150px)",
                            fontWeight: 600,
                            margin: 0,
                            lineHeight: "1.1em",
                        }}>
                            Sushant<br />Kumar
                        </h1>
                        <p style={{ color: "#000", width: "35%", minWidth: "280px", margin: 0 }}>
                            AI Systems Engineer building production-grade intelligent systems.
                        </p>
                        <div style={{ display: "inline-block" }}>
                            <a href="#contact" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                                <Image src="/resume/arrow-right.svg" alt="Arrow" width={40} height={40} style={{ border: "3px solid #03cd69", backgroundColor: "#03cd69", borderRadius: "50%", padding: "8px" }} />
                                <div style={{ border: "2px solid #000", borderRadius: "50%", width: "38px", height: "38px", marginLeft: "-18px" }} />
                                <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "18px", fontWeight: 500 }}>Download CV</span>
                            </a>
                        </div>
                    </div>

                    {/* Hero contact info (right side) */}
                    <div style={{ position: "absolute", right: "30px", top: "80px", maxWidth: "300px" }}>
                        <div style={{ marginBottom: "20px" }}>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "42px", fontWeight: 500, margin: "0 0 10px" }}>Lets Work Together</h2>
                            <p style={{ fontSize: "14px", margin: "0 0 5px" }}>I am Available at</p>
                            <p style={{ margin: "0 0 5px" }}>your@email.com</p>
                            <p style={{ margin: 0 }}>+1 234 567 890</p>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div style={{ position: "absolute", right: "30px", bottom: "0", width: "380px" }}>
                        <div style={{ position: "relative" }}>
                            <Image src="/resume/hero-image.webp" alt="Hero" width={380} height={500} style={{ display: "block", width: "100%", height: "auto" }} />
                        </div>
                    </div>

                    {/* Rotating circle text */}
                    <div style={{ position: "absolute", right: "380px", bottom: "60px" }}>
                        <Image src="/resume/rounded-circle.png" alt="Rotating circle" width={120} height={120} className="rotating-circle" />
                    </div>

                    {/* Signature */}
                    <div style={{ position: "absolute", left: "30px", bottom: "0" }}>
                        <Image src="/resume/signature.png" alt="Signature" width={200} height={80} style={{ opacity: 0.8 }} />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    {/* About title paragraph with project reveals */}
                    <div style={{ borderTop: "2px solid #000", paddingTop: "20px", marginBottom: "0" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>
                            I'm Sushant <span style={{ display: "inline-block", width: "80px", height: "3px", backgroundColor: "#03cd69", verticalAlign: "middle", margin: "0 10px" }} /> a self-taught AI systems engineer based in India. I started as a software developer, but now I do a mix of everything from
                        </p>
                    </div>
                    <div style={{ borderTop: "2px solid #000", paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>ML Engineering</p>
                        <div style={{ overflow: "hidden", width: "200px", height: "120px", position: "relative" }}>
                            <Image src="/resume/01.webp" alt="ML Engineering" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                    <div style={{ borderTop: "2px solid #000", paddingTop: "20px", paddingBottom: "20px" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>,</p>
                    </div>
                    <div style={{ borderTop: "2px solid #000", paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>System Design</p>
                        <div style={{ overflow: "hidden", width: "200px", height: "120px", position: "relative" }}>
                            <Image src="/resume/02.webp" alt="System Design" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                    <div style={{ borderTop: "2px solid #000", paddingTop: "20px", paddingBottom: "20px" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>,</p>
                    </div>
                    <div style={{ borderTop: "2px solid #000", paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>Full-Stack Development</p>
                        <div style={{ overflow: "hidden", width: "200px", height: "120px", position: "relative" }}>
                            <Image src="/resume/03.jpg" alt="Full-Stack" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>
                    <div style={{ borderTop: "2px solid #000", borderBottom: "2px solid #000", paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontSize: "clamp(24px, 3vw, 42px)", fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, lineHeight: "1.1em", margin: 0 }}>& DevOps</p>
                        <div style={{ overflow: "hidden", width: "200px", height: "120px", position: "relative" }}>
                            <Image src="/resume/04.webp" alt="DevOps" fill style={{ objectFit: "cover" }} />
                        </div>
                    </div>

                    {/* Personal Info + Education grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "0.75fr 1.25fr", gap: "50px", marginTop: "100px" }}>
                        {/* Personal Info */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                                <Image src="/resume/pen.svg" alt="Pen" width={30} height={30} />
                                <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "42px", fontWeight: 500, margin: 0 }}>Personal Info</h3>
                            </div>
                            <p>Building scalable AI solutions at the intersection of machine learning and software engineering.</p>
                            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <Image src="/resume/pin-map-fill.svg" alt="Location" width={20} height={20} />
                                    <span>Your City, Your Country</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <Image src="/resume/mailbox2.svg" alt="Email" width={20} height={20} />
                                    <span>your@email.com</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <Image src="/resume/headset.svg" alt="Phone" width={20} height={20} />
                                    <span>+1 234 567 890</span>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                                <Image src="/resume/graduation-hat-svgrepo-com.svg" alt="Education" width={40} height={40} />
                                <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "42px", fontWeight: 500, margin: 0 }}>Education</h3>
                            </div>
                            <div>
                                {[
                                    { place: "Your University", date: "2020 - 2024", degree: "B.Tech in Computer Science (HONORS)", desc: "Specialized in AI/ML systems and distributed computing." },
                                    { place: "Your School", date: "2018 - 2020", degree: "Higher Secondary Education", desc: "Science stream with Mathematics and Computer Science." },
                                ].map((edu, i) => (
                                    <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 20px 1fr", gap: "20px", marginBottom: "30px", alignItems: "start" }}>
                                        <div>
                                            <p style={{ fontWeight: 600, margin: "0 0 5px" }}>{edu.place}</p>
                                            <div style={{ fontSize: "14px", color: "#666" }}>{edu.date}</div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                                            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#03cd69", border: "2px solid #000" }} />
                                            <div style={{ width: "2px", flex: 1, backgroundColor: "#ddd", marginTop: "4px" }} />
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: "'ClashGrotesk', sans-serif", fontWeight: 500, fontSize: "20px", margin: "0 0 8px" }}>{edu.degree}</p>
                                            <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>{edu.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "68px", fontWeight: 500, margin: 0 }}>In a previous life</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                        <ExperienceCard company="Company 1" year="Year 2023 - Present" role="Senior AI Engineer" period="January 2023 - Present" description="Building production-grade ML systems and intelligent automation pipelines." posts={["ML Ops", "System Design"]} />
                        <ExperienceCard company="Company 2" year="Year 2021 - 2023" role="Full-Stack Developer" period="June 2021 - December 2022" description="Developed scalable web applications and RESTful APIs serving millions of users." posts={["React Development", "Backend Engineering"]} />
                        <ExperienceCard company="Company 3" year="Year 2020 - 2021" role="Software Engineer" period="January 2020 - May 2021" description="Designed and implemented microservices architecture for enterprise applications." posts={["Python Development", "API Design"]} />
                        <ExperienceCard company="Company 4" year="Year 2019 - 2020" role="Software Intern" period="June 2019 - December 2019" description="Contributed to frontend development and learned industry best practices." posts={["JavaScript", "UI Development"]} />
                    </div>
                </div>
            </section>

            {/* Counter Section */}
            <section style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ border: "5px solid #03cd69", backgroundColor: "#000", padding: "30px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "50px" }}>
                            {[
                                { num: "04", label: "Companies Worked" },
                                { num: "09", label: "Freelancer Projects" },
                                { num: "03", label: "Total Degrees" },
                                { num: "05", label: "Years of Experience" },
                            ].map((item, i) => (
                                <div key={i} style={{ color: "#fff", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", color: "#fff", fontSize: "68px", fontWeight: 500, margin: "0 0 10px" }}>{item.num}</h2>
                                    <p style={{ margin: 0, color: "#fff" }}>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section style={{ paddingTop: "120px", paddingBottom: "0" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
                        {/* Skill image */}
                        <div style={{ textAlign: "center", position: "relative" }}>
                            <Image src="/resume/about-skill.webp" alt="Skills" width={500} height={600} style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }} />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", backgroundColor: "#f5f5f5", zIndex: 0 }} />
                        </div>

                        {/* Skill accordions */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                            <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "68px", fontWeight: 500, margin: "0 0 30px" }}>Skillsets</h2>
                            <Accordion title="Machine Learning & AI">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                                    <ul className="skill-list"><li>Deep Learning</li><li>NLP & LLMs</li><li>Computer Vision</li></ul>
                                    <ul className="skill-list"><li>MLOps & Deployment</li><li>Model Optimization</li><li>Data Pipelines</li></ul>
                                </div>
                                <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
                                    <Image src="/resume/adobe-photoshop-2.svg" alt="Tool" width={50} height={50} />
                                    <Image src="/resume/figma-1.svg" alt="Tool" width={50} height={50} />
                                </div>
                            </Accordion>
                            <Accordion title="Full-Stack Development">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                                    <ul className="skill-list"><li>React / Next.js</li><li>Node.js / Python</li></ul>
                                    <ul className="skill-list"><li>REST & GraphQL APIs</li><li>PostgreSQL / MongoDB</li></ul>
                                </div>
                                <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
                                    <Image src="/resume/sketch-2.svg" alt="Tool" width={50} height={50} />
                                    <Image src="/resume/invision.svg" alt="Tool" width={50} height={50} />
                                </div>
                            </Accordion>
                            <Accordion title="DevOps & Cloud">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                                    <ul className="skill-list"><li>Docker & Kubernetes</li></ul>
                                    <ul className="skill-list"><li>AWS / GCP</li></ul>
                                </div>
                            </Accordion>
                            <Accordion title="System Design">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                                    <ul className="skill-list"><li>Distributed Systems</li></ul>
                                    <ul className="skill-list"><li>Microservices</li></ul>
                                </div>
                            </Accordion>
                            <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr", gap: "30px", marginTop: "auto", paddingTop: "30px" }}>
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <Image src="/resume/webflow-icon.png" alt="Webflow" width={50} height={50} />
                                    <Image src="/resume/shopify.svg" alt="Shopify" width={50} height={50} />
                                </div>
                                <p>Currently building AI-powered web applications and intelligent automation systems.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="project" style={{ paddingTop: "120px", paddingBottom: "0" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
                        {/* Left column */}
                        <div>
                            <div style={{ marginBottom: "50px" }}>
                                <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "68px", fontWeight: 500, margin: "0 0 20px" }}>Showcase</h2>
                                <p>Selected projects demonstrating technical excellence and innovation in AI systems.</p>
                            </div>
                            <div style={{ display: "grid", gap: "100px" }}>
                                {[
                                    { img: "/resume/01.webp", title: "AI Product Design", desc: "A production-grade AI system for intelligent product recommendations" },
                                    { img: "/resume/02.webp", title: "ML Pipeline", desc: "End-to-end machine learning pipeline with automated retraining" },
                                ].map((proj, i) => (
                                    <a key={i} href="#" className="project-item-link">
                                        <div style={{ marginBottom: "20px", overflow: "hidden" }}>
                                            <div className="project-image-inner">
                                                <Image src={proj.img} alt={proj.title} width={600} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr", gap: "16px", justifyContent: "space-between" }}>
                                            <div>
                                                <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "32px", fontWeight: 500, margin: "0 0 8px" }}>{proj.title}</h3>
                                                <p style={{ margin: 0, fontSize: "16px" }}>{proj.desc}</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                                <Image src="/resume/arrow-right.svg" alt="Arrow" width={40} height={40} style={{ border: "3px solid #03cd69", backgroundColor: "#03cd69", borderRadius: "50%", padding: "8px" }} />
                                                <div style={{ border: "2px solid #000", borderRadius: "50%", width: "38px", height: "38px", marginLeft: "-18px" }} />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div style={{ marginTop: "50px" }}>
                                <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                                    <Image src="/resume/arrow-right.svg" alt="Arrow" width={40} height={40} style={{ border: "3px solid #03cd69", backgroundColor: "#03cd69", borderRadius: "50%", padding: "8px" }} />
                                    <div style={{ border: "2px solid #000", borderRadius: "50%", width: "38px", height: "38px", marginLeft: "-18px" }} />
                                    <span style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "18px", fontWeight: 500 }}>View All Work</span>
                                </a>
                            </div>
                        </div>

                        {/* Right column */}
                        <div>
                            <div style={{ display: "grid", gap: "100px" }}>
                                {[
                                    { img: "/resume/03.jpg", title: "System Architecture", desc: "Distributed system design for high-availability applications" },
                                ].map((proj, i) => (
                                    <a key={i} href="#" className="project-item-link">
                                        <div style={{ marginBottom: "20px", overflow: "hidden" }}>
                                            <div className="project-image-inner">
                                                <Image src={proj.img} alt={proj.title} width={600} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr", gap: "16px" }}>
                                            <div>
                                                <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "32px", fontWeight: 500, margin: "0 0 8px" }}>{proj.title}</h3>
                                                <p style={{ margin: 0, fontSize: "16px" }}>{proj.desc}</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                                <Image src="/resume/arrow-right.svg" alt="Arrow" width={40} height={40} style={{ border: "3px solid #03cd69", backgroundColor: "#03cd69", borderRadius: "50%", padding: "8px" }} />
                                                <div style={{ border: "2px solid #000", borderRadius: "50%", width: "38px", height: "38px", marginLeft: "-18px" }} />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Testimonial */}
                            <div style={{ marginTop: "100px", marginBottom: "100px" }}>
                                <div style={{ backgroundColor: "#f5f5f5", padding: "50px", position: "relative" }}>
                                    <Image src="/resume/quote.svg" alt="Quote" width={50} height={50} style={{ position: "absolute", top: "0", right: "0", margin: "30px" }} />
                                    <p>"Sushant delivered an exceptional AI system that transformed our data pipeline. His technical depth and attention to detail are unmatched."</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "30px" }}>
                                        <Image src="/resume/01-1.webp" alt="Author" width={50} height={50} style={{ borderRadius: "50%" }} />
                                        <div>
                                            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", color: "#000" }}>Dennis Barrett</div>
                                            <div style={{ fontSize: "14px" }}>Founder of TechCo</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4th project */}
                            <a href="#" className="project-item-link">
                                <div style={{ marginBottom: "20px", overflow: "hidden" }}>
                                    <div className="project-image-inner">
                                        <Image src="/resume/04.webp" alt="Project 4" width={600} height={400} style={{ width: "100%", height: "auto", display: "block" }} />
                                    </div>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr", gap: "16px" }}>
                                    <div>
                                        <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "32px", fontWeight: 500, margin: "0 0 8px" }}>DevOps Automation</h3>
                                        <p style={{ margin: 0, fontSize: "16px" }}>CI/CD pipeline automation with intelligent rollback capabilities</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                                        <Image src="/resume/arrow-right.svg" alt="Arrow" width={40} height={40} style={{ border: "3px solid #03cd69", backgroundColor: "#03cd69", borderRadius: "50%", padding: "8px" }} />
                                        <div style={{ border: "2px solid #000", borderRadius: "50%", width: "38px", height: "38px", marginLeft: "-18px" }} />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Contact */}
            <footer id="contact" style={{ paddingTop: "100px", paddingBottom: "10px" }}>
                <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 30px" }}>
                    <h2 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "68px", fontWeight: 500, width: "60%", marginBottom: "80px", lineHeight: "1.1em" }}>
                        That's it! Now it's your turn to say hi.
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", marginBottom: "50px" }}>
                        {/* Social links */}
                        <div>
                            <h3 style={{ fontFamily: "'ClashGrotesk', sans-serif", fontSize: "32px", fontWeight: 500, margin: "0 0 0" }}>Follow me on the net</h3>
                            {[
                                { icon: "/resume/twitter.svg", name: "Twitter", desc: "Most controversial Place", href: "https://twitter.com/" },
                                { icon: "/resume/instagram.svg", name: "Instagram", desc: "Most Lovable Place", href: "https://instagram.com/" },
                                { icon: "/resume/dribble.svg", name: "Dribbble", desc: "All Designers visit this regularly", href: "https://dribbble.com/" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noreferrer" className="social-item">
                                    <div style={{ display: "grid", gridTemplateColumns: "0.25fr 1.75fr", gap: "30px", alignItems: "center" }}>
                                        <Image src={social.icon} alt={social.name} width={60} height={60} />
                                        <div>
                                            <p style={{ color: "#000", margin: "0 0 5px", fontWeight: 500 }}>{social.name}</p>
                                            <div style={{ fontSize: "14px" }}>{social.desc}</div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Contact form */}
                        <div>
                            <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px 30px" }}>
                                <input type="text" placeholder="Name" style={{ border: "2px solid #f5f5f5", backgroundColor: "#f5f5f5", height: "56px", padding: "10px 20px", fontSize: "14px", outline: "none", fontFamily: "'Poppins', sans-serif" }} />
                                <input type="email" placeholder="Email" required style={{ border: "2px solid #f5f5f5", backgroundColor: "#f5f5f5", height: "56px", padding: "10px 20px", fontSize: "14px", outline: "none", fontFamily: "'Poppins', sans-serif" }} />
                                <input type="tel" placeholder="Phone" style={{ border: "2px solid #f5f5f5", backgroundColor: "#f5f5f5", height: "56px", padding: "10px 20px", fontSize: "14px", outline: "none", fontFamily: "'Poppins', sans-serif" }} />
                                <input type="text" placeholder="Subject" required style={{ border: "2px solid #f5f5f5", backgroundColor: "#f5f5f5", height: "56px", padding: "10px 20px", fontSize: "14px", outline: "none", fontFamily: "'Poppins', sans-serif" }} />
                                <textarea placeholder="Your Message...." style={{ gridColumn: "1 / -1", border: "2px solid #f5f5f5", backgroundColor: "#f5f5f5", height: "150px", padding: "10px 20px", fontSize: "14px", outline: "none", resize: "none", fontFamily: "'Poppins', sans-serif" }} />
                                <button type="submit" className="btn-primary" style={{ gridColumn: "1 / -1" }}>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/* Footer bottom */}
                    <div style={{ display: "grid", gridTemplateColumns: "0.75fr 1fr", gap: "30px", border: "2px solid #000", padding: "20px 30px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
                            <a href="#" className="footer-link-item">Projects</a>
                            <a href="#" className="footer-link-item">GitHub</a>
                            <a href="#" className="footer-link-item">LinkedIn</a>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
                            <a href="#" className="footer-link-item">About</a>
                            <a href="#" className="footer-link-item">Contact</a>
                            <div style={{ color: "#000", fontSize: "16px", marginTop: "15px", width: "100%" }}>© 2026 Sushant Kumar</div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
