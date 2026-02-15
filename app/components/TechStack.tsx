"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// SVG Icon Components (monochrome, 40x40 for premium presence)
const PythonIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M15.9 2.6c-7.4 0-6.9 3.2-6.9 3.2l0 3.3h7v1H7.7C5.4 10.1 2 11.4 2 16s3.1 4.8 3.1 4.8h1.9v-2.6c0-1.8 1.5-3.3 3.3-3.3h6.9c1.7 0 3.1-1.4 3.1-3.1V5.7c0-1.7-1.5-3.1-3.4-3.1zm-3.7 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z" />
        <path d="M16.1 29.4c7.4 0 6.9-3.2 6.9-3.2l0-3.3h-7v-1h8.3c2.3 0 3.7-1.3 3.7-5.9s-3.1-4.8-3.1-4.8h-1.9v2.6c0 1.8-1.5 3.3-3.3 3.3H13c-1.7 0-3.1 1.4-3.1 3.1v6.1c0 1.7 1.5 3.1 3.4 3.1zm3.7-1.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" />
    </svg>
);

const NumpyIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M10.5 23.5l-1.1-2.1-.2-.2-1.9.2-1.3 2.2h-1l3.4-5.7h.9l3.3 5.7h-1.1zm-2.2-3.2l-1.1 2 1.5-.1 1-1.9h-1.4zM22.2 19.2c-.6-.4-1.3-.6-2-.6s-1.4.2-2 .7c-.6.4-.9 1-1 1.8h5c-.1-.8-.4-1.4-1-1.9zM28 16.2c-1-.8-2.3-1.2-3.7-1.2-1.6 0-3 .5-4 1.5-1 1-1.5 2.3-1.5 3.8 0 1.6.5 2.8 1.5 3.8s2.3 1.5 3.9 1.5c2.3 0 4-1 5.1-3h-1.3c-.8 1.3-2 1.9-3.7 1.9-1.1 0-2-.3-2.8-1-.7-.6-1.1-1.5-1.2-2.5h9c0-.2 0-.4 0-.6 0-1.5-.4-2.8-1.3-3.7h-.3v-.5z" />
    </svg>
);

const PandasIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <rect x="11" y="4" width="3" height="6" /><rect x="11" y="13" width="3" height="10" /><rect x="11" y="26" width="3" height="2" /><rect x="18" y="10" width="3" height="5" /><rect x="18" y="18" width="3" height="10" />
    </svg>
);

const PyTorchIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M16 6c-.4 0-.7 0-1 0v2c3.3.1 6 2.7 6 6s-2.7 5.9-6 6v2c4.4-.1 8-3.6 8-8s-3.6-7.9-8-8zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /><path d="M11 14c0-2.8 2.2-5 5-5V7c-3.9 0-7 3.1-7 7s3.1 7 7 7v-2c-2.8 0-5-2.2-5-5z" /><circle cx="16" cy="3" r="1.8" />
    </svg>
);

const PostgreSQLIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M7 6.5c0-.4.3-.5.5-.5s.5.1.5.5v1.8h.8c.4 0 .5.3.5.5s-.1.5-.5.5h-.8v4c0 1.3.5 1.7 1.2 1.7.2 0 .3 0 .5-.1.3 0 .5.2.5.5s-.2.5-.5.5c-.3.1-.6.1-.8.1-1.3 0-2.4-.7-2.4-2.7v-4h-.5c-.4 0-.5-.3-.5-.5s.1-.5.5-.5h.5V6.5zm7.5-2c.6 0 1 .5 1 1.1v7.7c0 1.6-.5 2.8-1.4 3.5-.9.7-2.2 1.1-3.9 1.1-1.5 0-2.7-.2-3.5-.5-.3-.1-.5-.4-.4-.7.1-.3.4-.5.7-.4.8.3 1.9.5 3.2.5 1.4 0 2.4-.3 3.1-.9.6-.5.9-1.4.9-2.6v-.8c-.7.7-1.7 1-2.9 1-1.1 0-2.1-.4-2.9-1.1-.7-.7-1.1-1.7-1.1-2.9s.4-2.1 1.1-2.9c.8-.7 1.7-1.1 2.9-1.1.6 0 1.2.1 1.7.4.5.2.9.6 1.2 1v-.2c0-.6.4-1.1 1-1.1s1 .5 1 1.1v.1h.3zm-3.7 2.9c-.5-.6-1.2-.9-2-.9s-1.5.3-2 .9c-.5.5-.8 1.2-.8 2.1s.3 1.5.8 2.1c.5.5 1.2.9 2 .9s1.5-.3 2-.9c.5-.5.8-1.2.8-2.1s-.3-1.5-.8-2.1zm13.2-.9c0-.6-.4-1.1-1-1.1s-1 .5-1 1.1v.2c-.3-.4-.7-.8-1.2-1-.5-.3-1.1-.4-1.7-.4-1.1 0-2.1.4-2.9 1.1-.7.8-1.1 1.7-1.1 2.9s.4 2.1 1.1 2.9c.8.7 1.7 1.1 2.9 1.1 1.2 0 2.2-.3 2.9-1v.8c0 1.2-.3 2.1-.9 2.6-.7.6-1.7.9-3.1.9-1.3 0-2.4-.2-3.2-.5-.3-.1-.6.1-.7.4-.1.3.1.6.4.7.8.3 2 .5 3.5.5 1.7 0 3-.4 3.9-1.1.9-.7 1.4-1.9 1.4-3.5V5.5h-.3zm-7.5 4.1c.5-.5 1.2-.9 2-.9s1.5.3 2 .9c.5.5.8 1.2.8 2.1s-.3 1.5-.8 2.1c-.5.5-1.2.9-2 .9s-1.5-.3-2-.9c-.5-.5-.8-1.2-.8-2.1s.3-1.5.8-2.1z" />
    </svg>
);

const RedisIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M30 17.3c-1.3.7-8.1 3.4-9.7 4.2-1.6.8-2.5.8-3.7.3-1.2-.5-8.5-3.5-9.7-4.2-1.2-.7-1.2-1.1 0-1.8 1.2-.7 8.5-3.6 9.7-4.2 1.2-.6 2.5-.6 3.7 0 1.2.6 8.5 3.5 9.7 4.2 1.2.7 1.2 1.2 0 1.8v.7zm0-5.3c-1.3.7-8.1 3.4-9.7 4.2-1.6.8-2.5.8-3.7.3-1.2-.5-8.5-3.5-9.7-4.2-1.2-.7-1.2-1.1 0-1.8 1.2-.7 8.5-3.6 9.7-4.2 1.2-.6 2.5-.6 3.7 0 1.2.6 8.5 3.5 9.7 4.2 1.2.7 1.2 1.2 0 1.8v.7z" />
    </svg>
);

const DockerIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M16.5 14h-2v2h2v-2zm3 0h-2v2h2v-2zm0-3h-2v2h2v-2zm-3 0h-2v2h2v-2zm-3 3h-2v2h2v-2zm0-3h-2v2h2v-2zm-3 0h-2v2h2v-2zm0-3h-2v2h2v-2zm3 0h-2v2h2v-2zm11.5 6.3c-.7-.5-2.3-.5-3.5-.1-.2-1.4-1-2.6-2.2-3.5l-.5-.3-.3.5c-.6 1-.8 2.7-.2 4 .2.4.6.9 1.1 1.2-.6.3-1.7.5-2.2.5H1.1l-.1.5c-.4 2 .2 4.6 1.9 6.5 1.5 1.6 3.7 2.4 6.5 2.4 6.2 0 10.8-2.9 12.9-8 1.2 0 3.8 0 5.2-2.5l.2-.4-.2-.3c-.6-.5-1.8-1-3.5-1zm-16.5-2h-2v2h2v-2z" />
    </svg>
);

const KubernetesIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M16 4l-1.1 11.5-.5.1-8.5-7.4-1.4 1.4 7.4 8.5-.1.5L0 19.7v2l11.5-1.1.5.5L4.6 29.6l1.4 1.4 8.5-7.4.5.1L16 35h2l-1.1-11.5.5-.1 8.5 7.4 1.4-1.4-7.4-8.5.1-.5L31.5 21v-2l-11.5 1.1-.5-.5 7.4-8.5-1.4-1.4-8.5 7.4-.5-.1L18 5h-2z" />
    </svg>
);

const AWSIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M6.8 14.2c0 .4.1.7.1 1 .1.3.2.6.3.8l2.1 5c.1.2.2.4.4.6.2.1.4.2.6.2h.1l.1-.1.1-.1 4.2-8.7.1-.2v-.2c0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.2h-1.4c-.2 0-.4.1-.5.2-.1.1-.2.2-.3.4l-2.5 5.2h-.1L7.3 13c-.1-.2-.2-.3-.3-.4-.1-.1-.3-.2-.5-.2H5.1c-.1 0-.2.1-.2.2-.1.1-.1.2-.1.3v.3zM19.8 19.2c-.3-.5-.5-1-.6-1.5l-.2-1.2c-.1-.6-.2-1.2-.2-1.8v-.8l.1-.7c0-.3.1-.5.2-.7.1-.2.2-.4.4-.6.2-.1.5-.2.8-.2.3 0 .5.1.7.2.2.2.3.4.4.6.1.2.2.5.2.7.1.2.1.5.1.7v.8l-.1 1.8v1.2c-.1.5-.3 1-.6 1.5-.2.4-.5.8-.8 1.1-.3.3-.7.5-1.1.7-.4.1-.9.2-1.4.2s-1-.1-1.4-.2c-.4-.1-.8-.4-1.1-.7-.3-.3-.6-.7-.8-1.1zm-.1-1.5l.2 1.2.3.7.5.4c.2.1.4.1.6.1s.4 0 .6-.1c.2-.1.3-.2.5-.4l.3-.7.2-1.2v-.8l-.1-1.8v-.7l-.1-.5-.2-.4c-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.5-.1s-.3 0-.5.1c-.1.1-.2.1-.3.2-.1.1-.1.2-.2.4 0 .2-.1.3-.1.5v.7l-.1 1.8v.8h.2zm9.4-4.5c.1 0 .2.1.2.2v9.1c0 .1-.1.2-.2.2h-1.2c-.1 0-.2-.1-.2-.2.1-.1.1-.1.1-.2l.1-.1 4.5-8c.1-.1.1-.2.2-.3.1-.1.2-.1.4-.1h1.2c.1 0 .2.1.2.2v9.1c0 .1-.1.2-.2.2h-1.2c-.1 0-.2-.1-.2-.2v-8.5h-.1l-4.1 7.8c-.1.1-.1.2-.2.3-.1.1-.2.1-.4.1h-1.2c-.1 0-.2-.1-.2-.2v-9.1c0-.1.1-.2.2-.2h1.3z" />
    </svg>
);

const LinuxIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <circle cx="12.5" cy="11" r="1.2" /><circle cx="19.5" cy="11" r="1.2" /><path d="M16 3C11 3 8 7 8 11c0 2 0 3 1 5 0 1 0 2-1 3l-1 1c-1 1-1 2 0 3 0 1 1 1 2 1h3c1 2 3 3 4 3s3-1 4-3h3c1 0 2 0 2-1 1-1 1-2 0-3l-1-1c-1-1-1-2-1-3 1-2 1-3 1-5 0-4-3-8-8-8zm0 2c4 0 6 3 6 6 0 2 0 3-1 4-1 2 0 4 1 5l1 1-1 1h-4c0-1-1-2-2-2s-2 1-2 2H10l-1-1 1-1c1-1 2-3 1-5-1-1-1-2-1-4 0-3 2-6 6-6z" />
    </svg>
);

const GitIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M30.7 14.9L17.1 1.3c-.4-.4-1-.4-1.4 0L12.9 4l2.8 2.8c.4-.1.9-.1 1.4.1.5.2.9.6 1.1 1.1.2.5.2 1 0 1.5l2.7 2.7c.5-.2 1-.2 1.5 0 .5.2.9.6 1.1 1.1.2.5.2 1.1 0 1.6-.2.5-.6.9-1.1 1.1-.5.2-1.1.2-1.6 0-.5-.2-.9-.6-1.1-1.1-.2-.5-.2-1 0-1.5l-2.5-2.5v6.7c.7.3 1.1 1 1.1 1.8 0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6s-1-.2-1.4-.6c-.4-.4-.6-.9-.6-1.4 0-.8.5-1.5 1.1-1.8V9c-.7-.3-1.1-1-1.1-1.8 0-.5.2-1 .6-1.4L12.9 4 1.3 15.6c-.4.4-.4 1 0 1.4l13.6 13.6c.4.4 1 .4 1.4 0L30.7 16.3c.4-.4.4-1 0-1.4z" />
    </svg>
);

const ReactIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <circle cx="16" cy="16" r="2.5" /><path d="M16 11.2c6.4 0 11.7 1.5 11.7 3.3s-5.2 3.3-11.7 3.3S4.3 16.3 4.3 14.5s5.2-3.3 11.7-3.3zm-9.5 7c3.2 5.5 7.8 9.2 10.3 8.3s2.1-6-.9-11.5c-3.1-5.5-7.8-9.2-10.3-8.3S3.5 12.7 6.5 18.2zm0-7.4c-3.1 5.5-3.4 10.6-.9 11.5s7.1-2.8 10.3-8.3c3.1-5.5 3.4-10.6.9-11.5s-7.2 2.8-10.3 8.3z" />
    </svg>
);

const LangchainIcon = () => (
    <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M16 4c-2.2 0-4 1.8-4 4v8l-4 2v-6c0-1.1-.9-2-2-2s-2 .9-2 2v16c0 1.1.9 2 2 2s2-.9 2-2v-6l4 2v2c0 2.2 1.8 4 4 4s4-1.8 4-4v-2l4-2v6c0 1.1.9 2 2 2s2-.9 2-2V12c0-1.1-.9-2-2-2s-2 .9-2 2v6l-4 2V8c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-1.1.9-2 2-2z" />
    </svg>
);

const technologies = [
    { name: "Python", Icon: PythonIcon },
    { name: "NumPy", Icon: NumpyIcon },
    { name: "Pandas", Icon: PandasIcon },
    { name: "PyTorch", Icon: PyTorchIcon },
    { name: "PostgreSQL", Icon: PostgreSQLIcon },
    { name: "Redis", Icon: RedisIcon },
    { name: "Docker", Icon: DockerIcon },
    { name: "Kubernetes", Icon: KubernetesIcon },
    { name: "AWS", Icon: AWSIcon },
    { name: "Linux", Icon: LinuxIcon },
    { name: "Git", Icon: GitIcon },
    { name: "React", Icon: ReactIcon },
    { name: "LangChain", Icon: LangchainIcon },
];

export default function TechStack() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-44 bg-luxury-black px-6 md:px-12 border-t border-white/5"
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    className="text-4xl md:text-5xl font-semibold text-white mb-28 tracking-tight"
                >
                    Technology Stack
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {technologies.map(({ name, Icon }, index) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative flex items-center gap-6 px-8 py-10 bg-[#111111] rounded-2xl border border-white/6 backdrop-blur-sm hover:bg-[#161616] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-default overflow-hidden"
                            style={{
                                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.03)'
                            }}
                        >
                            <div className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 shrink-0">
                                <Icon />
                            </div>
                            <span className="text-[17px] font-medium text-gray-200 tracking-[0.02em] leading-tight">
                                {name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
