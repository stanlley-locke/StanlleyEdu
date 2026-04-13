import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Mail, Lock, UserCircle2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
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
            title: "Welcome Back",
            description: "You have successfully signed in.",
          });
          if (data.user.role === "admin") {
            setLocation("/admin/dashboard");
          } else {
            setLocation("/student/dashboard");
          }
        },
        onError: (error) => {
          toast({
            title: "Login Failed",
            description: "Please check your email and password.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-sans">
      {/* Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center p-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary to-transparent" />
        
        <div className="relative z-10 w-full max-w-sm text-center lg:text-left space-y-12">
          <Link href="/">
             <h1 className="text-3xl font-black tracking-tighter text-white">Stanlley<span className="text-secondary">Hub</span></h1>
          </Link>

          <div className="space-y-6">
            <h2 className="text-6xl font-black text-white tracking-tighter leading-tight uppercase">
              Unlock Your <br/>
              <span className="text-secondary text-5xl">Engineering</span> <br/>
              Potential.
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed italic">
              Access your personalized learning tracks and industry-grade projects.
            </p>
          </div>
        </div>
      </div>

      {/* Login Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-white shadow-[-40px_0_80px_rgba(0,0,0,0.02)]">
        <div className="w-full max-w-sm space-y-10">
          <div className="space-y-4">
             <div className="lg:hidden mb-8">
               <h1 className="text-2xl font-black tracking-tighter text-primary">Stanlley<span className="text-secondary">Hub</span></h1>
             </div>
             <h3 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Sign In.</h3>
             <p className="text-muted-foreground font-bold tracking-tight italic">Welcome back to the community.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                        <Input 
                          placeholder="name@example.com" 
                          className="h-14 border-black/5 bg-[#FAFAFA] focus:bg-white focus:border-secondary pl-12 pr-6 rounded-2xl text-sm font-bold tracking-tight transition-all" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-black uppercase tracking-widest text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Password</FormLabel>
                      <Link href="/forgot-password" title="Coming soon" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">Forgot?</Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="h-14 border-black/5 bg-[#FAFAFA] focus:bg-white focus:border-secondary pl-12 pr-6 rounded-2xl text-sm transition-all" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-black uppercase tracking-widest text-destructive" />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full h-16 text-sm font-black uppercase tracking-widest rounded-2xl bg-primary text-secondary hover:bg-primary/95 shadow-xl transition-all hover:scale-[1.01] active:translate-y-px" disabled={loginUser.isPending}>
                {loginUser.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </form>
          </Form>

          <div className="pt-10 border-t border-black/5 text-center">
            <p className="text-sm font-bold text-muted-foreground">
              New here?{" "}
              <Link href="/register" className="text-secondary hover:underline font-black uppercase tracking-widest ml-2">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12">
           <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-muted-foreground/40 hover:text-primary transition-colors uppercase tracking-[0.2em]">
             <ArrowLeft className="h-3 w-3" /> Back to home
           </Link>
        </div>
      </div>
    </div>
  );
}


