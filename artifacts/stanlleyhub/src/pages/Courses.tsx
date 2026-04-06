import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListCourses, getListCoursesQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Users, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Courses() {
  const [category, setCategory] = useState<string | null>(null);
  
  const { data: coursesData, isLoading } = useListCourses(
    { status: "active", category },
    { query: { queryKey: getListCoursesQueryKey({ status: "active", category }) } }
  );

  const categories = ["All", "Web Development", "Python", "AI", "DevOps"];

  return (
    <PublicLayout>
      <div className="bg-muted/30 py-12 md:py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Curriculum</h1>
            <p className="text-xl text-muted-foreground">
              Intensive, project-based courses designed to get you market-ready in 3 months.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={category === (cat === "All" ? null : cat) ? "default" : "outline"}
                onClick={() => setCategory(cat === "All" ? null : cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : coursesData?.courses.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
            <h3 className="text-xl font-medium text-muted-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Check back later for new cohorts.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData?.courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all border-border/50 hover:border-primary/30 group">
                  <div className="h-48 relative overflow-hidden bg-muted">
                    <img 
                      src={course.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80`} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground shadow-sm">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">{course.category}</Badge>
                      <div className="text-lg font-bold text-primary">{course.price} Ksh</div>
                    </div>
                    <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {course.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {course.enrolledCount} / {course.maxStudents}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t bg-muted/10">
                    <Button asChild className="w-full group-hover:bg-primary">
                      <Link href={`/courses/${course.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
