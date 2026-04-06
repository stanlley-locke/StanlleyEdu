import { StudentLayout } from "@/components/layout/StudentLayout";
import { useGetMyProfile, getGetMyProfileQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Calendar, Clock } from "lucide-react";

export default function StudentCourses() {
  const { data: profile, isLoading } = useGetMyProfile({
    query: { queryKey: getGetMyProfileQueryKey() }
  });

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </StudentLayout>
    );
  }

  const registrations = profile?.registrations || [];

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground mt-2">Manage your enrolled courses and applications.</p>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-dashed">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">You haven't applied for any courses yet.</p>
            <Button asChild>
              <Link href="/courses">Browse Curriculum</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {registrations.map((reg) => (
              <Card key={reg.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={
                      reg.status === 'approved' ? 'border-green-500 text-green-600' :
                      reg.status === 'pending' ? 'border-yellow-500 text-yellow-600' :
                      'border-red-500 text-red-600'
                    }>
                      {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                    <Badge variant="secondary">{reg.paymentStatus}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{reg.courseName}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: {new Date(reg.registeredAt).toLocaleDateString()}</span>
                  </div>
                  
                  {reg.amountPaid !== null && reg.amountPaid !== undefined && (
                    <div className="bg-muted p-3 rounded-md mt-4">
                      <div className="text-sm text-muted-foreground mb-1">Amount Paid</div>
                      <div className="font-medium">{reg.amountPaid} Ksh</div>
                    </div>
                  )}
                  
                  {reg.status === 'pending' && reg.paymentStatus !== 'paid' && (
                    <div className="bg-primary/5 border border-primary/20 p-3 rounded-md text-sm">
                      Please complete your commitment fee payment to secure your spot.
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-4 border-t bg-muted/10">
                  <Button asChild className="w-full" variant={reg.status === 'approved' ? 'default' : 'outline'}>
                    <Link href={`/courses/${reg.courseId}`}>
                      Course Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
