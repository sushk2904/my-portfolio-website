import HeroSection from "./components/HeroSection";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import StickyNavbar from "./components/StickyNavbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-luxury-black">
      <StickyNavbar />
      <HeroSection />
      <TechStack />
      <Projects />

      <footer className="py-12 border-t border-white/5 text-center text-luxury-gray text-xs uppercase tracking-widest">
        © 2026 Sushant Kumar. Engineering Excellence.
      </footer>
    </main>
  );
}
