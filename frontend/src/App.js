import { useEffect, useState } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { LoadingScreen, ScrollProgress, Navbar, Footer } from "@/components/Chrome";
import { CursorGlow } from "@/components/Background";
import { Hero } from "@/components/Hero";
import { About, Skills, SkillMarquee, Experience } from "@/components/Sections";
import { Projects, Certifications, GitHubSection, Blog, Testimonials } from "@/components/Showcase";
import { Contact } from "@/components/Contact";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="App noise relative min-h-screen bg-base text-fg">
      <LoadingScreen done={loaded} />
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <SkillMarquee />
        <Experience />
        <Projects />
        <Certifications />
        <GitHubSection />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme={theme} richColors />
    </div>
  );
}

export default App;
