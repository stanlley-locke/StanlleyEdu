import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetCourse, getGetCourseQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, Calendar, User as UserIcon, BookOpen, ChevronRight, FileText } from "lucide-react";
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
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div>
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!course) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link href="/courses">Browse all courses</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <img src={course.imageUrl || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80`} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">{course.category}</Badge>
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">{course.level}</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
              {course.shortDescription}
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-primary-foreground/90">
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="h-5 w-5 text-accent" />
                {course.duration}
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-accent" />
                Starts {new Date(course.startDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <UserIcon className="h-5 w-5 text-accent" />
                Instructor: {course.instructorName}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12 relative items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FileText className="text-primary h-8 w-8" />
                About this bootcamp
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {course.description}
              </div>
            </section>

            {course.outcomes && course.outcomes.length > 0 && (
              <section className="bg-muted/30 p-8 rounded-2xl border">
                <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {course.technologies && course.technologies.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {course.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2 text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {course.modules && course.modules.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <BookOpen className="text-primary h-8 w-8" />
                  Curriculum Overview
                </h2>
                <div className="space-y-4">
                  {course.modules.map((module, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">Module {module.order}: {module.title}</h3>
                        <Badge variant="outline" className="text-muted-foreground">{module.duration}</Badge>
                      </div>
                      <p className="text-muted-foreground">{module.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-card border rounded-2xl p-8 shadow-xl shadow-black/5">
              <div className="mb-8 pb-8 border-b">
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Full Price</div>
                <div className="text-4xl font-bold text-foreground mb-4">{course.price.toLocaleString()} <span className="text-xl text-muted-foreground font-normal">Ksh</span></div>
                
                <div className="bg-accent/10 text-accent-foreground border border-accent/20 rounded-lg p-4 mb-6">
                  <div className="font-semibold mb-1 flex items-center gap-2">
                    Commitment Fee
                  </div>
                  <div className="text-2xl font-bold">{course.commitmentFee.toLocaleString()} Ksh</div>
                  <p className="text-sm opacity-90 mt-1">Required to secure your spot</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Capacity</span>
                  <span className="font-medium">{course.enrolledCount} / {course.maxStudents} Enrolled</span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(course.enrolledCount / course.maxStudents) * 100}%` }}
                  />
                </div>
                {course.enrolledCount >= course.maxStudents && (
                  <p className="text-destructive text-sm font-medium text-center mt-2">Cohort is currently full</p>
                )}
              </div>

              <Button asChild size="lg" className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-primary/25 transition-all" disabled={course.enrolledCount >= course.maxStudents}>
                <Link href={`/register?courseId=${course.id}`}>
                  Apply Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                Secure checkout via M-Pesa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
