import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterStudent } from "@workspace/api-client-react";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Mail, Lock, User, Phone, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const registerStudent = useRegisterStudent();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    registerStudent.mutate(
      { 
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        } 
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          toast({
            title: "Account Created",
            description: "Welcome to StanlleyHub. Please sign in to continue.",
          });
        },
        onError: (error) => {
          toast({
            title: "Registration Failed",
            description: (error as any).error || "An error occurred during registration.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-sans">
      {/* Branding Panel (Desktop) */}
      <div className="hidden lg:flex lg:w-5/12 bg-primary relative items-center justify-center p-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071823991-b1ae5e3a7c8e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary to-transparent" />
        
        <div className="relative z-10 w-full max-w-sm space-y-12">
          <Link href="/">
             <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Stanlley<span className="text-secondary">Hub</span></h1>
          </Link>

          <div className="space-y-6">
            <h2 className="text-6xl font-black text-white tracking-tighter leading-tight uppercase">
              Join the <br/>
              <span className="text-secondary">Community.</span>
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed italic">
              Create your account to access our engineering modules and mentorship platform.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-lg space-y-10">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="lg:hidden mb-8">
                    <h1 className="text-2xl font-black tracking-tighter text-primary">Stanlley<span className="text-secondary">Hub</span></h1>
                  </div>
                  <h3 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Create Account.</h3>
                  <p className="text-muted-foreground font-bold tracking-tight italic">Start your journey with us today.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                                <Input 
                                  placeholder="John" 
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
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Last Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                                <Input 
                                  placeholder="Doe" 
                                  className="h-14 border-black/5 bg-[#FAFAFA] focus:bg-white focus:border-secondary pl-12 pr-6 rounded-2xl text-sm font-bold tracking-tight transition-all" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[10px] font-black uppercase tracking-widest text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>

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
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                              <Input 
                                placeholder="+254..." 
                                className="h-14 border-black/5 bg-[#FAFAFA] focus:bg-white focus:border-secondary pl-12 pr-6 rounded-2xl text-sm font-bold tracking-tight transition-all" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] font-black uppercase tracking-widest text-destructive" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Password</FormLabel>
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
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Confirm Password</FormLabel>
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
                    </div>
                    
                    <Button type="submit" className="w-full h-16 text-sm font-black uppercase tracking-widest rounded-2xl bg-primary text-secondary hover:bg-primary/95 shadow-xl transition-all hover:scale-[1.01] active:translate-y-px" disabled={registerStudent.isPending}>
                      {registerStudent.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Create Account
                    </Button>
                  </form>
                </Form>

                <div className="pt-8 border-t border-black/5 text-center">
                  <p className="text-sm font-bold text-muted-foreground">
                    Already a member?{" "}
                    <Link href="/login" className="text-secondary hover:underline font-black uppercase tracking-widest ml-2">
                      Sign In
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                   <CheckCircle2 className="h-12 w-12 text-secondary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Account Ready.</h3>
                  <p className="text-muted-foreground font-bold italic">Your profile has been created successfully.</p>
                </div>
                <Button asChild className="h-16 px-12 rounded-2xl bg-primary text-secondary font-black uppercase tracking-widest">
                   <Link href="/login">Return to Login</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
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

