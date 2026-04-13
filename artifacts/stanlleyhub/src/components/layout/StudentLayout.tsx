import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  Award, 
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StudentLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/courses", label: "My Courses", icon: BookOpen },
    { href: "/student/profile", label: "Profile", icon: User },
    { href: "/student/certificate", label: "Certificates", icon: Award },
    { href: "/student/billing", label: "Payments", icon: CreditCard },
  ];

  const secondaryNavItems = [
    { href: "/student/community", label: "Community", icon: MessageSquare },
    { href: "/student/support", label: "Support", icon: HelpCircle },
    { href: "/student/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-white text-slate-900 transition-all duration-300">
      {/* Sidebar for Desktop */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 100 : 288 }}
        className="hidden md:flex flex-col bg-primary border-r border-primary/10 shadow-2xl relative z-40 overflow-hidden"
      >
        <div className={`p-8 border-b border-white/10 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Link href="/" className="font-black text-2xl text-white tracking-tighter uppercase whitespace-nowrap">
                Stanlley<span className="text-secondary">Hub</span>
              </Link>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-2">Student Portal</p>
            </motion.div>
          )}
          {isCollapsed && (
             <Link href="/" className="font-black text-2xl text-secondary tracking-tighter">S<span className="text-white">H</span></Link>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between py-6">
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer group relative ${
                  location === item.href 
                    ? "bg-white/10 text-secondary font-black shadow-lg" 
                    : "text-white/60 font-bold hover:bg-white/5 hover:text-white"
                } ${isCollapsed ? 'justify-center' : ''}`}>
                  <item.icon className={`h-5 w-5 shrink-0 ${location === item.href ? "text-secondary" : "text-white/30 group-hover:text-white"}`} />
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm tracking-tight whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            
            <div className={`pt-4 mt-4 border-t border-white/5 ${isCollapsed ? 'mx-4' : 'mx-0'}`}>
               {!isCollapsed && <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Support</p>}
               {secondaryNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer group relative ${
                    location === item.href 
                      ? "bg-white/10 text-secondary font-black" 
                      : "text-white/60 font-bold hover:bg-white/5 hover:text-white"
                  } ${isCollapsed ? 'justify-center' : ''}`}>
                    <item.icon className="h-5 w-5 shrink-0 text-white/30 group-hover:text-white" />
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm tracking-tight whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-3 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                        {item.label}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          <div className="px-4 border-t border-white/10 pt-6">
            <Button 
              variant="ghost" 
              className={`w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold rounded-xl transition-all duration-300 ${isCollapsed ? 'px-0 justify-center' : 'justify-start'}`} 
              onClick={handleLogout}
            >
              <LogOut className={`${isCollapsed ? '' : 'mr-2'} h-5 w-5 shrink-0`} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 bg-secondary text-primary rounded-full p-1 shadow-lg hover:scale-110 transition-transform hidden border border-primary/20 xl:block"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-primary">
          <Link href="/" className="font-black text-lg text-white tracking-tighter uppercase text-ellipsis overflow-hidden whitespace-nowrap">
            Stanlley<span className="text-secondary">Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-primary"></span>
            </Button>
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
                <nav className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Main Menu</p>
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors ${
                        location === item.href 
                          ? "bg-white/10 text-secondary font-black" 
                          : "text-white/60 font-bold hover:bg-white/5 hover:text-white"
                      }`}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="text-sm tracking-tight">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                  
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Account & Support</p>
                    {secondaryNavItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors ${
                          location === item.href 
                            ? "bg-white/10 text-secondary font-black" 
                            : "text-white/60 font-bold hover:bg-white/5 hover:text-white"
                        }`}>
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm tracking-tight">{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold rounded-xl" onClick={handleLogout}>
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#FAFAFA]">
          {children}
        </main>
      </div>
    </div>
  );
}
