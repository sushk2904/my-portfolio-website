"use client";

import ScrollFoodHero from "./components/ScrollFoodHero";
import StickyNavbar from "./components/StickyNavbar";
import DashboardPreview from "./components/DashboardPreview";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-crave-bg">
      <StickyNavbar />
      <ScrollFoodHero />

      <DashboardPreview />
    </main>
  );
}
