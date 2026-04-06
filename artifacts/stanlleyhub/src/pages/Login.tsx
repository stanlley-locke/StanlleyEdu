import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginUser } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
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
            title: "Welcome back!",
            description: "Successfully logged in.",
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
            description: (error as any).error || "Please check your credentials and try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="auth-split-container">
      {/* Left Panel: High-Impact Brand Imagery */}
      <div className="auth-left-panel brand-gradient">
        <div className="absolute inset-0 opacity-20 bg-[url('/hero_background.jpg')] bg-cover bg-center mix-blend-overlay" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12">
            <h1 className="text-3xl font-black tracking-tighter text-white">Stanlley<span className="text-secondary">Hub</span></h1>
          </Link>
          <div className="space-y-8 max-w-lg">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none text-white">
              The Hub for <br/>
              <span className="text-secondary">Elite Engineers.</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold leading-tight">
              Access your personalized learning portal and track your engineering journey.
            </p>
          </div>
        </div>

        <div className="relative z-10 glass-panel">
          <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
            <div className="h-16 w-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <p className="text-3xl font-black text-white">1,200+</p>
              <p className="text-xs font-black uppercase tracking-widest text-white/50">Active Engineers</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <p className="text-sm font-bold text-white/80">Real-time industry projects</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <p className="text-sm font-bold text-white/80">Direct mentorship from Lead Architects</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <p className="text-sm font-bold text-white/80">Production-grade stack training</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Focused Form */}
      <div className="auth-right-panel py-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-4"
        >
          <div className="mb-10 lg:hidden text-center">
            <h1 className="text-2xl font-black tracking-tighter text-primary">Stanlley<span className="text-secondary">Hub</span></h1>
          </div>

          <div className="mb-12">
            <h3 className="text-4xl font-bold text-primary tracking-tighter mb-4">Welcome back.</h3>
            <p className="text-muted-foreground font-semibold text-lg">Enter your details to access the portal.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your@email.com" 
                        className="h-14 border-black/10 focus:border-primary px-6 rounded-xl text-base" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</FormLabel>
                      <Link href="/forgot-password" title="Coming soon" className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">Forgot?</Link>
                    </div>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="h-14 border-black/10 focus:border-primary px-6 rounded-xl text-base" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit" className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-full shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={loginUser.isPending}>
                  {loginUser.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  Access Portal
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-12 text-center pt-8 border-t border-black/5">
            <p className="text-sm font-bold text-muted-foreground">
              New to the Hub?{" "}
              <Link href="/register" className="text-primary hover:underline font-black uppercase tracking-widest ml-2">
                Join Now <ArrowRight className="inline-block h-4 w-4 ml-1" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
