import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, Code, Server, Brain, Cpu, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-800/50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                Engineered for <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                A 3-Month Software Engineering Bootcamp in Kenya. Structured, demanding, and deeply practical. 
                Build real-world skills and launch your career in tech.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-medium">
                  <Link href="/register">Apply Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-medium">
                  <Link href="/courses">View Curriculum</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Info Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-primary-foreground/80 font-medium">Months Duration</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">May</div>
              <div className="text-primary-foreground/80 font-medium">Next Cohort</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">800</div>
              <div className="text-primary-foreground/80 font-medium">Ksh Commitment</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80 font-medium">Practical</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Curriculum</h2>
            <p className="text-muted-foreground text-lg">Master the modern tech stack with our intensive tracks designed for market readiness.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Web Development", desc: "React, Node.js, TypeScript. Full-stack engineering from the ground up." },
              { icon: Server, title: "Python Engineering", desc: "Advanced Python, Django, Fast API, data structures, and algorithms." },
              { icon: Brain, title: "AI & Machine Learning", desc: "Neural networks, NLP, computer vision, and predictive modeling." },
              { icon: Cpu, title: "DevOps & Cloud", desc: "Docker, Kubernetes, AWS, CI/CD pipelines, and infrastructure as code." },
            ].map((track, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-xl border hover:border-primary/50 transition-colors"
              >
                <track.icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{track.title}</h3>
                <p className="text-muted-foreground">{track.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/CTA */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl border p-8 md:p-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join the May-July cohort. Secure your spot with a minimal commitment fee.
              </p>
              <ul className="space-y-3 mb-8">
                {['Intensive 12-week program', 'Expert mentorship from Stanlley Locke', 'Real-world project portfolio', 'Career guidance & placement support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="h-12 px-8 w-full md:w-auto">
                <Link href="/register">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="w-full md:w-auto bg-primary text-primary-foreground rounded-2xl p-8 text-center flex-shrink-0">
              <div className="text-sm font-medium uppercase tracking-wider mb-2 opacity-90">Commitment Fee</div>
              <div className="text-5xl font-bold mb-2">800<span className="text-2xl font-normal opacity-80"> Ksh</span></div>
              <div className="text-sm opacity-80 mt-4 pt-4 border-t border-primary-foreground/20">
                Via M-Pesa
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
