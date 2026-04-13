import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetCourse, getGetCourseQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  Calendar, 
  User as UserIcon, 
  BookOpen, 
  ChevronRight, 
  FileText,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Terminal,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || "0", 10);
  
  const { data: course, isLoading } = useGetCourse(courseId, {
    query: {
      enabled: !!courseId,
      queryKey: getGetCourseQueryKey(courseId)
    }
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-48 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <Skeleton className="h-20 w-3/4 rounded-3xl" />
              <Skeleton className="h-96 w-full rounded-[3rem]" />
              <div className="space-y-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </div>
            </div>
            <div className="space-y-8">
              <Skeleton className="h-[500px] w-full rounded-[3rem]" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!course) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-48 text-center max-w-7xl">
          <div className="max-w-md mx-auto space-y-8 bg-[#FAFAFA] p-16 rounded-[4rem] border border-black/5">
             <Terminal className="h-20 w-20 text-primary/10 mx-auto" />
             <h1 className="text-4xl font-black text-primary tracking-tighter uppercase">Module Not Located.</h1>
             <p className="text-muted-foreground font-bold italic">The requested architectural track might have been decommissioned or moved.</p>
             <Button asChild className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px]">
               <Link href="/courses">Return to Atlas</Link>
             </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Blueprint Header */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-white border-b border-black/[0.03]">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <Link href="/courses" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-secondary mb-12 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to modules
          </Link>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-primary/5 text-primary border-primary/10 font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full">
                    {course.category}
                  </Badge>
                  <Badge className="bg-secondary/10 text-secondary border-none font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full">
                    {course.level}
                  </Badge>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter leading-none">
                  {course.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-bold tracking-tight max-w-3xl leading-tight border-l-4 border-secondary pl-8 italic">
                  {course.shortDescription}
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-6 pt-10">
                <div className="p-8 rounded-[2rem] bg-[#FAFAFA] border border-black/5 space-y-4">
                  <Clock className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Duration</p>
                    <p className="text-lg font-black text-primary uppercase">{course.duration}</p>
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-[#FAFAFA] border border-black/5 space-y-4">
                  <Calendar className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rollout Date</p>
                    <p className="text-lg font-black text-primary uppercase">{new Date(course.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-[#FAFAFA] border border-black/5 space-y-4">
                  <UserIcon className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Lead Architect</p>
                    <p className="text-lg font-black text-primary uppercase">{course.instructorName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group rounded-[3rem] overflow-hidden border border-black/10 shadow-2xl">
               <div className="absolute inset-0 bg-primary/20 z-10" />
               <img 
                 src={course.imageUrl || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80`} 
                 alt={course.title} 
                 className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
               />
               <div className="absolute inset-0 z-20 bg-gradient-to-t from-primary via-transparent to-transparent flex flex-col justify-end p-12">
                  <div className="h-0.5 w-12 bg-secondary mb-6" />
                  <p className="text-white text-2xl font-black tracking-tighter uppercase leading-none">Practical <br/>Intelligence.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analysis Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-24">
              {/* Detailed Breakdown */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-black text-primary tracking-tighter uppercase flex items-center gap-4">
                    <div className="h-2 w-12 bg-secondary" /> Architecture Scope.
                  </h2>
                  <div className="prose prose-xl max-w-none text-muted-foreground font-bold leading-relaxed whitespace-pre-wrap italic pl-12">
                    {course.description}
                  </div>
                </div>

                {/* Technical Outcomes */}
                {course.outcomes && course.outcomes.length > 0 && (
                  <div className="p-12 md:p-16 rounded-[4rem] bg-[#FAFAFA] border border-black/5 space-y-12">
                    <h3 className="text-2xl font-black text-primary tracking-tighter uppercase">Operational Targets</h3>
                    <div className="grid sm:grid-cols-2 gap-8">
                      {course.outcomes.map((outcome, i) => (
                        <div key={i} className="flex gap-4">
                          <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                          <p className="text-sm font-bold text-muted-foreground leading-tight">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* System Implementation (Curriculum) */}
                {course.modules && course.modules.length > 0 && (
                  <div className="space-y-12 pt-12">
                    <h3 className="text-4xl font-black text-primary tracking-tighter uppercase">System Rollout.</h3>
                    <div className="space-y-6 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-px before:bg-black/5">
                      {course.modules.map((module, i) => (
                        <div key={i} className="relative pl-24 group">
                          <div className="absolute left-6 top-6 h-4 w-4 rounded-full border-4 border-white bg-secondary group-hover:scale-125 transition-transform" />
                          <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-secondary/30 transition-all duration-500 shadow-sm hover:shadow-xl">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Phase 0{module.order}</span>
                              <Badge variant="outline" className="border-black/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{module.duration}</Badge>
                            </div>
                            <h4 className="text-2xl font-black text-primary tracking-tighter uppercase mb-4">{module.title}</h4>
                            <p className="text-muted-foreground font-bold text-sm leading-relaxed">{module.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Secure Access Terminal */}
            <aside className="lg:sticky lg:top-32 h-fit">
               <div className="rounded-[4rem] bg-primary p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 blur-[100px]" />
                 
                 <div className="relative z-10 space-y-12">
                   <div className="space-y-8 pb-12 border-b border-white/10">
                     <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                        <ShieldCheck className="h-4 w-4" /> Secure Enrollment
                     </span>
                     <div>
                       <p className="text-5xl font-black tracking-tighter">{course.price.toLocaleString()} <span className="text-xl font-bold opacity-30 tracking-widest ml-2">KSH</span></p>
                       <p className="text-[10px] uppercase font-black tracking-[0.4em] opacity-50 mt-4">Full Program Access</p>
                     </div>
                     
                     <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
                        <p className="text-[10px] uppercase font-black text-secondary tracking-widest">Strategic Entry</p>
                        <div className="flex items-end gap-3">
                           <p className="text-3xl font-black">{course.commitmentFee.toLocaleString()}</p>
                           <p className="text-sm font-bold opacity-50 pb-1">KSH</p>
                        </div>
                        <p className="text-xs font-bold opacity-70">Pay commitment fee now to secure your position in this cohort.</p>
                     </div>
                   </div>

                   <div className="space-y-8">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2"><Users className="h-3 w-3" /> Availability</span>
                           <span className="text-[10px] font-black text-secondary">{course.enrolledCount}/{course.maxStudents} Seats</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${(course.enrolledCount / course.maxStudents) * 100}%` }} />
                        </div>
                     </div>

                     <Button asChild size="lg" className="w-full h-24 rounded-[2rem] bg-white text-primary hover:bg-secondary hover:text-primary transition-all duration-500 text-xl font-black uppercase tracking-[0.2em] shadow-xl group" disabled={course.enrolledCount >= course.maxStudents}>
                       <Link href={`/register?courseId=${course.id}`}>
                         Apply Now <Zap className="ml-3 h-6 w-6 fill-primary group-hover:scale-125 transition-transform" />
                       </Link>
                     </Button>

                     <div className="flex justify-center gap-3 grayscale opacity-30 mt-8">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" className="h-8 grayscale invert" alt="M-Pesa" />
                     </div>
                   </div>
                 </div>
               </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Technical Stack Summary */}
      {course.technologies && course.technologies.length > 0 && (
        <section className="py-24 bg-[#FAFAFA] border-t border-black/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center gap-12">
               <span className="text-xs font-black uppercase tracking-[0.6em] text-muted-foreground flex items-center gap-4">
                 <Cpu className="h-4 w-4" /> Integrated Tooling
               </span>
               <div className="flex flex-wrap justify-center gap-6">
                 {course.technologies.map((tech, i) => (
                   <div key={i} className="px-8 py-4 bg-white border border-black/5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-primary shadow-sm hover:shadow-md transition-shadow">
                     {tech}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}

