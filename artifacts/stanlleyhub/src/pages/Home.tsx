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

      {/* Clean Premium Cohort Section */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00215E_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-4 relative text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">Cohort Engineering Registry</h2>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Status Card */}
            <div className="group bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Schedule</span>
              </div>
              <Calendar className="h-12 w-12 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 font-bold">Duration</h3>
              <p className="text-4xl font-bold text-primary tracking-tight">May — July</p>
              <div className="mt-10 pt-10 border-t border-black/5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">Enrolling</span>
              </div>
            </div>

            {/* Investment Card */}
            <div className="group bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <ShieldCheck className="h-6 w-6 text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Secure</span>
              </div>
              <ShieldCheck className="h-12 w-12 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 font-bold">Investment</h3>
              <p className="text-4xl font-bold text-primary tracking-tight">800 Ksh</p>
              <p className="text-xs font-medium text-muted-foreground mt-4 leading-relaxed font-bold">Secure your seat in the engineering intensive.</p>
            </div>

            {/* Methodology Card */}
            <div className="group bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div className="flex items-center justify-between mb-10">
                <Zap className="h-6 w-6 text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Labs</span>
              </div>
              <Zap className="h-12 w-12 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 font-bold">Approach</h3>
              <p className="text-4xl font-bold text-primary tracking-tight">100% Practical</p>
              <div className="mt-10 flex flex-wrap gap-2">
                {["Labs", "Projects", "Deploy"].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-4 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-primary uppercase tracking-tighter">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Mentor - Clean White Redesign */}
      <section id="mentor" className="py-40 bg-[#FAFAFA] border-y border-black/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <div>
                <div className="h-1.5 w-12 bg-secondary mb-8 rounded-full" />
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary mb-4">Lead Engineer</h2>
                <h3 className="text-5xl lg:text-7xl font-bold text-primary tracking-tighter leading-tight italic">Stanlley Locke</h3>
              </div>
              
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed font-medium max-w-xl">
                <p>
                  Specializing in <span className="font-bold text-primary">production-grade architecture</span>, developer tooling, and custom AI frameworks.
                </p>
                <p>
                  I bridge the gap between abstract academic theory and <span className="font-bold text-primary">deployable engineering solutions</span> that scale.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { icon: Terminal, title: "Senior Dev", desc: "Flask, Node.js, React, Flutter & DevOps" },
                  { icon: Brain, title: "AI Builder", desc: "Neural frameworks & GPU pipelines" }
                ].map((skill, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-black/5">
                      <skill.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1 uppercase tracking-widest text-[10px] tracking-[0.2em]">{skill.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{skill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-10 bg-primary hover:bg-primary/95 text-white font-bold h-16 shadow-2xl shadow-primary/20 transition-all active:scale-95">
                  <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank">LinkedIn Profile</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-10 border-primary/20 hover:bg-primary/[0.02] font-bold h-16 transition-all active:scale-95">
                  <Link href="/resume.pdf" target="_blank">Download Resume</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white border border-black/5 rounded-[3rem] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-12 border-b border-black/5 pb-8">Featured Engineering Artifacts</h4>
              <div className="space-y-12">
                {[
                  { title: "StanleyHub", desc: "Enterprise learning ecosystems with realtime Socket.IO integration and scalable SQLite architecture." },
                  { title: "NeuralNetV2", desc: "Sophisticated neural training framework supporting GPU-accelerated reproducible experiments." },
                  { title: "Coinium", desc: "Realtime blockchain simulation engine with integrated Telegram automation." },
                ].map((project, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors tracking-tight italic">{project.title}</h5>
                      <div className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <ExternalLink className="h-4 w-4 text-secondary" />
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-medium text-base">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Stack - Clean Redesign */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.4em] text-secondary mb-6 italic">Engineering tracks</h2>
            <h3 className="text-5xl font-bold mb-8 tracking-tighter text-primary">The 100% Practical Stack</h3>
            <p className="text-xl text-muted-foreground font-medium">We don't teach "tutorials." We build production-ready systems using the industry's most in-demand tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Web Engineering", desc: "Building scalable frontends and high-performance Node.js backends." },
              { icon: Server, title: "Python/Backend", desc: "Mastering OOP, Flask, Django, and modern API architecture." },
              { icon: Brain, title: "Agentic AI", desc: "Training LLMs and building custom agentic AI pipelines." },
              { icon: Cpu, title: "DevOps & Cloud", desc: "Docker orchestration, server automation, and CI/CD mastery." },
            ].map((track, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-[#FDFDFD] p-10 rounded-[2.5rem] border border-black/5 hover:border-secondary/20 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
              >
                <div className="h-16 w-16 bg-primary/5 rounded-[1.25rem] flex items-center justify-center mb-10 transition-colors group-hover:bg-secondary/10">
                  <track.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary tracking-tight">{track.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-medium">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="connect" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 transform translate-x-1/2" />
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                Seats are filling up fast. <br />
                <span className="text-secondary">Join the May Cohort Today.</span>
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl">
                Ready to stop watching tutorials and start building systems? Pay the 800 Ksh one-time registration commitment fee and secure your future.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button asChild size="lg" className="h-14 px-10 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="/register">Get Started Now</Link>
                </Button>
                <div className="flex items-center gap-4 text-secondary-foreground font-medium">
                  <a href="https://wa.me/254752032884" target="_blank" className="hover:underline flex items-center gap-2">
                    <ArrowRight className="h-5 w-5" /> WhatsApp Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
