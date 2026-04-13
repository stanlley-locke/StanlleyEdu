import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { 
  MessageCircle, 
  Send, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ShieldCheck,
  Zap,
  ChevronDown,
  Globe,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CONTACT_CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    value: "+254 752 032 884",
    link: "https://wa.me/254752032884",
    color: "bg-[#25D366]/10 text-[#25D366]"
  },
  {
    icon: Send,
    title: "Telegram Channel",
    value: "Join @xnetcore",
    link: "https://t.me/xnetcore",
    color: "bg-[#0088CC]/10 text-[#0088CC]"
  },
  {
    icon: Linkedin,
    title: "Professional Network",
    value: "Stanlley Locke",
    link: "https://linkedin.com/in/stanlley-locke-6ba090380",
    color: "bg-[#0077B5]/10 text-[#0077B5]"
  },
  {
    icon: Mail,
    title: "Direct Inquiry",
    value: "stanlleylocke@gmail.com",
    link: "mailto:stanlleylocke@gmail.com",
    color: "bg-primary/10 text-primary"
  }
];

const FAQS = [
  {
    question: "Is this bootcamp suitable for absolute beginners?",
    answer: "While we welcome passion, our Engineering Intensives are categorized by level. Our 'Core Projects' tracks are perfect for beginners, while 'System Architect' tracks require some prior foundational knowledge."
  },
  {
    question: "What does '100% Practical' actually mean?",
    answer: "It means zero long lectures. You get a problem statement and an architectural goal, and you build the solution with mentor guidance. Every piece of code you write is aimed at production readiness."
  },
  {
    question: "How do I secure my seat after paying the commitment fee?",
    answer: "Once you pay the 800 Ksh fee and paste your M-Pesa transaction code in the registration portal, our lead architects will verify it and add you to the active cohort registry within 24 hours."
  },
  {
    question: "Are the certificates industry-recognized?",
    answer: "Our certificates verify that you have successfully deployed a production-grade system and handled real-world architectural challenges. Our focus is on building a portfolio that proves your skills to any hiring manager."
  }
];

export default function Connect() {
  return (
    <PublicLayout>
      {/* Connect Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em]">Direct Integration</span>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-primary tracking-tighter leading-none">
                Connect <br/>
                <span className="text-secondary italic">Architects.</span>
              </h1>
              <p className="text-2xl text-muted-foreground font-bold tracking-tight max-w-2xl mx-auto leading-tight pt-6">
                Have technical queries or enrollment questions? Reach out directly to the hub for instant engineering support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Support Portal */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24">
            {/* Left: Communication Channels */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Communication Hub.</h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Join our vibrant developer community or message Stanlley directly for mentorship and platform support.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 items-stretch">
                {CONTACT_CHANNELS.map((channel, i) => (
                  <motion.a
                    key={i}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2.5rem] bg-[#FAFAFA] border border-black/5 hover:border-secondary transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${channel.color} mb-8 shrink-0`}>
                      <channel.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{channel.title}</h3>
                      <p className="text-xl font-bold text-primary tracking-tight group-hover:text-secondary transition-colors break-words">{channel.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Status Indicator */}
              <div className="p-10 rounded-[3rem] bg-primary text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 blur-[60px]" />
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Current Status: High Response</span>
                  </div>
                  <h4 className="text-2xl font-black tracking-tighter">Live Engineering Community</h4>
                  <div className="flex items-center gap-4 pt-4">
                    <Users className="h-6 w-6 text-secondary" />
                    <p className="text-sm font-bold text-white/80">Collaborate with +1,200 active engineers globally.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Query Form */}
            <div className="bg-[#FAFAFA] border border-black/10 p-12 lg:p-16 rounded-[4rem] shadow-sm">
              <div className="space-y-8 mb-12 text-center lg:text-left">
                <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Send a Query.</h2>
                <p className="text-muted-foreground font-bold">Expect a detailed architect response within 24 business hours.</p>
              </div>

              <form className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Your Name</label>
                  <Input placeholder="Engineering Lead" className="h-16 border-black/10 rounded-2xl px-6 bg-white" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Email Identity</label>
                  <Input type="email" placeholder="professional@email.com" className="h-16 border-black/10 rounded-2xl px-6 bg-white" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Subject</label>
                  <Input placeholder="Enrollment / Partnership / Bug" className="h-16 border-black/10 rounded-2xl px-6 bg-white" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Brief / Query</label>
                  <Textarea placeholder="Share your technical context..." className="h-40 border-black/10 rounded-2xl p-6 bg-white resize-none" />
                </div>
                <div className="pt-6">
                  <Button className="w-full h-24 rounded-[2.5rem] bg-primary text-white text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Dispatch Query <Zap className="ml-3 h-6 w-6 text-secondary" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 bg-[#FAFAFA] border-y border-black/5 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-24 flex flex-col items-center">
            <span className="text-xs font-black uppercase tracking-[0.6em] text-secondary mb-8 block font-sans">Common Architect Queries</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary tracking-tighter mb-8 leading-none">The F.A.Q.</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-6">
            {FAQS.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="bg-white border border-black/10 rounded-[2rem] px-8 overflow-hidden group data-[state=open]:border-secondary transition-all duration-500"
              >
                <AccordionTrigger className="text-xl lg:text-2xl font-black text-primary tracking-tighter text-left py-8 group-hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground font-bold leading-relaxed pb-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </PublicLayout>
  );
}
