import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListCourses, getListCoursesQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Users, Clock, ArrowRight, Zap, Filter, LayoutGrid, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Courses() {
  const [category, setCategory] = useState<string | null>(null);
  
  const params = category ? { category } : {};
  const { data: coursesData, isLoading } = useListCourses(
    params,
    { query: { queryKey: getListCoursesQueryKey(params) } }
  );

  const categories = ["All", "Web Development", "Python", "AI", "DevOps"];

  return (
    <PublicLayout>
      {/* Premium Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-black/[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em]">Curriculum Atlas</span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-primary tracking-tighter leading-[0.85]">
                Engineering <br/>
                <span className="text-secondary italic">Modules.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-bold tracking-tight max-w-2xl leading-tight pt-4">
                Accelerate your career through high-intensity, project-driven engineering tracks designed by industry architects.
              </p>
            </motion.div>

            {/* Premium Filter System */}
            <div className="flex flex-col md:flex-row gap-6 pt-12 items-start md:items-center">
              <div className="flex items-center gap-3 text-primary/40 uppercase font-black text-[10px] tracking-widest bg-[#FAFAFA] px-4 py-2 rounded-full border border-black/5">
                <Filter className="h-3.5 w-3.5" />
                Specialization
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button 
                    key={cat} 
                    onClick={() => setCategory(cat === "All" ? null : cat)}
                    className={`h-11 rounded-full px-6 transition-all duration-500 font-black uppercase text-[10px] tracking-widest border ${
                      category === (cat === "All" ? null : cat) 
                        ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                        : "bg-white text-primary/60 border-black/5 hover:border-secondary hover:text-secondary shadow-sm"
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-6 p-8 rounded-[3rem] border border-black/5 bg-[#FAFAFA]">
                    <Skeleton className="h-64 w-full rounded-[2rem]" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-14 w-full rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : (coursesData ?? []).length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-[#FAFAFA] rounded-[4rem] border border-dashed border-black/10"
              >
                <Terminal className="h-16 w-16 text-primary/10 mx-auto mb-8" />
                <h3 className="text-3xl font-black text-primary tracking-tighter uppercase">No Modules Found.</h3>
                <p className="text-muted-foreground font-bold text-lg max-w-md mx-auto mt-4">New cohorts are currently being prepared. Check back soon for the next rollout.</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(Array.isArray(coursesData) ? coursesData : []).map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
                  >
                    <Card className="group relative h-full flex flex-col bg-white border border-black/5 rounded-[3.5rem] overflow-hidden hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] hover:border-secondary/30 transition-all duration-700">
                      {/* Technical ID Tag */}
                      <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
                        <div className="h-6 px-3 rounded-full bg-primary text-white flex items-center justify-center font-mono text-[10px] font-black uppercase tracking-tighter shadow-xl">
                          MOD-{course.id.toString().padStart(3, '0')}
                        </div>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none uppercase font-black tracking-widest text-[8px] py-1 px-3">
                          {course.level}
                        </Badge>
                      </div>

                      {/* Image Hub */}
                      <div className="relative h-72 overflow-hidden bg-primary/5 m-4 rounded-[2.5rem]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <img 
                          src={course.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80`} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                           <div className="space-y-1">
                             <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Enrollment Investment</p>
                             <p className="text-2xl font-black text-white">{course.price.toLocaleString()} <span className="text-xs">KSH</span></p>
                           </div>
                           <Link href={`/courses/${course.id}`}>
                             <div className="h-12 w-12 rounded-full bg-secondary text-primary flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                               <ArrowRight className="h-6 w-6" />
                             </div>
                           </Link>
                        </div>
                      </div>

                      <CardHeader className="px-10 pt-4 pb-0 space-y-4">
                        <div className="flex items-center gap-4">
                           <LayoutGrid className="h-4 w-4 text-secondary" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{course.category}</span>
                        </div>
                        <CardTitle className="text-3xl font-black text-primary tracking-tighter leading-none group-hover:text-secondary transition-colors duration-500">
                          {course.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="px-10 py-8 flex-1 space-y-8">
                        <p className="text-muted-foreground font-bold text-sm leading-relaxed line-clamp-3">
                          {course.shortDescription}
                        </p>
                        
                        {/* Technical Telemetry */}
                        <div className="space-y-6 pt-4 border-t border-black/5">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary">
                             <span className="flex items-center gap-2"><Clock className="h-3 w-3 text-secondary" /> {course.duration}</span>
                             <span className="flex items-center gap-2"><Users className="h-3 w-3 text-secondary" /> {course.enrolledCount}/{course.maxStudents} Seats</span>
                           </div>
                           <div className="h-1.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden border border-black/5">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: `${(course.enrolledCount / course.maxStudents) * 100}%` }}
                               transition={{ duration: 1.5, delay: 0.5 }}
                               className={`h-full ${course.enrolledCount / course.maxStudents > 0.8 ? "bg-red-500" : "bg-primary"}`}
                             />
                           </div>
                           {course.enrolledCount / course.maxStudents > 0.9 && (
                             <p className="text-[8px] font-black text-red-500 uppercase tracking-widest text-right">Extremely Limited Availability</p>
                           )}
                        </div>
                      </CardContent>

                      <CardFooter className="px-10 pb-10 pt-0">
                        <Button asChild className="w-full h-16 rounded-2xl bg-[#FAFAFA] text-primary hover:bg-primary hover:text-white border border-black/5 transition-all duration-500 font-black uppercase tracking-widest text-[10px]">
                          <Link href={`/courses/${course.id}`}>
                            Initialize Module <Zap className="ml-2 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PublicLayout>
  );
}

