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
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#00215E10,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_50%,#005C9710,transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1 text-sm font-semibold tracking-wider uppercase">
                💻 Software Bootcamp May - July
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
                Master the Skills that <span className="text-secondary">Actually Matter.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                100% Practical. Zero Fluff. Join a 3-month engineering intensive designed to bridge the gap between academic theory and real-world application.
              </p>
              
              <div className="flex flex-wrap gap-4 overflow-hidden">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-secondary/20">
                  <Link href="/register">Apply Now (800 Ksh)</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-medium border-primary/20 hover:bg-primary/5">
                  <a href="https://chat.whatsapp.com/Fp8zcgyPcQPEeqqAOqaxe2" target="_blank">
                    <MessageSquare className="mr-2 h-5 w-5 text-secondary" />
                    Join WhatsApp Channel
                  </a>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-secondary" /> Certification</span>
                <span className="flex items-center gap-2"><Zap className="h-5 w-5 text-secondary" /> 100% Practical</span>
                <span className="flex items-center gap-2"><Layers className="h-5 w-5 text-secondary" /> Portfolio-Ready</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-[2rem] blur-2xl opacity-10 animate-pulse" />
              <div className="relative bg-card border rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="mx-auto text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1">
                    <Terminal className="h-3 w-3" /> StanlleyHub Engine v2.0
                  </div>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-nowrap lg:whitespace-normal">
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
                      this.approach = "100%_Practical";
                      <br />
                      this.goal = "Build_Real_World_Apps";
                    </div>
                    <div className="text-foreground">{'}'}</div>
                  </div>
                  <div className="pl-6 mt-4">
                    <span className="text-accent">deploy</span>
                    <span className="text-foreground">() {'{'}</span>
                    <div className="pl-6 text-secondary">return "Ready for Industry 🚀";</div>
                    <span className="text-foreground">{'}'}</span>
                  </div>
                  <div className="text-foreground mt-4">{'}'}</div>
                </div>
              </div>
              
              {/* Floating Tech Badges */}
              <div className="absolute -top-6 -right-6 h-20 w-20 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm shadow-xl animate-bounce">
                Python
              </div>
              <div className="absolute -bottom-6 -left-6 h-16 w-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xl rotate-12">
                React
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Your Mentor Section */}
      <section id="mentor" className="py-24 bg-card relative overflow-hidden border-y">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-primary text-primary-foreground">Your Lead Engineer</Badge>
              <h2 className="text-4xl font-bold mb-6">Stanlley Locke</h2>
              <p className="text-xl text-primary font-medium mb-6">
                Full-Stack Software Engineer · Systems Architect · AI & Web Platform Builder
              </p>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
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
