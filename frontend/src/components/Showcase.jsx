import { motion } from "framer-motion";
import { Github, ArrowUpRight, Star, Award, BookOpen, Quote } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/primitives";
import { PROJECTS, CERTS, REPOS, POSTS, TESTIMONIALS } from "@/data";

export const Projects = () => (
  <section id="projects" className="relative border-t border-edge py-28" data-testid="projects-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="04" kicker="Selected Work" title="Projects that moved the needle." subtitle="Real database engagements — problem, solution and the tools that got it done." testid="projects-heading" />
      <div className="grid auto-rows-[minmax(280px,auto)] gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
            <motion.article
              whileHover="hover"
              className="group relative h-full overflow-hidden rounded-2xl border border-edge"
              data-testid={`project-card-${i}`}
            >
              <motion.img
                src={p.image}
                alt={p.title}
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
              <div className="relative flex h-full flex-col justify-end p-7">
                <span className="mb-3 w-fit rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-azure-glow backdrop-blur">{p.tag}</span>
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{p.title}</h3>
                <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-60 group-hover:opacity-100">
                  <p className="text-sm text-white/70"><span className="text-white/90">Problem:</span> {p.problem}</p>
                  <p className="mt-1.5 text-sm text-white/70"><span className="text-white/90">Solution:</span> {p.solution}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md bg-white/10 px-2.5 py-1 text-xs text-white/80">{t}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`project-github-${i}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-azure"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Certifications = () => (
  <section id="certifications" className="relative border-t border-edge py-28" data-testid="certifications-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="05" kicker="Credentials" title="Certifications & roadmap." testid="certifications-heading" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CERTS.map((c, i) => (
          <Reveal key={c.name} delay={(i % 4) * 0.08}>
            <motion.div whileHover={{ y: -6 }} className="grad-border h-full rounded-2xl p-6" data-testid={`cert-card-${i}`}>
              <Award className="h-7 w-7 text-azure" />
              <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">{c.sub}</p>
              <span className="mt-4 inline-block rounded-full bg-azure/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-azure">{c.status}</span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const GitHubSection = () => (
  <section id="github" className="relative border-t border-edge py-28" data-testid="github-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="06" kicker="Open Source" title="Code & repositories." testid="github-heading" />
      <div className="grid gap-5 lg:grid-cols-3">
        {REPOS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.08}>
            <motion.a
              href="https://github.com/jayganesh-lavange"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              className="glass group flex h-full flex-col rounded-2xl p-6"
              data-testid={`repo-card-${i}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-sm text-fg">
                  <Github className="h-4 w-4 text-azure" /> {r.name}
                </div>
                <ArrowUpRight className="h-4 w-4 text-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-azure" />
              </div>
              <p className="mt-3 flex-1 text-sm text-fg-muted">{r.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.tech.map((t) => (
                  <span key={t} className="rounded-md border border-edge px-2 py-0.5 text-xs text-fg-muted">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 font-mono text-xs text-fg-muted">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-azure" /> {r.stars}</span>
                <span>Updated {r.updated}</span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Blog = () => (
  <section id="blog" className="relative border-t border-edge py-28" data-testid="blog-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="07" kicker="Writing" title="Notes from the trenches." testid="blog-heading" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <motion.article whileHover={{ y: -6 }} className="glass group flex h-full flex-col rounded-2xl p-6" data-testid={`post-card-${i}`}>
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-azure">
                <span>{p.cat}</span><span className="text-fg-muted">{p.read}</span>
              </div>
              <BookOpen className="mt-5 h-6 w-6 text-fg-muted transition-colors group-hover:text-azure" />
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-azure">Read article <ArrowUpRight className="h-4 w-4" /></span>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Testimonials = () => (
  <section id="testimonials" className="relative border-t border-edge py-28" data-testid="testimonials-section">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading index="08" kicker="Recommendations" title="Words worth trusting." subtitle="Placeholders reserved for future recommendations from managers and colleagues." testid="testimonials-heading" />
      <div className="grid gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08}>
            <div className="glass h-full rounded-2xl p-7" data-testid={`testimonial-card-${i}`}>
              <Quote className="h-7 w-7 text-azure" />
              <p className="mt-4 text-fg-muted">{t.quote}</p>
              <div className="mt-6 border-t border-edge pt-4">
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-sm text-fg-muted">{t.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
