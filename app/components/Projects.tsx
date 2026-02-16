"use client";

import { motion } from "framer-motion";

const projects = [
    {
        title: "Distributed Inference Engine",
        impact: "Reduced latency by 40% for large language models.",
        tech: ["Python", "Ray", "Docker", "AWS"],
        link: "#"
    },
    {
        title: "Autonomous Agent Framework",
        impact: "Orchestrated multi-agent workflows for code generation.",
        tech: ["LangChain", "OpenAI API", "Redis", "FastAPI"],
        link: "#"
    },
    {
        title: "Real-time Vision Pipeline",
        impact: "Processed 30+ FPS video streams for anomaly detection.",
        tech: ["PyTorch", "OpenCV", "Kafka", "PostgreSQL"],
        link: "#"
    }
];

export default function Projects() {
    return (
        <section id="experience" className="py-32 bg-[#191919] px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-medium text-white mb-16 tracking-tight"
                >
                    Selected Work
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-luxury-accent/50 transition-colors duration-300 flex flex-col justify-between h-80"
                        >
                            <div>
                                <h4 className="text-xl font-medium text-white mb-3 group-hover:text-luxury-accent transition-colors">{project.title}</h4>
                                <p className="text-luxury-gray text-sm leading-relaxed mb-6">
                                    {project.impact}
                                </p>
                            </div>

                            <div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map(t => (
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
