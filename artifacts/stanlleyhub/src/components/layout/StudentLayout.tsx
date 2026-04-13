import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  Award, 
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function StudentLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const navItems = [
    { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/courses", label: "My Courses", icon: BookOpen },
    { href: "/student/profile", label: "Profile", icon: User },
    { href: "/student/certificate", label: "Certificates", icon: Award },
  ];

  return (
    <div className="min-h-screen flex bg-white text-slate-900">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-primary border-r border-primary/10 shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="font-black text-2xl text-white tracking-tighter uppercase">Stanlley<span className="text-secondary">Hub</span></Link>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-2">Student Portal</p>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                location === item.href 
                  ? "bg-white/10 text-secondary font-black shadow-lg" 
                  : "text-white/60 font-bold hover:bg-white/5 hover:text-white"
              }`}>
                <item.icon className={`h-5 w-5 ${location === item.href ? "text-secondary" : "text-white/30"}`} />
                <span className="text-sm tracking-tight">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold rounded-xl" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-primary">
          <Link href="/" className="font-black text-lg text-white tracking-tighter uppercase">Stanlley<span className="text-secondary">Hub</span></Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-primary border-r border-white/10 shadow-2xl">
              <div className="p-8 border-b border-white/10">
                <p className="font-black text-2xl text-white tracking-tighter uppercase">Stanlley<span className="text-secondary">Hub</span></p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-2">Student Portal</p>
              </div>
              <nav className="p-6 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors ${
                      location === item.href 
                        ? "bg-white/10 text-secondary font-black" 
                        : "text-white/60 font-bold hover:bg-white/5 hover:text-white"
                    }`}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm tracking-tight">{item.label}</span>
                    </div>
                  </Link>
                ))}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold rounded-xl" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-[#FAFAFA]">
          {children}
        </main>
      </div>
    </div>
  );
}
