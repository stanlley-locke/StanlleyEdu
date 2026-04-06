import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/registrations", label: "Registrations", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="dark min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="font-bold text-xl text-sidebar-primary">StanlleyHub</Link>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                location === item.href 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-card">
          <Link href="/" className="font-bold text-lg text-primary">StanlleyHub</Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground">
              <div className="p-6 border-b border-sidebar-border">
                <p className="font-bold text-xl text-sidebar-primary">StanlleyHub</p>
                <p className="text-xs text-sidebar-foreground/60 mt-1">Admin Portal</p>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      location === item.href 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </div>
                  </Link>
                ))}
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 mt-4" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
