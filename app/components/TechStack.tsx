"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "Python", icon: "🐍" },
    { name: "NumPy", icon: "📊" },
    { name: "Pandas", icon: "🐼" },
    { name: "PyTorch", icon: "🔥" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Redis", icon: "⚡" },
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "☸️" },
    { name: "AWS", icon: "☁️" },
    { name: "Linux", icon: "🐧" },
    { name: "Git", icon: "🐙" },
    { name: "React", icon: "⚛️" },
    { name: "LangChain", icon: "🦜" },
];

export default function TechStack() {
    return (
        <section className="py-32 bg-luxury-black px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-medium text-white mb-16 tracking-tight"
                >
                    Technology Stack
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-luxury-accent/30 hover:bg-white/10 transition-all duration-300"
                        >
                            <span className="text-2xl mb-3 grayscale group-hover:grayscale-0 transition-all">{skill.icon}</span>
                            <span className="text-sm text-luxury-gray group-hover:text-white font-mono tracking-wide">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
