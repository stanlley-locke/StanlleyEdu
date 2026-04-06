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
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 relative overflow-hidden rounded-lg bg-white p-1">
              <img 
                src="/StanlleyHub_Education_logo.png" 
                alt="StanlleyHub Education Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              StanlleyHub <span className="text-secondary">Education</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-sm font-medium hover:text-secondary transition-colors">Programs</Link>
            <Link href="/#mentor" className="text-sm font-medium hover:text-secondary transition-colors">The Mentor</Link>
            <Link href="/#connect" className="text-sm font-medium hover:text-secondary transition-colors">Connect</Link>
          </nav>

          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href={role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}>Dashboard</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => { logout(); setLocation('/'); }} className="text-destructive border-destructive/20 hover:bg-destructive/10">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20">
                  <Link href="/register">Enroll Now</Link>
                </Button>
                <button 
                  className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-4">
              <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium p-2">Programs</Link>
              <Link href="/#mentor" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium p-2">The Mentor</Link>
              <Link href="/#connect" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium p-2">Connect</Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">
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
