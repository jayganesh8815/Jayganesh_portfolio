import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Linkedin, Github, Download, Send, Loader2 } from "lucide-react";
import { Reveal, SectionHeading, LinkedInCTA, MagneticButton } from "@/components/primitives";
import { PROFILE, downloadResume } from "@/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Field = ({ label, children, id }) => (
  <div>
    <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">{label}</label>
    <div className="mt-2">{children}</div>
  </div>
);

const inputCls =
  "w-full border-b border-edge bg-transparent py-3 text-fg outline-none transition-colors duration-300 placeholder:text-fg-muted/50 focus:border-azure";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, tid: "contact-email" },
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}`, tid: "contact-phone" },
    { icon: Linkedin, label: "LinkedIn", value: "in/jayganesh-lavange", href: PROFILE.linkedin, tid: "contact-linkedin" },
    { icon: Github, label: "GitHub", value: "jayganesh-lavange", href: PROFILE.github, tid: "contact-github" },
  ];

  return (
    <section id="contact" className="relative border-t border-edge py-28" data-testid="contact-section">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading index="09" kicker="Get in touch" title="Let's build something reliable." subtitle="Recruiters and teams welcome — reach out, or connect with me directly on LinkedIn." testid="contact-heading" />
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((c) => (
                <Reveal key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-testid={c.tid}
                    className="glass group flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-azure/10 text-azure transition-colors group-hover:bg-azure group-hover:text-white">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted">{c.label}</span>
                      <span className="block text-sm text-fg">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-4">
                <LinkedInCTA testid="contact-linkedin-cta" label="Connect on LinkedIn" size="lg" />
                <MagneticButton
                  onClick={downloadResume}
                  data-testid="contact-download-resume"
                  className="inline-flex items-center gap-2.5 rounded-full border border-edge px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-azure"
                >
                  <Download className="h-4 w-4 text-azure" /> Download Resume
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="glass rounded-2xl p-8" data-testid="contact-form">
              <div className="grid gap-6">
                <Field label="Name" id="name">
                  <input id="name" data-testid="contact-input-name" value={form.name} onChange={update("name")} placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="Email" id="email">
                  <input id="email" type="email" data-testid="contact-input-email" value={form.email} onChange={update("email")} placeholder="you@company.com" className={inputCls} />
                </Field>
                <Field label="Subject" id="subject">
                  <input id="subject" data-testid="contact-input-subject" value={form.subject} onChange={update("subject")} placeholder="Opportunity / Question" className={inputCls} />
                </Field>
                <Field label="Message" id="message">
                  <textarea id="message" rows={4} data-testid="contact-input-message" value={form.message} onChange={update("message")} placeholder="Tell me a bit about the role or project..." className={`${inputCls} resize-none`} />
                </Field>
                <MagneticButton
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-azure px-6 py-3.5 font-medium text-white glow-azure transition-colors duration-300 hover:bg-azure-hover disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Sending..." : "Send Message"}
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
