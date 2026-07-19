import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon, Database, ArrowUp } from "lucide-react";
import { LinkedInCTA } from "@/components/primitives";
import { PROFILE } from "@/data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const LoadingScreen = ({ done }) => (
  <AnimatePresence>
    {!done && (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
        data-testid="loading-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Database className="h-10 w-10 text-azure" strokeWidth={1.5} />
        </motion.div>
        <motion.p
          className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-fg-muted"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          Establishing connection
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
);

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-azure-glow to-azure"
      data-testid="scroll-progress"
    />
  );
};

export const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300 ${
        scrolled ? "glass border-b border-edge py-3" : "border-b border-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Database className="h-5 w-5 text-azure" />
          JL<span className="text-azure">.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="relative text-sm text-fg-muted transition-colors duration-200 hover:text-fg after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-azure after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-edge text-fg-muted transition-colors duration-200 hover:border-azure hover:text-azure"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="hidden sm:block">
            <LinkedInCTA testid="nav-linkedin-cta" label="Connect" />
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-edge lg:hidden"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-fg-muted transition-colors hover:text-fg"
                  data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </a>
              ))}
              <LinkedInCTA testid="mobile-linkedin-cta" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="relative border-t border-edge py-16" data-testid="footer">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-semibold">
              <Database className="h-5 w-5 text-azure" /> {PROFILE.name}
            </div>
            <p className="mt-3 max-w-xs text-sm text-fg-muted">{PROFILE.role} — {PROFILE.experience}.</p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">Quick Links</h4>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-fg-muted transition-colors hover:text-azure">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">Elsewhere</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-azure" data-testid="footer-linkedin">LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-azure" data-testid="footer-github">GitHub</a>
              <a href={`mailto:${PROFILE.email}`} className="text-fg-muted hover:text-azure">{PROFILE.email}</a>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 sm:flex-row">
          <p className="font-mono text-xs text-fg-muted">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <button
            onClick={scrollTop}
            data-testid="back-to-top"
            className="group inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 text-xs text-fg-muted transition-colors hover:border-azure hover:text-azure"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
