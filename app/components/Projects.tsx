"use client";

import { motion } from "framer-motion";

const projects = [
    {
        title: "TINAI",
        impact: "Adaptive AI Execution & Reliability Platform \n \n It is a SLA-aware routing gateway for LLM providers, engineered to handle 1M+ requests per day with bursts of 100–500 RPS. It uses a Multi-Armed Bandit (MAB) algorithm to dynamically route requests across multiple providers based on real-time latency, cost, availability, and quality signals.",
        tech: ["Python", "FastAPI", "Docker", "Redis", "PostgreSQL", "HuggingFace"],
        link: "https://github.com/sushk2904/tinai"
    },
    {
        title: "Skill Genome",
        impact: "AI-powered Hiring and Skill Management Platform \n \n Skill Genome is an AI-powered recruitment platform that analyzes candidate readiness using the Corporate Readiness Index (CRI) - a comprehensive scoring system based on GitHub activity, problem-solving consistency on coding platforms, and alignment with organizational needs.",
        tech: ["Python", "TypeScript", "PostgreSQL", "Sentence Transformers", "Langraph", "Streamlit"],
        link: "https://github.com/sushk2904/sg-v2-final-main"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="relative py-32 bg-[#111111] px-6 md:px-12">
            {/* Gradient fade from hero black into this section */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-luxury-black to-transparent pointer-events-none z-10" />
            <div className="max-w-7xl mx-auto relative z-20">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-medium text-white mb-16 tracking-tight"
                >
                    Projects
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="group relative p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-luxury-accent/50 transition-colors duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer no-underline"
                        >
                            <div>
                                <h4 className="text-xl font-medium text-white mb-3 group-hover:text-luxury-accent transition-colors">{project.title}</h4>
                                <p className="text-luxury-gray text-sm leading-relaxed mb-6 whitespace-pre-line">
                                    {project.impact}
                                </p>
                            </div>

                            <div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.filter(t => t.trim() !== "").map(t => (
                                        <span key={t} className="text-[10px] font-mono uppercase px-2 py-1 bg-white/5 rounded text-zinc-500 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <button className="text-sm text-white font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                                    View Case Study
                                    <span>→</span>
                                </button>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
