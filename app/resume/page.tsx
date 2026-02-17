"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-white text-gray-900 font-['Poppins']">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full" />
                        <span className="text-xl font-semibold">Portfolio</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm">
                        <a href="#about" className="hover:text-blue-600 transition">About me</a>
                        <a href="#experience" className="hover:text-blue-600 transition">Experience</a>
                        <a href="#project" className="hover:text-blue-600 transition">Projects</a>
                        <a href="#contact" className="hover:text-blue-600 transition">Contact me</a>
                    </div>
                    <Link href="/#contact" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm font-semibold">
                        Hire me
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 lowercase">
                            sushant kumar
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            AI Systems Engineer building production-grade intelligent systems.
                        </p>
                        <a href="#contact" className="inline-flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <span className="text-lg font-medium">Download CV</span>
                        </a>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                            <div className="absolute  bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-sm">
                                <h3 className="text-2xl font-semibold mb-2">Let's Work Together</h3>
                                <p className="text-sm text-gray-600 mb-1">I am Available at</p>
                                <p className="text-blue-600 font-medium">your@email.com</p>
                                <p className="text-gray-700">+1 234 567 890</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <p className="text-3xl md:text-4xl font-light leading-relaxed">
                            I'm <span className="font-semibold">Sushant</span> - a self-taught AI systems engineer based in India.
                            I started as a software developer, but now I do a mix of everything from{" "}
                            <span className="text-blue-600 font-medium">ML Engineering</span>,{" "}
                            <span className="text-purple-600 font-medium">System Design</span>,{" "}
                            <span className="text-green-600 font-medium">Full-Stack Development</span> &{" "}
                            <span className="text-orange-600 font-medium">DevOps</span>.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Personal Info */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold">Personal Info</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Building scalable AI solutions at the intersection of machine learning and software engineering.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <div className="text-sm">Your City, Your Country</div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <div className="text-sm">your@email.com</div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <div className="text-sm">+1 234 567 890</div>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold">Education</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="border-l-2 border-blue-200 pl-6 relative">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full" />
                                    <p className="text-sm text-gray-500 mb-1">2020 - 2024</p>
                                    <h4 className="text-lg font-semibold mb-2">B.Tech in Computer Science</h4>
                                    <p className="text-gray-600 text-sm">
                                        Your University Name
                                    </p>
                                </div>
                                <div className="border-l-2 border-gray-200 pl-6 relative">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-400 rounded-full" />
                                    <p className="text-sm text-gray-500 mb-1">2018 - 2020</p>
                                    <h4 className="text-lg font-semibold mb-2">High School</h4>
                                    <p className="text-gray-600 text-sm">
                                        Your School Name
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">In a previous life</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { company: "Company 1", year: "2023 - Present", role: "Senior AI Engineer", skills: ["ML Ops", "System Design"] },
                            { company: "Company 2", year: "2021 - 2023", role: "Full-Stack Developer", skills: ["React", "Node.js"] },
                            { company: "Company 3", year: "2020 - 2021", role: "Software Engineer", skills: ["Python", "Django"] },
                            { company: "Company 4", year: "2019 - 2020", role: "Intern", skills: ["JavaScript", "APIs"] }
                        ].map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer"
                            >
                                <h3 className="text-xl font-semibold mb-2">{exp.company}</h3>
                                <p className="text-sm text-gray-500 mb-4">{exp.year}</p>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h4 className="font-medium mb-2">{exp.role}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, j) => (
                                            <span key={j} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="project" className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Showcase</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Selected projects demonstrating technical excellence and innovation.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer"
                            >
                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative group-hover:scale-105 transition-transform duration-500" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-2">Project {i + 1}</h3>
                                    <p className="text-gray-600 mb-4">
                                        A production-grade system demonstrating advanced capabilities.
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-600 group-hover:gap-4 transition-all">
                                        <span className="font-medium">View Project</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        That's it! Now it's your turn to say hi.
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 mt-16">
                        {/* Social Links */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Follow me on the net</h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Twitter", desc: "Most controversial Place", icon: "🐦" },
                                    { name: "LinkedIn", desc: "Professional Network", icon: "💼" },
                                    { name: "GitHub", desc: "Code Repository", icon: "💻" }
                                ].map((social, i) => (
                                    <a key={i} href="#" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition group">
                                        <span className="text-3xl">{social.icon}</span>
                                        <div>
                                            <p className="font-semibold group-hover:text-blue-600 transition">{social.name}</p>
                                            <p className="text-sm text-gray-500">{social.desc}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none transition" />
                                    <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none transition" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="tel" placeholder="Phone" className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none transition" />
                                    <input type="text" placeholder="Subject" className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none transition" required />
                                </div>
                                <textarea placeholder="Your Message...." rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none transition resize-none" />
                                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-gray-100 text-center text-sm text-gray-500">
                <p>© 2026 Sushant Kumar. All rights reserved.</p>
            </footer>
        </main>
    );
}
