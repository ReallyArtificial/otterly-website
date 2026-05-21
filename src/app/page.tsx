import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HorizontalModes } from "@/components/HorizontalModes";
import { OpenClawMoment } from "@/components/OpenClawMoment";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Scroll progress bar — amber line below navbar */}
      <ScrollProgress />
      {/* ⌘K command palette — global keyboard navigation */}
      <KeyboardShortcuts />
      <main>
        <Hero />
        <HorizontalModes />
        <OpenClawMoment />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
