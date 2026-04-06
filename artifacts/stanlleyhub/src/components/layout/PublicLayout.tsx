import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { token, role, logout } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b bg-card text-card-foreground">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-primary">StanlleyHub</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">Courses</Link>
          </nav>
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Link href={role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                <button onClick={() => { logout(); setLocation('/'); }} className="text-sm font-medium text-destructive hover:opacity-80 transition-opacity">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                <Link href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">Register</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-8 bg-card text-muted-foreground mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} StanlleyHub Education Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
