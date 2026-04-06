import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateRegistration, useListCourses, getListCoursesQueryKey } from "@workspace/api-client-react";
import { useLocation, useSearch } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";

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
  const [step, setStep] = useState(1);
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCourseId = searchParams.get("courseId") || "";

  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createRegistration = useCreateRegistration();
  const { data: coursesData, isLoading: loadingCourses } = useListCourses(
    { status: "active" },
    { query: { queryKey: getListCoursesQueryKey({ status: "active" }) } }
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      courseId: initialCourseId,
      paymentReference: "",
      notes: "",
    },
  });

  const selectedCourseId = form.watch("courseId");
  const selectedCourse = coursesData?.courses.find(c => c.id.toString() === selectedCourseId);

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
            description: error.error || "An error occurred. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[calc(100vh-200px)] flex flex-col justify-center">
        
        {step < 4 && (
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Join StanlleyHub</h1>
            <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
              Take the first step towards a career in software engineering.
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-16 h-1 mx-2 rounded-full transition-colors ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Personal Information</CardTitle>
                    <CardDescription>Tell us about yourself.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
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
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@example.com" {...field} />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex justify-end pt-4">
                          <Button type="button" size="lg" onClick={handleNext}>
                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Select Course</CardTitle>
                    <CardDescription>Choose the track you want to join.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form className="space-y-6">
                        <FormField
                          control={form.control}
                          name="courseId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-14 text-base">
                                    <SelectValue placeholder={loadingCourses ? "Loading courses..." : "Select a course"} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {coursesData?.courses.map((course) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                      <div className="flex items-center justify-between w-full">
                                        <span className="font-medium">{course.title}</span>
                                        <span className="text-muted-foreground text-sm ml-4">{course.duration}</span>
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
                          <div className="bg-muted/50 p-6 rounded-xl border mt-6">
                            <h4 className="font-bold text-lg mb-2">{selectedCourse.title}</h4>
                            <p className="text-muted-foreground text-sm mb-4">{selectedCourse.shortDescription}</p>
                            <div className="flex justify-between items-center pt-4 border-t">
                              <span className="text-muted-foreground">Commitment Fee:</span>
                              <span className="font-bold text-lg">{selectedCourse.commitmentFee.toLocaleString()} Ksh</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" size="lg" onClick={handleBack}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                          </Button>
                          <Button type="button" size="lg" onClick={handleNext}>
                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Payment & Final Details</CardTitle>
                    <CardDescription>Secure your spot by paying the commitment fee.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                      <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        M-Pesa Payment Instructions
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Please pay the commitment fee of <strong className="text-foreground">800 Ksh</strong> to secure your spot.
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                        <li>Go to M-Pesa menu</li>
                        <li>Select Send Money</li>
                        <li>Enter phone number: <strong className="text-foreground">0752032884</strong></li>
                        <li>Enter amount: <strong className="text-foreground">800</strong></li>
                        <li>Enter your PIN and confirm</li>
                        <li>Copy the M-Pesa transaction code (e.g. QAB123CDEF)</li>
                      </ol>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="paymentReference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>M-Pesa Transaction Code (Optional but recommended)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. QAB123CDEF" {...field} />
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
                              <FormLabel>Why do you want to join this bootcamp? (Optional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Share your goals..." className="resize-none h-24" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" size="lg" onClick={handleBack}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                          </Button>
                          <Button type="submit" size="lg" disabled={createRegistration.isPending}>
                            {createRegistration.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Submit Application
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center py-16 bg-card rounded-2xl border shadow-lg">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for applying to StanlleyHub. We will review your application and payment details, and reach out to you via email shortly.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg">
                      <Link href="/">Return Home</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/courses">Browse More Courses</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PublicLayout>
  );
}
