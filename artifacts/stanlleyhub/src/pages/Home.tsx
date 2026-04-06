import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Terminal, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  Code, 
  Server, 
  Brain, 
  Cpu, 
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Full-screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_background.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          {/* High-quality overlay for content readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Software Bootcamp May - July</span>
              </div>
              
              <h1 className="text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85]">
                Master Skills <br/>
                <span className="text-secondary">That Matter.</span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-white/70 font-bold max-w-2xl leading-tight tracking-tight">
                A 3-month engineering intensive designed to bridge the gap between academic theory and real-world application.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <Button asChild size="lg" className="rounded-full px-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black h-20 text-lg shadow-2xl shadow-secondary/20 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                  <Link href="/register">Apply Now — 800 Ksh</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-white/20 hover:bg-white/10 text-white font-black h-20 text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                  <a href="https://chat.whatsapp.com/Fp8zcgyPcQPEeqqAOqaxe2" target="_blank" rel="noopener noreferrer">Join WhatsApp Channel</a>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-20 border-t border-white/10">
                {[
                  { label: "Duration", val: "May - July" },
                  { label: "Commitment", val: "800 Ksh" },
                  { label: "Methodology", val: "100% Practical" },
                  { label: "Format", val: "Hybrid Labs" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <span className="block text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">{stat.label}</span>
                    <span className="block text-xl font-bold text-white uppercase tracking-tighter">{stat.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ongoing Cohort Section - Clean White Premium */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00215E_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
            {/* Left: Registry Details */}
            <div className="lg:w-1/2 space-y-16">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-4">Ongoing Cohort</span>
                <h2 className="text-7xl lg:text-9xl font-bold text-primary tracking-tighter leading-none mb-8">
                  Engineering <br/>Registry.
                </h2>
                <p className="text-2xl text-muted-foreground font-bold leading-tight max-w-xl">
                  Secure your seat in the May Engineering Intensive. Limited slots for production-grade training.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="bg-[#F8F9FA] p-10 rounded-[3rem] border border-black/5 space-y-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-primary tracking-widest">Cohort Alpha Journey</span>
                    <p className="text-3xl font-bold text-primary">Registration Phase</p>
                  </div>
                  <span className="text-4xl font-black text-secondary">35%</span>
                </div>
                <div className="h-4 w-full bg-black/5 rounded-full overflow-hidden">
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
                    <span className="text-sm font-bold text-primary text-nowrap">Systems Foundation</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-muted-foreground mb-1">Current Focus</span>
                    <span className="text-sm font-bold text-secondary text-nowrap">High-Level Architectures</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild size="lg" className="rounded-full px-10 bg-primary hover:bg-primary/95 text-white font-bold h-16 shadow-xl shadow-primary/20">
                  <Link href="/register">View Registry</Link>
                </Button>
                <div className="flex -space-x-4 items-center pl-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                  <span className="pl-4 text-xs font-bold text-muted-foreground tracking-widest">+12 New Engineers</span>
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
                  <p className="text-2xl font-bold text-primary mb-4 tracking-tight text-nowrap">Practical Engineering Lab</p>
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
                  { id: "dev", icon: Terminal, title: "Senior Dev", desc: "Flask, Node.js, React, & DevOps" },
                  { id: "ai", icon: Brain, title: "AI Builder", desc: "Custom Neural pipes & GPU tuning" }
                ].map((skill) => (
                  <div key={skill.id} className="space-y-4">
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
                  <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-primary/20 hover:bg-primary/[0.04] font-black h-20 transition-all hover:scale-105 uppercase tracking-widest">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
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
            <h2 className="text-7xl lg:text-9xl font-bold mb-10 tracking-tighter text-primary text-nowrap">Practical Stack.</h2>
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
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-20 border-primary/20 hover:bg-primary/[0.04] text-primary font-black h-24 text-xl transition-all hover:scale-110 active:scale-95 uppercase tracking-widest">
                <a href="https://wa.me/254752032884" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
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
    </PublicLayout>
  );
}
