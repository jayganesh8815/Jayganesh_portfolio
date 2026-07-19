import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  Database, Network, HardDriveDownload, Gauge, Activity, ShieldCheck,
  TerminalSquare, Server, CheckCircle2, Briefcase,
} from "lucide-react";
import { Reveal, SectionHeading, StatCounter, LinkedInCTA } from "@/components/primitives";
import { ABOUT, STATS, SKILL_GROUPS, EXPERIENCE, PROFILE } from "@/data";

const ICONS = { Database, Network, HardDriveDownload, Gauge, Activity, ShieldCheck, TerminalSquare, Server };

export const About = () => (
  <section id="about" className="relative border-t border-edge py-28" data-testid="about-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="01" kicker="About Me" title="Reliable data is invisible. I keep it that way." testid="about-heading" />
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {ABOUT.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-fg-muted">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3 pt-2">
              {["High Availability", "Disaster Recovery", "Performance Tuning", "Security", "Automation", "Continuous Learning"].map((t) => (
                <span key={t} className="rounded-full border border-edge px-4 py-1.5 text-sm text-fg-muted">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="grad-border rounded-2xl p-6">
                <div className="font-display text-4xl font-semibold text-gradient">
                  <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Skills = () => (
  <section id="skills" className="relative border-t border-edge py-28" data-testid="skills-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="02" kicker="Capabilities" title="The full DBA toolchain." subtitle="Hands-on expertise across the SQL Server platform, from availability groups to query internals." testid="skills-heading" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => {
          const Icon = ICONS[g.icon] || Database;
          return (
            <Reveal key={g.title} delay={(i % 4) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="glass group h-full rounded-2xl p-6"
                data-testid={`skill-card-${i}`}
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-azure/10 text-azure transition-colors duration-300 group-hover:bg-azure group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-fg-muted">
                      <span className="h-1 w-1 rounded-full bg-azure" /> {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export const SkillMarquee = () => (
  <div className="border-y border-edge py-8" data-testid="skill-marquee">
    <Marquee speed={40} gradient={false} className="overflow-hidden">
      {["SQL Server", "Always On AG", "Log Shipping", "Performance Tuning", "Disaster Recovery", "T-SQL", "PowerShell", "Azure SQL", "Index Tuning", "Backup & Recovery", "Security"].map((w, i) => (
        <span key={i} className="mx-8 font-display text-5xl font-semibold tracking-tight text-transparent sm:text-7xl" style={{ WebkitTextStroke: "1px rgba(148,163,184,0.35)" }}>
          {w} <span className="text-azure">✦</span>
        </span>
      ))}
    </Marquee>
  </div>
);

export const Experience = () => (
  <section id="experience" className="relative border-t border-edge py-28" data-testid="experience-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="03" kicker="Experience" title="Where I've kept databases alive." testid="experience-heading" />
      <div className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-edge sm:left-4" />
        {EXPERIENCE.map((e, i) => (
          <Reveal key={i}>
            <div className="relative pl-12 sm:pl-16">
              <div className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full border border-azure bg-base sm:h-9 sm:w-9">
                <Briefcase className="h-3.5 w-3.5 text-azure sm:h-4 sm:w-4" />
              </div>
              <div className="glass rounded-2xl p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-azure">{e.period}</span>
                </div>
                <p className="mt-1 text-fg-muted">{e.company}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-azure" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-10 flex items-center gap-4">
          <p className="text-fg-muted">Want the full story?</p>
          <LinkedInCTA testid="experience-linkedin-cta" label="See my LinkedIn" />
        </div>
      </Reveal>
    </div>
  </section>
);
