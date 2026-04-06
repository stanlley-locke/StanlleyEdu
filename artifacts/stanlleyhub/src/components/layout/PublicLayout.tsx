import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Send, 
  MessageCircle, 
  ChevronRight,
  Mail,
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { token, role, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Liquid Glass Floating Navbar */}
      <div className="fixed top-6 left-0 w-full z-50 px-4 pointer-events-none">
        <header className={`mx-auto max-w-7xl transition-all duration-500 pointer-events-auto rounded-[2rem] border border-white/20 ${
          isScrolled 
            ? "bg-background/40 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-2" 
            : "bg-white/10 backdrop-blur-[20px] py-4"
        }`}>
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
              <div className="h-10 w-10 relative overflow-hidden rounded-xl bg-white p-1 shadow-inner">
                <img 
                  src="/StanlleyHub_Education_logo.png" 
                  alt="Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:block">
                StanlleyHub <span className="text-secondary">Education</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <Link href="/courses" className="relative group py-2">
                <span className="text-sm font-semibold text-white group-hover:text-secondary transition-colors italic uppercase tracking-widest">Programs</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
              <Link href="/#mentor" className="relative group py-2">
                <span className="text-sm font-semibold text-white group-hover:text-secondary transition-colors italic uppercase tracking-widest">Mentor</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
              <Link href="/#connect" className="relative group py-2">
                <span className="text-sm font-semibold text-white group-hover:text-secondary transition-colors italic uppercase tracking-widest">Connect</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {token ? (
                <div className="flex items-center gap-4">
                  <Button asChild variant="ghost" size="sm" className="rounded-full px-5 hover:bg-white/10">
                    <Link href={role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}>Dashboard</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { logout(); setLocation('/'); }} className="rounded-full px-5 text-destructive border-destructive/20 hover:bg-destructive/10">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full px-5 hover:bg-white/10">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20 rounded-full px-6 font-bold tracking-wide">
                    <Link href="/register">Enroll Now</Link>
                  </Button>
                  <button 
                    className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu - Liquid Glass Style */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-[calc(100%+12px)] left-0 w-full bg-background/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 space-y-4 animate-in slide-in-from-top-4 duration-500 overflow-hidden shadow-2xl">
              <nav className="flex flex-col gap-2">
                <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-white/5 rounded-2xl transition-colors">Programs</Link>
                <Link href="/#mentor" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-white/5 rounded-2xl transition-colors">Mentor</Link>
                <Link href="/#connect" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-white/5 rounded-2xl transition-colors">Connect</Link>
              </nav>
            </div>
          )}
        </header>
      </div>

      <main className="flex-1">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 relative rounded-lg bg-white p-1">
                  <img src="/StanlleyHub_Education_logo.png" alt="Logo" className="object-contain h-full w-full" />
                </div>
                <span className="font-bold text-xl">StanlleyHub</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Democratizing high-level tech education through 100% practical, zero-fluff engineering training.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/stanlley-locke" target="_blank" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/stanlley-locke-6ba090380" target="_blank" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://t.me/xnetcore" target="_blank" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
                  <Send className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Programs</h4>
              <ul className="space-y-4">
                <li><Link href="/courses/full-stack" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><ChevronRight className="h-3 w-3" /> Full-Stack Web Dev</Link></li>
                <li><Link href="/courses/ai-ml" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><ChevronRight className="h-3 w-3" /> AI & Machine Learning</Link></li>
                <li><Link href="/courses/devops" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><ChevronRight className="h-3 w-3" /> DevOps & Cloud</Link></li>
                <li><Link href="/courses/python" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><ChevronRight className="h-3 w-3" /> Python Engineering</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><a href="https://wa.me/254752032884" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><MessageCircle className="h-4 w-4" /> WhatsApp Support</a></li>
                <li><a href="https://chat.whatsapp.com/Fp8zcgyPcQPEeqqAOqaxe2" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><ExternalLink className="h-4 w-4" /> Join Community</a></li>
                <li><a href="mailto:stanlleylocke@gmail.com" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2 transition-colors"><Mail className="h-4 w-4" /> stanlleylocke@gmail.com</a></li>
              </ul>
            </div>

            {/* Newsletter/Motto */}
            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-wider">Mission</h4>
              <p className="text-muted-foreground text-sm italic border-l-2 border-secondary pl-4">
                "Developers learn best by building. We focus on creating deployable solutions, not just code in a vacuum."
              </p>
              <div className="pt-4">
                <Button className="w-full bg-secondary text-secondary-foreground" asChild>
                  <a href="https://wa.me/254752032884">Message Stanlley</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} StanlleyHub Education Platform. Engineering Excellence.</p>
            <div className="flex gap-6 uppercase tracking-widest font-medium">
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/terms" className="hover:text-primary">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
