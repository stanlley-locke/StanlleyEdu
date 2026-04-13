import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Terminal, Cpu, ArrowLeft, KeyRound } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Valid engineering credential required"),
  password: z.string().min(1, "Access key required"),
});

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const loginUser = useLoginUser();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginUser.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          login(data.token, data.user.role, data.user);
          toast({
            title: "Access Granted",
            description: "System connection established.",
          });
          if (data.user.role === "admin") {
            setLocation("/admin/dashboard");
          } else {
            setLocation("/student/dashboard");
          }
        },
        onError: (error) => {
          toast({
            title: "Access Denied",
            description: "Invalid credentials or system timeout.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-secondary/30">
      {/* Visual Terminal Panel (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-24">
        {/* Engineering Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 w-full max-w-lg space-y-16">
          <Link href="/" className="inline-block group">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center group-hover:rotate-12 transition-transform">
                 <Terminal className="h-6 w-6 text-primary" />
               </div>
               <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Stanlley<span className="text-secondary">Hub</span></h1>
            </div>
          </Link>

          <div className="space-y-8">
            <h2 className="text-6xl font-black text-white tracking-tighter leading-none uppercase">
              Secure <br/>
              <span className="text-secondary">Engineering</span> <br/>
              Access.
            </h2>
            <div className="h-1 w-24 bg-white/20" />
            <p className="text-lg text-white/40 font-bold leading-relaxed max-w-sm italic">
              Connect to your development workspace and track architectural progression in real-time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/5">
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">System Status</p>
                <div className="flex items-center gap-2 text-secondary font-black uppercase text-xs">
                   <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                   Operational
                </div>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Encrypted</p>
                <div className="flex items-center gap-2 text-white/80 font-black uppercase text-xs">
                   <ShieldCheck className="h-4 w-4 text-secondary" />
                   AES-256
                </div>
             </div>
          </div>
        </div>
        
        {/* Decorative Circuitry */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-white/[0.02] rounded-full" />
      </div>

      {/* Authentication Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-24 relative">
        <div className="lg:hidden absolute top-8 left-8">
           <Link href="/" className="text-xl font-black tracking-tighter text-primary uppercase">Stanlley<span className="text-secondary">Hub</span></Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-12"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary">
               <KeyRound className="h-3.5 w-3.5" /> Identity Verification
            </div>
            <h3 className="text-5xl font-black text-primary tracking-tighter uppercase leading-none">Authentication.</h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex justify-between items-center">
                       Credential Email
                       <Cpu className="h-3 w-3 opacity-30" />
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ID@ENGINEERING.SPACE" 
                        className="h-16 border-black/5 bg-[#FAFAFA] focus:bg-white focus:border-secondary px-6 rounded-2xl text-sm font-bold uppercase tracking-widest placeholder:opacity-20 transition-all" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-black uppercase tracking-widest text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Access Key</FormLabel>
                      <Link href="/forgot-password" title="Coming soon" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">Reset Key?</Link>
                    </div>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••••••" 
                        className="h-16 border-black/5 bg-[#FAFAFA] focus:bg-white focus:border-secondary px-6 rounded-2xl text-sm placeholder:opacity-20 transition-all font-mono" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-black uppercase tracking-widest text-destructive" />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full h-20 text-xs font-black uppercase tracking-[0.3em] rounded-2xl bg-primary text-secondary hover:bg-primary/95 shadow-xl transition-all hover:scale-[1.01] active:translate-y-px" disabled={loginUser.isPending}>
                {loginUser.isPending ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
                Initiate Connection
              </Button>
            </form>
          </Form>

          <div className="pt-12 border-t border-black/5 flex flex-col items-center gap-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              No workstation authorized?
            </p>
            <Button asChild variant="outline" className="h-14 px-10 rounded-xl border-black/5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
              <Link href="/register">Register New Module</Link>
            </Button>
          </div>
        </motion.div>

        <div className="absolute bottom-8 text-center">
           <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">
             <ArrowLeft className="h-3 w-3" /> System Home
           </Link>
        </div>
      </div>
    </div>
  );
}

