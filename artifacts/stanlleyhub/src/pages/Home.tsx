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
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#00215E08,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_50%,#005C9708,transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 bg-secondary/5 text-secondary border border-secondary/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                <Monitor className="h-3.5 w-3.5" /> Software Engineering Bootcamp
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.05]">
                Master the Skills that <span className="text-secondary">Actually Matter.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                100% Practical. Zero Fluff. A 3-month engineering intensive designed to bridge the gap between academic theory and real-world application.
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

      {/* Cohort Highlights - Organized Section */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center items-center">
            <div className="space-y-2">
              <Calendar className="h-8 w-8 mx-auto text-secondary mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Duration</h3>
              <p className="text-2xl font-bold">May - July 2024</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x py-8 md:py-0">
              <ShieldCheck className="h-8 w-8 mx-auto text-secondary mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Investment</h3>
              <p className="text-2xl font-bold">800 Ksh Commitment</p>
            </div>
            <div className="space-y-2">
              <Zap className="h-8 w-8 mx-auto text-secondary mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Methodology</h3>
              <p className="text-2xl font-bold">100% Practical Labs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Mentor Section */}
      <section id="mentor" className="py-32 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-6">The Lead Engineer</h2>
              <h3 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Stanlley Locke</h3>
              <p className="text-xl text-primary font-medium mb-8 leading-relaxed">
                Full-Stack Software Engineer · Systems Architect · AI & Web Platform Builder
              </p>
              <div className="space-y-8 text-muted-foreground leading-relaxed text-lg">
                <p>
                  I build production-grade web platforms, developer tooling, and embedded systems — not demos. My work focuses on reliable architecture, reproducible ML pipelines, and solutions that scale.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div>
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                       <Code className="h-4 w-4 text-secondary" /> Senior Dev
                    </h4>
                    <p className="text-sm">Flask, FastAPI, Node.js, React, Flutter, and Docker.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                       <Brain className="h-4 w-4 text-secondary" /> AI Builder
                    </h4>
                    <p className="text-sm">Custom NN frameworks, dataset pipelines, and GPU tuning.</p>
                  </div>
                </div>
                
                <div className="pt-8 flex flex-wrap gap-4">
                  <Button variant="default" className="bg-primary hover:bg-primary/90" asChild>
                    <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank">View LinkedIn</a>
                  </Button>
                  <Button variant="outline" className="border-primary/20 flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download Resume
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Selected Engineering Artifacts</div>
              {[
                { title: "StanleyHub", desc: "Learning platform with modular content, Socket.IO realtime, and SQLite.", link: "https://github.com/stanlley-locke/stanlleyhub" },
                { title: "NeuralNetV2", desc: "Custom neural-network training framework with GPU support.", link: "https://github.com/stanlley-locke/neuralnetv2" },
                { title: "Coinium", desc: "Blockchain simulator and Telegram bot implementation.", link: "https://github.com/stanlley-locke/coinium" },
              ].map((project, i) => (
                <a 
                  key={i} 
                  href={project.link} 
                  target="_blank"
                  className="group block p-6 bg-background rounded-xl border border-border/50 hover:border-secondary transition-all hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-2 font-bold text-lg group-hover:text-secondary transition-colors">
                    {project.title}
                    <Github className="h-5 w-5 opacity-50 group-hover:opacity-100" />
                  </div>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Core Stack */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">The 100% Practical Stack</h2>
            <p className="text-xl text-muted-foreground">We don't teach "tutorials." we build production-ready systems using the industry's most in-demand tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Web Engineering", desc: "HTML5/CSS3, JS Frameworks (React, Next.js) & Node.js ecosystem." },
              { icon: Server, title: "Python Masterclass", desc: "Python OOP, Flask, Django, SQLAlchemy, and Backend Architecture." },
              { icon: Brain, title: "Agentic AI", desc: "LLMs, Neural Networks, Agentic AI, and Machine Learning Pipelines." },
              { icon: Cpu, title: "Systems & DevOps", desc: "Linux, Docker, Server Deployment, Nginx, and PM2 automation." },
            ].map((track, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border border-border/50 hover:border-secondary/30 transition-all shadow-sm"
              >
                <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-8">
                  <track.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{track.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{track.desc}</p>
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
