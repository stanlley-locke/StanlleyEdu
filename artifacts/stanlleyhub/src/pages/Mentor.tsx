import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { 
  Terminal, 
  Brain, 
  Cpu, 
  Linkedin, 
  Github, 
  ExternalLink,
  Award,
  Layers,
  Code,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ARTIFACTS = [
  {
    title: "StanleyHub",
    desc: "Enterprise learning ecosystems with realtime Socket.IO integration and scalable SQLite architecture. Designed for handling intensive student data and concurrent learning paths.",
    tags: ["Node.js", "Socket.IO", "SQLite", "Drizzle"],
    category: "Learning Infrastructure"
  },
  {
    title: "NeuralNetV2",
    desc: "Sophisticated neural training framework supporting GPU-accelerated reproducible experiments. A tool for deep learning researchers to prototype high-performance architectures.",
    tags: ["Python", "PyTorch", "GPU", "CUDA"],
    category: "AI & Machine Learning"
  },
  {
    title: "Coinium",
    desc: "Realtime blockchain simulation engine with integrated Telegram automation. Providing a sandbox for testing decentralized logic and automated trading workflows.",
    tags: ["Blockchain", "Telegram API", "Web3"],
    category: "FinTech Systems"
  }
];

const PHILOSOPHY = [
  {
    icon: Zap,
    title: "Practical First",
    desc: "Academic theory alone is insufficient. We focus on building deployable code from day one."
  },
  {
    icon: Layers,
    title: "Architecture Mastery",
    desc: "Coding is easy; engineering is hard. We teach the structural integrity behind scalable systems."
  },
  {
    icon: Award,
    title: "Precision Engineering",
    desc: "Production environments are unforgiving. We aim for zero-bug, high-performance delivery."
  }
];

export default function Mentor() {
  return (
    <PublicLayout>
      {/* Mentor Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-10"
            >
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em]">Lead Architect</span>
                <h1 className="text-7xl lg:text-9xl font-black text-primary tracking-tighter leading-none">
                  Stanlley <br/>
                  <span className="text-secondary italic">Locke.</span>
                </h1>
              </div>

              <div className="space-y-8 max-w-xl">
                <p className="text-2xl lg:text-3xl text-muted-foreground font-bold tracking-tight leading-tight">
                  Building the systems that bridge the gap between <span className="text-primary italic">academic theory</span> and <span className="text-primary italic">industry demand.</span>
                </p>
                <p className="text-lg text-muted-foreground/80 font-medium leading-relaxed">
                  With years of specialization in production-grade architecture, I lead the intensive labs at StanlleyHub to transform developers into architects.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-12 bg-primary hover:bg-primary/95 text-white font-black h-20 shadow-2xl shadow-primary/20 transition-all hover:scale-105 uppercase tracking-widest">
                  <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-3 h-5 w-5" /> LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-primary/20 hover:bg-primary/[0.04] text-primary font-black h-20 transition-all hover:scale-105 uppercase tracking-widest">
                  <a href="https://github.com/stanlley-locke" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-3 h-5 w-5" /> GitHub
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Visual Representation Placeholder */}
                <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3" />
                <div className="absolute inset-0 bg-secondary/10 rounded-[4rem] -rotate-3" />
                <div className="absolute inset-0 bg-white border border-primary/10 rounded-[4rem] flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                   {/* This would be the actual image in production */}
                   <div className="text-center space-y-6">
                     <Award className="h-40 w-40 text-secondary/30 mx-auto" />
                     <p className="text-primary font-black uppercase tracking-[0.4em] text-xs">Stanlley Locke Architecture</p>
                   </div>
                   <img 
                    src="/hero_background.jpg" 
                    alt="Stanlley Locke" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/hero_background.jpg')] bg-cover bg-fixed grayscale mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <span className="text-xs font-black uppercase tracking-[0.8em] text-secondary mb-8 block">Architect's Philosopy</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-10 leading-none">Practical Intelligence.</h2>
            <p className="text-xl text-white/70 font-bold max-w-2xl mx-auto leading-relaxed">
              We eliminate the fluff found in traditional education. Our goal is to build engineers who can ship production-grade systems in record time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all duration-500"
              >
                <div className="h-20 w-20 rounded-[2rem] bg-secondary/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-white/60 font-bold leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artifacts Showcase */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.6em] text-secondary mb-8 block font-sans">Portfolio of Work</span>
              <h2 className="text-6xl lg:text-8xl font-black text-primary tracking-tighter leading-none mb-8">Engineering Artifacts.</h2>
              <p className="text-xl text-muted-foreground font-bold leading-tight">
                Experimental frameworks, enterprise tools, and deep-learning infrastructure built to push the limits of modern software.
              </p>
            </div>
            <Button variant="outline" className="rounded-full h-16 px-10 border-black/10 font-bold uppercase tracking-widest hover:bg-black/5 transition-all">
              <a href="https://github.com/stanlley-locke" target="_blank" rel="noopener noreferrer">Explore Source Code</a>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {ARTIFACTS.map((artifact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-full bg-[#FAFAFA] border border-black/10 rounded-[3rem] p-12 hover:border-secondary transition-all duration-500 shadow-sm overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[60px] group-hover:bg-secondary/20 transition-all" />
                
                <div className="space-y-8 relative z-10">
                  <span className="inline-block px-3 py-1 bg-primary/5 rounded-full text-[9px] font-black uppercase text-primary/40 tracking-widest">{artifact.category}</span>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-black text-primary tracking-tighter group-hover:text-secondary transition-colors">{artifact.title}</h4>
                    <p className="text-muted-foreground leading-relaxed font-bold text-lg">{artifact.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {artifact.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black px-4 py-2 bg-white border border-black/5 rounded-full uppercase text-primary/60 tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Stack / CTA */}
      <section className="py-40 bg-[#FAFAFA] border-y border-black/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Left: Engagement Details */}
            <div className="space-y-16">
              <div className="space-y-8">
                <span className="text-xs font-black uppercase tracking-[0.5em] text-secondary block">Leadership Journey</span>
                <h2 className="text-6xl lg:text-7xl font-black text-primary tracking-tighter leading-tight">Mastering the Tools <br/>of the Trade.</h2>
                <p className="text-xl text-muted-foreground font-bold leading-relaxed max-w-xl italic border-l-4 border-secondary pl-8">
                  "It's not about the programming language; it's about the ability to solve complex problems using the most efficient architectural patterns."
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Code, title: "Backend Systems", desc: "Expertise in Python, Node.js, and optimized SQL/NoSQL architectures." },
                  { icon: Brain, title: "AI Integration", desc: "Building agentic systems and neural pipes using PyTorch and CUDA." },
                  { icon: Terminal, title: "DevOps / Infra", desc: "Docker, Kubernetes, and automated CI/CD pipelines for zero-downtime shipping." },
                  { icon: Cpu, title: "Low-Level Systems", desc: "Working with memory efficiency and high-performance computing frameworks." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm flex flex-col items-start">
                    <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-black text-primary uppercase tracking-widest text-[10px] mb-2">{item.title}</h5>
                      <p className="text-sm text-muted-foreground font-bold leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA Card */}
            <div className="bg-white p-12 lg:p-20 rounded-[4rem] border border-black/10 shadow-2xl relative overflow-hidden group min-h-[600px] flex flex-col justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px]" />
               <div className="relative z-10 space-y-12">
                 <div className="space-y-6">
                   <h3 className="text-5xl lg:text-6xl font-black tracking-tighter text-primary leading-none">Ready to Bridge <br/>the Gap?</h3>
                   <p className="text-muted-foreground font-bold text-xl leading-relaxed">Join my next cohort and learn to build production-grade software that matters.</p>
                 </div>
                 <Button asChild size="lg" className="w-full h-24 rounded-[2rem] bg-primary text-white text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <a href="/register">Secure Your Seat</a>
                 </Button>
                 <div className="flex items-center gap-12 pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-black text-secondary tracking-tighter">800 Ksh</p>
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Commitment</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary tracking-tighter">3 Months</p>
                      <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Intensive</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
