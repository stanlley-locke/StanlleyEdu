import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateRegistration, useListCourses, getListCoursesQueryKey } from "@workspace/api-client-react";
import { useLocation, useSearch, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Loader2, CheckCircle2, ShieldCheck, Zap, Users, ArrowRight, Shield, Award, Layout, ChevronRight, ChevronLeft } from "lucide-react";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  courseId: z.string().min(1, "Please select a course"),
  paymentReference: z.string().optional(),
  notes: z.string().optional(),
});

export default function Register() {
  const { user, token } = useAuth();
  const isAuthenticated = !!token && !!user;

  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createRegistration = useCreateRegistration();
  const { data: coursesData, isLoading: loadingCourses } = useListCourses(
    {},
    { query: { queryKey: getListCoursesQueryKey({}) } }
  );

  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCourseId = searchParams.get("courseId") || "";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      courseId: initialCourseId,
      paymentReference: "",
      notes: "",
    },
  });

  // Start at Step 2 if already authenticated
  const [step, setStep] = useState(isAuthenticated ? 2 : 1);

  const selectedCourseId = form.watch("courseId");
  const selectedCourse = (coursesData ?? []).find(c => c.id.toString() === selectedCourseId);

  const handleNext = async () => {
    const fieldsToValidate = step === 1 
      ? ["firstName", "lastName", "email", "phone"] as const
      : ["courseId"] as const;
      
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    createRegistration.mutate(
      { 
        data: {
          ...values,
          courseId: parseInt(values.courseId, 10),
        } 
      },
      {
        onSuccess: () => {
          setStep(4); // Success step
          toast({
            title: "Application Submitted",
            description: "We've received your application. We will contact you shortly.",
          });
        },
        onError: (error) => {
          toast({
            title: "Submission Failed",
            description: (error as any).error || "An error occurred. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="auth-split-container bg-white">
      {/* Left Panel: Context-Aware Brand Panel */}
      <div className="auth-left-panel brand-gradient">
        <div className="absolute inset-0 opacity-20 bg-[url('/hero_background.jpg')] bg-cover bg-center mix-blend-overlay" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12">
            <h1 className="text-3xl font-black tracking-tighter text-white">Stanlley<span className="text-secondary">Hub</span></h1>
          </Link>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none text-white uppercase">
                {isAuthenticated ? (
                  <>Welcome <br/><span className="text-secondary">Back, {user?.firstName}</span></>
                ) : (
                  <>Engineer <br/><span className="text-secondary">Registry.</span></>
                )}
              </h2>
              <p className="text-xl text-white/70 font-semibold leading-tight max-w-md">
                {isAuthenticated 
                  ? "You're already part of the ecosystem. Secure your seat in a new intensive cohort with one click."
                  : "Join the next generation of engineers building production-grade architectures."
                }
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Shield, title: "Industry Standards", desc: "Learn methodologies used at top tech firms." },
                { icon: Layout, title: "Modular Architecture", desc: "Build systems that scale to millions." },
                { icon: Award, title: "Elite Certification", desc: "Recognized by industry leaders." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-widest text-xs mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50 font-bold leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 p-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-[3rem]">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-slate-200 flex items-center justify-center overflow-hidden">
                  <Users className="h-5 w-5 text-primary/40" />
                </div>
              ))}
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">
              Join +12 New Engineers this week
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Enrollment Flow */}
      <div className="auth-right-panel py-20 overflow-y-auto">
        <div className="w-full max-w-xl px-4 lg:px-12">
          {step < 4 && (
            <div className="mb-16">
              <div className="lg:hidden mb-12 text-center">
                <h1 className="text-2xl font-black tracking-tighter text-primary">Stanlley<span className="text-secondary">Hub</span></h1>
              </div>
              
              <div className="flex items-center justify-between gap-4 mb-12">
                {[1, 2, 3].map((s) => {
                  if (isAuthenticated && s === 1) return null;
                  const isActive = step === s;
                  const isCompleted = step > s;
                  
                  return (
                    <div key={s} className="flex-1 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          isActive ? "bg-secondary" : isCompleted ? "bg-primary" : "bg-black/5"
                        }`} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        isActive ? "text-secondary" : isCompleted ? "text-primary" : "text-muted-foreground/40"
                      }`}>
                        Phase 0{s}
                      </span>
                    </div>
                  );
                })}
              </div>

              <h3 className="text-4xl lg:text-5xl font-black text-primary tracking-tighter mb-4 leading-none">
                {step === 1 ? "Identity." : step === 2 ? "Cohort Track." : "Commitment."}
              </h3>
              <p className="text-muted-foreground font-semibold text-lg">
                {step === 1 ? "Provide your professional details." : step === 2 ? "Select your engineering specialization." : "Secure your position via M-Pesa."}
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <Form {...form}>
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your first name" className="h-14 border-black/10 rounded-xl px-6" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your last name" className="h-14 border-black/10 rounded-xl px-6" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="professional@email.com" className="h-14 border-black/10 rounded-xl px-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+254..." className="h-14 border-black/10 rounded-xl px-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-8">
                      <Button type="button" className="w-full h-20 text-lg font-black uppercase tracking-widest rounded-full" onClick={handleNext}>
                        Continue to Specialization <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <Form {...form}>
                  <form className="space-y-10">
                    <FormField
                      control={form.control}
                      name="courseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Available Tracks</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-20 text-lg font-bold border-black/10 rounded-2xl px-8 bg-black/[0.02]">
                                <SelectValue placeholder={loadingCourses ? "Scanning Database..." : "Select Engineering Track"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl p-2">
                              {(coursesData ?? []).map((course) => (
                                <SelectItem key={course.id} value={course.id.toString()} className="rounded-xl h-16 px-4">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-primary">{course.title}</span>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{course.duration}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedCourse && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-10 rounded-[3rem] bg-primary text-white space-y-6 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 blur-[60px]" />
                        <div>
                          <h4 className="text-3xl font-bold tracking-tighter mb-2">{selectedCourse.title}</h4>
                          <p className="text-white/60 font-medium leading-tight">{selectedCourse.shortDescription}</p>
                        </div>
                        <div className="flex justify-between items-center pt-8 border-t border-white/10">
                          <span className="text-xs font-black uppercase tracking-widest text-white/40">Commitment Fee</span>
                          <span className="text-3xl font-black text-secondary tracking-tighter">{selectedCourse.commitmentFee.toLocaleString()} Ksh</span>
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="flex gap-4 pt-10">
                      <Button type="button" variant="outline" className="h-20 px-8 rounded-full border-black/10 text-muted-foreground font-black uppercase tracking-widest" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="button" className="flex-1 h-20 text-lg font-black uppercase tracking-widest rounded-full" onClick={handleNext}>
                        Proceed to Payment <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="bg-[#F8F9FA] rounded-[3rem] p-10 border border-black/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-[#00C389]/10 flex items-center justify-center">
                      <ShieldCheck className="h-8 w-8 text-[#00C389]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary tracking-tight">Verified M-Pesa Payment</h4>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Secure Merchant Gateway</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-muted-foreground italic">Pay To:</span>
                      <span className="font-black text-primary">Stanlley Locke</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-muted-foreground italic">Phone:</span>
                      <span className="font-black text-primary select-all">0752032884</span>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t font-black text-2xl tracking-tighter">
                      <span className="text-primary italic">TOTAL:</span>
                      <span className="text-secondary">800.00 KSH</span>
                    </div>
                  </div>

                  <p className="mt-8 text-xs font-bold text-muted-foreground text-center leading-relaxed">
                    Please copy the transaction code from your M-Pesa confirmation SMS and paste it below.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    <FormField
                      control={form.control}
                      name="paymentReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">M-Pesa Transaction Code</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. QAB123CDEF" className="h-16 border-black/10 rounded-2xl px-6 font-mono text-lg uppercase" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Aspirations (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="What do you hope to achieve?" className="resize-none h-32 border-black/10 rounded-2xl p-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" className="h-20 px-8 rounded-full border-black/10 text-muted-foreground font-black uppercase tracking-widest" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 h-20 text-lg font-black uppercase tracking-widest rounded-full shadow-2xl shadow-primary/20" disabled={createRegistration.isPending}>
                        {createRegistration.isPending ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : null}
                        Finalize Enrollment
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 bg-[#00C389] text-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-[#00C389]/20">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-primary tracking-tighter mb-6 leading-none">APPLICATION<br/><span className="text-secondary">ARCHIVED.</span></h2>
                <p className="text-xl text-muted-foreground font-semibold mb-12 max-w-sm mx-auto leading-tight">
                  Your registration is being processed by our lead architects. We will notify you shortly.
                </p>
                <div className="flex flex-col gap-4">
                  <Button asChild className="h-20 text-lg font-black uppercase tracking-widest rounded-full">
                    <Link href="/">Back to Command Center</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
