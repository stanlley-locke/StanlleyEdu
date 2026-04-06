import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  CheckCircle, 
  Code, 
  Server, 
  Brain, 
  Cpu, 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Download, 
  Layers, 
  Terminal, 
  Zap,
  ShieldCheck,
  MessageCircle,
  Monitor,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <PublicLayout>
      {/* Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        {/* Local Hero Background Image */}
        <div className="absolute inset-0 z-0 text-white">
          <img 
            src="/hero_background.jpg" 
            alt="StanlleyHub Education Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                <Monitor className="h-3.5 w-3.5" /> Software Engineering Bootcamp
              </div>
              <h1 className="text-5xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
                Master Skills that <span className="text-secondary text-glow">Actually Matter.</span>
              </h1>
              <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-xl">
                100% Practical. Bridge the gap between theory and industry.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all">
                  <Link href="/register">Apply Now — 800 Ksh</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-medium border-primary/10 hover:bg-primary/5 transition-all">
                  <a href="https://chat.whatsapp.com/Fp8zcgyPcQPEeqqAOqaxe2" target="_blank">
                    <MessageCircle className="mr-2 h-5 w-5 text-secondary" />
                    Join WhatsApp Channel
                  </a>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground font-bold tracking-widest uppercase">
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-secondary" /> Certification</span>
                <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-secondary" /> 100% Practical</span>
                <span className="flex items-center gap-2"><Layers className="h-4 w-4 text-secondary" /> Portfolio-Ready</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-10 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
              <div className="relative bg-card border rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-border" />
                    <div className="h-3 w-3 rounded-full bg-border" />
                    <div className="h-3 w-3 rounded-full bg-border" />
                  </div>
                  <div className="mx-auto text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1">
                    <Terminal className="h-3 w-3" /> StanlleyHub Engine v2.0
                  </div>
                </div>
                <div className="p-8 font-mono text-sm leading-relaxed">
                  <div className="flex gap-4 mb-4">
                    <span className="text-secondary">class</span>
                    <span className="text-accent">Engineer</span>
                    <span className="text-foreground">{'{'}</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div className="flex gap-4">
                      <span className="text-secondary">constructor</span>
                      <span className="text-foreground">() {'{'}</span>
                    </div>
                    <div className="pl-6 text-muted-foreground">
                      this.stack = ["React", "Node.js", "Python", "AI", "DevOps"];
                      <br />
                      this.approach = "Practical_Systems";
                      <br />
                      this.lifecycle = "May - July";
                    </div>
                    <div className="text-foreground">{'}'}</div>
                  </div>
                  <div className="pl-6 mt-4">
                    <span className="text-accent">deploy</span>
                    <span className="text-foreground">() {'{'}</span>
                    <div className="pl-6 text-secondary">return "Ready for Production";</div>
                    <span className="text-foreground">{'}'}</span>
                  </div>
                  <div className="text-foreground mt-4">{'}'}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ongoing Cohort Section - Full Screen */}
      <section className="relative min-h-screen flex flex-col justify-center py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00215E_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold tracking-tight text-primary uppercase italic"
          >
            Ongoing Cohort
          </motion.h2>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-12 items-stretch max-w-6xl mx-auto">
            {/* Status Card */}
            <div className="group bg-white border border-black/10 rounded-[3rem] p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-12">
                <div className="h-3 w-3 rounded-full bg-secondary animate-pulse" />
                <span className="text-[12px] font-extrabold uppercase tracking-[0.4em] text-secondary italic">Schedule</span>
              </div>
              <Calendar className="h-16 w-16 text-primary mb-10 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Duration</h3>
              <p className="text-5xl font-bold text-primary tracking-tighter italic">May — July</p>
              <div className="mt-12 pt-12 border-t border-black/5 flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Status</span>
                <span className="text-[12px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">Enrolling</span>
              </div>
            </div>

            {/* Investment Card */}
            <div className="group bg-white border border-black/10 rounded-[3rem] p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-12">
                <ShieldCheck className="h-7 w-7 text-secondary" />
                <span className="text-[12px] font-extrabold uppercase tracking-[0.4em] text-secondary italic">Secure</span>
              </div>
              <ShieldCheck className="h-16 w-16 text-primary mb-10 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Investment</h3>
              <p className="text-5xl font-bold text-primary tracking-tighter italic">800 Ksh</p>
              <p className="text-sm font-bold text-muted-foreground mt-6 leading-relaxed max-w-[15ch]">Professional engineering commitment.</p>
            </div>

            {/* Methodology Card */}
            <div className="group bg-white border border-black/10 rounded-[3rem] p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-12">
                <Zap className="h-7 w-7 text-secondary" />
                <span className="text-[12px] font-extrabold uppercase tracking-[0.4em] text-secondary italic">Labs</span>
              </div>
              <Zap className="h-16 w-16 text-primary mb-10 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Approach</h3>
              <p className="text-5xl font-bold text-primary tracking-tighter italic">100% Practical</p>
              <div className="mt-12 flex flex-wrap gap-3">
                {["Labs", "Deploy", "Scale"].map((tag) => (
                  <span key={tag} className="text-[11px] font-black px-5 py-2 rounded-full border border-primary/10 bg-primary/[0.03] text-primary uppercase tracking-[0.1em]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Mentor - Full Screen Redesign */}
      <section id="mentor" className="relative min-h-screen flex flex-col justify-center py-32 bg-[#FAFAFA] border-y border-black/10 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <div className="h-2 w-16 bg-secondary mb-10 rounded-full" />
                <h2 className="text-sm font-black uppercase tracking-[0.5em] text-secondary mb-6 italic">Lead Engineer</h2>
                <h3 className="text-6xl lg:text-9xl font-bold text-primary tracking-tighter leading-[0.9] italic">Stanlley <br/> Locke</h3>
              </div>
              
              <div className="space-y-10 text-2xl text-muted-foreground leading-relaxed font-semibold max-w-xl">
                <p>
                  Specializing in <span className="text-primary underline underline-offset-8 decoration-secondary/30">production-grade architecture</span>, developer tooling, and custom AI frameworks.
                </p>
                <p>
                  I bridge the gap between academic theory and <span className="text-primary underline underline-offset-8 decoration-secondary/30">deployable engineering solutions</span> that scale.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-12">
                {[
                  { icon: Terminal, title: "Senior Dev", desc: "Flask, Node.js, React, Flutter & DevOps" },
                  { icon: Brain, title: "AI Builder", desc: "Neural frameworks & GPU pipelines" }
                ].map((skill, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex items-center justify-center shrink-0 border border-black/5">
                      <skill.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-black text-primary mb-2 uppercase tracking-[0.2em] text-xs underline decoration-secondary/20">{skill.title}</h4>
                      <p className="text-base text-muted-foreground font-semibold leading-snug">{skill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="rounded-full px-12 bg-primary hover:bg-primary/95 text-white font-black h-20 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-lg uppercase tracking-widest">
                  <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank">LinkedIn Profile</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-primary/20 hover:bg-primary/[0.04] font-black h-20 transition-all hover:scale-105 active:scale-95 text-lg uppercase tracking-widest">
                  <Link href="/resume.pdf" target="_blank">Download Resume</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-black/10 rounded-[4rem] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.05)] relative"
            >
              <div className="absolute top-12 right-12 h-12 w-12 rounded-full border border-black/5 flex items-center justify-center opacity-20">
                <Code className="text-primary" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.5em] text-secondary mb-16 border-b border-black/5 pb-10 italic">Core Engineering Artifacts</h4>
              <div className="space-y-16">
                {[
                  { title: "StanleyHub", desc: "Enterprise learning ecosystems with realtime Socket.IO integration and scalable SQLite architecture." },
                  { title: "NeuralNetV2", desc: "Sophisticated neural training framework supporting GPU-accelerated reproducible experiments." },
                  { title: "Coinium", desc: "Realtime blockchain simulation engine with integrated Telegram automation." },
                ].map((project, i) => (
                  <div key={i} className="group cursor-default relative pl-6 border-l-2 border-black/5 hover:border-secondary transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-3xl font-black text-primary group-hover:text-secondary transition-colors tracking-tighter italic">{project.title}</h5>
                      <ExternalLink className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-bold text-lg">{project.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Core Stack - Full Screen Clean Redesign */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-5xl mx-auto mb-32">
          <h2 className="text-sm font-black uppercase tracking-[0.6em] text-secondary mb-8 italic">Engineering Tracks</h2>
          <h3 className="text-7xl lg:text-9xl font-bold mb-10 tracking-tighter text-primary italic">Practical Stack.</h3>
          <p className="text-2xl text-muted-foreground font-bold tracking-tight max-w-3xl mx-auto">We don't teach "tutorials." We build production-ready systems using the industry's most in-demand tools.</p>
        </div>

        <div className="container mx-auto px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Code, title: "Web Engineering", desc: "Building scalable frontends and high-performance Node.js backends." },
              { icon: Server, title: "Python/Backend", desc: "Mastering OOP, Flask, Django, and modern API architecture." },
              { icon: Brain, title: "Agentic AI", desc: "Training LLMs and building custom agentic AI pipelines." },
              { icon: Cpu, title: "DevOps & Cloud", desc: "Docker orchestration, server automation, and CI/CD mastery." },
            ].map((track, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20, scale: 1.02 }}
                className="bg-white p-12 rounded-[3.5rem] border border-black/10 hover:border-secondary/30 transition-all duration-700 shadow-[0_15px_60px_rgba(0,0,0,0.03)] group"
              >
                <div className="h-20 w-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mb-12 transition-all duration-700 group-hover:bg-secondary/10 group-hover:rotate-6">
                  <track.icon className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-black mb-6 text-primary tracking-tighter italic">{track.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-bold">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact CTA - Full Screen Focus */}
      <section className="relative min-h-[90vh] flex flex-col justify-center py-40 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:48px_48px]" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <h2 className="text-sm font-black uppercase tracking-[0.8em] text-secondary mb-10 italic">Enrollment Closing Soon</h2>
            <h3 className="text-6xl lg:text-9xl font-black tracking-tighter leading-[0.85] italic">
              Seats are filling up fast. <br/>
              <span className="text-secondary">Join the May Cohort Today.</span>
            </h3>
            <p className="text-2xl lg:text-3xl text-white/70 font-black max-w-4xl mx-auto leading-tight italic">
              Ready to stop watching tutorials and start building systems? Pay the 800 Ksh commitment fee and secure your future.
            </p>
            <div className="pt-20 flex flex-col sm:flex-row gap-10 justify-center">
              <Button asChild size="lg" className="rounded-full px-20 bg-secondary hover:bg-secondary/90 text-primary font-black h-28 text-2xl shadow-[0_20px_80px_rgba(197,160,89,0.3)] transition-all hover:scale-110 active:scale-95 uppercase tracking-widest italic">
                <Link href="/apply">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-20 border-white/40 hover:bg-white/10 text-white font-black h-28 text-2xl transition-all hover:scale-110 active:scale-95 uppercase tracking-widest italic">
                <a href="https://wa.me/254752032884" target="_blank">WhatsApp Support</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Footer - Clean White Premium */}
      <footer className="bg-white border-t border-black/10 pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-24 mb-32">
            {/* Brand Section */}
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <img src="/StanlleyHub_Education_logo.png" alt="Logo" className="h-12 w-auto" />
                <span className="text-3xl font-black tracking-tighter text-primary italic uppercase">StanlleyHub</span>
              </div>
              <p className="text-xl text-muted-foreground font-bold leading-relaxed">
                Democratizing high-level tech education through 100% practical, zero-fluff engineering training.
              </p>
            </div>

            {/* Programs Section */}
            <div className="space-y-12">
              <h4 className="text-xs font-black uppercase tracking-[0.6em] text-secondary italic">Programs</h4>
              <ul className="space-y-6">
                {["Full-Stack Web Dev", "AI & Machine Learning", "DevOps & Cloud", "Python Engineering"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-xl text-primary/70 hover:text-secondary font-black transition-colors italic">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-12">
              <h4 className="text-xs font-black uppercase tracking-[0.6em] text-secondary italic">Connect</h4>
              <ul className="space-y-6">
                <li><a href="https://wa.me/254752032884" className="text-xl text-primary/70 hover:text-secondary font-black transition-colors italic">WhatsApp Support</a></li>
                <li><a href="#" className="text-xl text-primary/70 hover:text-secondary font-black transition-colors italic">Join Community</a></li>
                <li><a href="mailto:stanlleylocke@gmail.com" className="text-xl text-primary/70 hover:text-secondary font-black transition-colors italic">stanlleylocke@gmail.com</a></li>
                <li><Link href="/contact" className="text-xl text-secondary font-black hover:underline underline-offset-8 italic">Message Stanlley</Link></li>
              </ul>
            </div>

            {/* Mission Section */}
            <div className="space-y-12">
              <h4 className="text-xs font-black uppercase tracking-[0.6em] text-secondary italic">Mission</h4>
              <p className="text-xl text-muted-foreground font-black italic leading-relaxed">
                "Developers learn best by building. We focus on creating deployable solutions, not just code in a vacuum."
              </p>
            </div>
          </div>

          <div className="pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">
              © 2026 StanlleyHub Education Platform. Engineering Excellence.
            </p>
            <div className="flex gap-12">
              <a href="#" className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors italic">Privacy Policy</a>
              <a href="#" className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors italic">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </PublicLayout>
  );
}
