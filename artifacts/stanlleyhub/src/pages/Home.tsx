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

      {/* Ongoing Cohort Section - Enhanced Features */}
      <section className="relative min-h-screen flex flex-col justify-center py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00215E_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left: Content & Progress */}
            <div className="lg:w-1/2 space-y-12 text-left">
              <div>
                <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Current Status</span>
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-primary leading-tight">
                  Ongoing Cohort: <br/>Engineering Alpha
                </h2>
              </div>
              
              <div className="space-y-8 bg-[#F8FAFC] border border-black/5 p-10 rounded-[2.5rem]">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">Cohort Progress</span>
                  <span className="text-2xl font-black text-secondary">35%</span>
                </div>
                <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "35%" }}
                    viewport={{ once: true }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <span className="block text-[10px] font-black uppercase text-muted-foreground mb-1">Phase 01</span>
                    <span className="text-sm font-bold text-primary">Systems Foundation</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-muted-foreground mb-1">Current Focus</span>
                    <span className="text-sm font-bold text-secondary">High-Level Architectures</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild size="lg" className="rounded-full px-10 bg-primary hover:bg-primary/95 text-white font-bold h-16 shadow-xl shadow-primary/20">
                  <Link href="/apply">View Registry</Link>
                </Button>
                <div className="flex -space-x-4 items-center pl-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                  <span className="pl-8 text-xs font-bold text-muted-foreground tracking-widest">+12 New Engineers</span>
                </div>
              </div>
            </div>

            {/* Right: Feature Cards */}
            <div className="lg:w-1/2 grid sm:grid-cols-2 gap-8">
              {/* Schedule */}
              <div className="group bg-white border border-black/10 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500">
                <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-3">Schedule</h3>
                <p className="text-3xl font-bold text-primary tracking-tight">May — July</p>
                <div className="mt-8 pt-8 border-t border-black/5">
                  <span className="text-[10px] font-black uppercase text-muted-foreground">Intensity: 100% Practical</span>
                </div>
              </div>

              {/* Investment */}
              <div className="group bg-white border border-black/10 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8">
                  <ShieldCheck className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-3">Investment</h3>
                <p className="text-3xl font-bold text-primary tracking-tight">800 Ksh</p>
                <p className="text-[11px] font-bold text-muted-foreground mt-4 leading-relaxed line-clamp-2">One-time registration commitment fee.</p>
              </div>

              {/* Approach */}
              <div className="sm:col-span-2 group bg-white border border-black/10 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex items-center gap-10">
                <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-2">Methodology</h3>
                  <p className="text-2xl font-bold text-primary mb-4 tracking-tight">Practical Engineering Lab</p>
                  <div className="flex gap-3">
                    {["Labs", "Deploy", "Scale", "Auth"].map(tag => (
                      <span key={tag} className="text-[9px] font-black px-3 py-1 bg-black/5 rounded-full uppercase text-muted-foreground tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Mentor - Refined Standout Section */}
      <section id="mentor" className="relative min-h-screen flex flex-col justify-center py-40 bg-[#FAFAFA] border-y border-black/5 overflow-hidden">
        <div className="container mx-auto px-4 relative max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <div className="relative">
                <div className="h-2 w-20 bg-secondary mb-10 rounded-full" />
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-secondary mb-6">Lead Architect</h2>
                <h3 className="text-6xl lg:text-8xl font-bold text-primary tracking-tighter leading-tight">Stanlley Locke</h3>
                <div className="flex flex-wrap gap-3 pt-6">
                  {["System Architect", "Full-Stack Engineer", "AI Builder"].map(role => (
                    <span key={role} className="px-4 py-1 border border-primary/10 rounded-full text-[10px] font-black uppercase text-primary/60 tracking-widest bg-white">{role}</span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-10 text-2xl text-muted-foreground leading-relaxed font-semibold max-w-xl">
                <p>
                  Specializing in <span className="text-primary decoration-secondary/30">production-grade architecture</span>, developer tooling, and custom AI frameworks.
                </p>
                <p>
                  I bridge the gap between academic theory and <span className="text-primary decoration-secondary/30">deployable engineering solutions</span> that scale.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10 bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm">
                {[
                  { icon: Terminal, title: "Senior Dev", desc: "Flask, Node.js, React, & DevOps" },
                  { icon: Brain, title: "AI Builder", desc: "Custom Neural pipes & GPU tuning" }
                ].map((skill, i) => (
                  <div key={ SkillSelection_Skill_title_at_i } className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center border border-black/5">
                      <skill.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h4 className="font-black text-primary uppercase tracking-widest text-xs">{skill.title}</h4>
                    <p className="text-sm text-muted-foreground font-bold leading-snug">{skill.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button asChild size="lg" className="rounded-full px-12 bg-primary hover:bg-primary/95 text-white font-black h-20 shadow-2xl shadow-primary/30 transition-all hover:scale-105 uppercase tracking-widest">
                  <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank">LinkedIn Profile</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-primary/20 hover:bg-primary/[0.04] font-black h-20 transition-all hover:scale-105 uppercase tracking-widest">
                  <Link href="/resume.pdf" target="_blank">Download Resume</Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-8">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-10 block text-center lg:text-left">Engineering Artifacts</span>
              {[
                { title: "StanleyHub", desc: "Enterprise learning ecosystems with realtime Socket.IO integration and scalable SQLite architecture.", tags: ["Node.js", "Socket.IO", "SQLite"] },
                { title: "NeuralNetV2", desc: "Sophisticated neural training framework supporting GPU-accelerated reproducible experiments.", tags: ["Python", "PyTorch", "GPU"] },
                { title: "Coinium", desc: "Realtime blockchain simulation engine with integrated Telegram automation.", tags: ["Blockchain", "Telegram API"] },
              ].map((project, i) => (
                <div 
                  key={i} 
                  className="group bg-white border border-black/10 rounded-[2.5rem] p-10 hover:border-secondary transition-all duration-500 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[60px] group-hover:bg-secondary/20 transition-all" />
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="text-3xl font-bold text-primary group-hover:text-secondary transition-colors tracking-tighter">{project.title}</h5>
                    <ExternalLink className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-bold text-lg mb-8">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black px-3 py-1 bg-primary/5 rounded-full uppercase text-primary/60 tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Core Stack - Standout Feature Section */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <span className="text-xs font-black uppercase tracking-[0.6em] text-secondary mb-8 block">Engineering Tracks</span>
            <h2 className="text-7xl lg:text-9xl font-bold mb-10 tracking-tighter text-primary">Practical Stack.</h2>
            <p className="text-2xl text-muted-foreground font-bold tracking-tight max-w-3xl mx-auto leading-relaxed">
              We don't teach "tutorials." We build <span className="text-primary">production-ready systems</span> using the industry's most in-demand tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Code, title: "Web Engineering", outcomes: ["Realtime Dashboards", "Modular APIs", "Auth Systems"], color: "bg-blue-50" },
              { icon: Server, title: "Python Masterclass", outcomes: ["Backend Systems", "Data Pipelines", "OOP Mastery"], color: "bg-green-50" },
              { icon: Brain, title: "Agentic AI", outcomes: ["Prompt Engineering", "Custom LLMs", "Neural Nets"], color: "bg-purple-50" },
              { icon: Cpu, title: "Cloud Ops", outcomes: ["Docker / K8s", "CI/CD Pipelines", "Linux Mastery"], color: "bg-orange-50" },
            ].map((track, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15, scale: 1.02 }}
                className="bg-white p-12 rounded-[3.5rem] border border-black/10 hover:border-secondary/30 transition-all duration-700 shadow-[0_15px_60px_rgba(0,0,0,0.02)] group flex flex-col items-center text-center"
              >
                <div className={`h-20 w-20 ${track.color} rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:rotate-12`}>
                  <track.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-10 text-primary tracking-tighter">{track.title}</h3>
                <div className="w-full space-y-4 pt-4 border-t border-black/5">
                  <span className="text-[10px] font-black uppercase text-secondary tracking-widest block mb-4">Learning Outcomes</span>
                  {track.outcomes.map(outcome => (
                    <div key={outcome} className="flex items-center gap-3 justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-secondary/50" />
                      <span className="text-sm font-bold text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA - Standout Design */}
      <section className="relative min-h-[90vh] flex flex-col justify-center py-40 border-y border-black/5 bg-[#FAFAFA] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#00215E_2px,transparent_2px)] [background-size:40px_40px]" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12 bg-white border border-black/10 p-16 lg:p-32 rounded-[5rem] shadow-[0_60px_120px_rgba(0,0,0,0.04)]"
          >
            <span className="text-xs font-black uppercase tracking-[0.8em] text-secondary mb-10 block">Final Enrollment Call</span>
            <h3 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-primary">
              Join the May Cohort Today.
            </h3>
            <p className="text-2xl lg:text-3xl text-muted-foreground font-bold max-w-4xl mx-auto leading-tight">
              Ready to stop watching tutorials and start building systems? Pay the <span className="text-primary">800 Ksh commitment fee</span> and secure your future.
            </p>
            <div className="pt-20 flex flex-col sm:flex-row gap-8 justify-center">
              <Button asChild size="lg" className="rounded-full px-20 bg-primary hover:bg-primary/95 text-white font-black h-24 text-xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all hover:scale-110 active:scale-95 uppercase tracking-widest">
                <Link href="/apply">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-20 border-primary/20 hover:bg-primary/[0.04] text-primary font-black h-24 text-xl transition-all hover:scale-110 active:scale-95 uppercase tracking-widest">
                <a href="https://wa.me/254752032884" target="_blank">WhatsApp Support</a>
              </Button>
            </div>
            <div className="pt-16 flex items-center justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-secondary"/> Secure Payment</span>
              <span className="flex items-center gap-3"><Zap className="h-4 w-4 text-secondary"/> Instant Access</span>
              <span className="flex items-center gap-3"><Download className="h-4 w-4 text-secondary"/> Certification</span>
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
