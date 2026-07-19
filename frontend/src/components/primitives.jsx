import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SectionHeading = ({ index, kicker, title, subtitle, testid }) => (
  <div className="mb-14 max-w-3xl" data-testid={testid}>
    <Reveal>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-azure">
        <span>{index}</span>
        <span className="h-px w-10 bg-azure/50" />
        <span>{kicker}</span>
      </div>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.16}>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">{subtitle}</p>
      </Reveal>
    )}
  </div>
);

export const MagneticButton = ({ children, className = "", as = "button", ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => { x.set(0); y.set(0); };

  const Comp = motion[as] || motion.button;
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const LinkedInCTA = ({ testid, label = "Connect on LinkedIn", size = "md" }) => {
  const pad = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  return (
    <MagneticButton
      as="a"
      href={PROFILE.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testid}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-azure ${pad} font-medium text-white glow-azure transition-[background-color,box-shadow] duration-300 hover:bg-azure-hover`}
    >
      <Linkedin className="h-[18px] w-[18px]" />
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </MagneticButton>
  );
};

export const StatCounter = ({ value, suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}{suffix}
    </span>
  );
};
