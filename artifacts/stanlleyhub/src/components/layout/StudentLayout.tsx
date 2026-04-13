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
      <aside className="hidden md:flex w-64 flex-col bg-slate-50 border-r border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="font-black text-xl text-primary tracking-tighter uppercase">Stanlley<span className="text-secondary">Hub</span></Link>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Student Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                location === item.href 
                  ? "bg-primary text-secondary font-bold shadow-md shadow-primary/10" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-primary"
              }`}>
                <item.icon className={`h-5 w-5 ${location === item.href ? "text-secondary" : "text-slate-400"}`} />
                <span className="text-sm tracking-tight">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-bold" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <Link href="/" className="font-black text-lg text-primary tracking-tighter uppercase">Stanlley<span className="text-secondary">Hub</span></Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-white shadow-xl">
              <div className="p-6 border-b">
                <p className="font-black text-xl text-primary tracking-tighter uppercase">StanlleyHub</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Student Portal</p>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location === item.href 
                        ? "bg-primary text-secondary font-bold" 
                        : "text-slate-500 hover:bg-slate-100 hover:text-primary"
                    }`}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </div>
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-bold" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#FAFAFA]">
          {children}
        </main>
      </div>
    </div>
  );
}
