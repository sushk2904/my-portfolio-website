import HeroSection from "./components/HeroSection";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import StickyNavbar from "./components/StickyNavbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-luxury-black">
      <StickyNavbar />
      <div id="introduction">
        <HeroSection />
      </div>
      <Projects />

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#191919] px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-semibold text-white mb-12 tracking-tight">Contact</h3>
          <p className="text-lg text-gray-400 mb-8">Let's build something exceptional together.</p>
          <a
            href="mailto:your@email.com"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-luxury-gray text-xs uppercase tracking-widest">
        © 2026 Sushant Kumar. Engineering Excellence.
      </footer>
    </main>
  );
}
