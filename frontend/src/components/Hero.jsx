import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, FolderGit2, Mail } from "lucide-react";
import { SqlBackground } from "@/components/Background";
import { LinkedInCTA, MagneticButton } from "@/components/primitives";
import { PROFILE, downloadResume } from "@/data";

const EASE = [0.22, 1, 0.36, 1];
const HEADLINE = ["Building Reliable, Secure,", "High-Performance", "Database Infrastructure."];

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

const Typewriter = ({ text }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 55);
    return () => clearTimeout(t);
  }, [n, text]);
  return (
    <span className="font-mono text-azure">
      {text.slice(0, n)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-[2px] translate-y-0.5 bg-azure"
      >&nbsp;</motion.span>
    </span>
  );
};

export const Hero = () => {
  return (
    <section id="top" className="relative flex min-h-screen items-center pt-28" data-testid="hero-section">
      <SqlBackground />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted backdrop-blur"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {PROFILE.experience} · Available for opportunities
        </motion.div>

        <h1 className="mt-8 font-display text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
          {HEADLINE.map((line, i) => (
            <MaskedLine key={i} delay={0.3 + i * 0.12}>
              {i === 1 ? <span className="text-gradient">{line}</span> : line}
            </MaskedLine>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 max-w-2xl"
        >
          <p className="font-display text-2xl font-medium sm:text-3xl">{PROFILE.name}</p>
          <p className="mt-2 text-lg text-fg-muted">
            <Typewriter text={PROFILE.role} />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            onClick={downloadResume}
            data-testid="hero-download-resume"
            className="group inline-flex items-center gap-2.5 rounded-full border border-edge bg-panel/50 px-6 py-3 text-sm font-medium text-fg backdrop-blur transition-colors duration-300 hover:border-azure"
          >
            <Download className="h-4 w-4 text-azure" /> Download Resume
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            data-testid="hero-view-projects"
            className="inline-flex items-center gap-2.5 rounded-full border border-edge px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-azure"
          >
            <FolderGit2 className="h-4 w-4 text-azure" /> View Projects
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            data-testid="hero-contact"
            className="inline-flex items-center gap-2.5 rounded-full border border-edge px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-azure"
          >
            <Mail className="h-4 w-4 text-azure" /> Contact Me
          </MagneticButton>
          <LinkedInCTA testid="hero-linkedin-cta" />
        </motion.div>
      </div>
    </section>
  );
};
