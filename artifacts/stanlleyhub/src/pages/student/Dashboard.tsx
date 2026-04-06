import { StudentLayout } from "@/components/layout/StudentLayout";
import { useGetMyProfile, getGetMyProfileQueryKey, useGetMyProgress, getGetMyProgressQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Clock, Calendar, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const { data: profile, isLoading: loadingProfile } = useGetMyProfile({
    query: { queryKey: getGetMyProfileQueryKey() }
  });

  const { data: progress, isLoading: loadingProgress } = useGetMyProgress({
    query: { queryKey: getGetMyProgressQueryKey() }
  });

  const isLoading = loadingProfile || loadingProgress;

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/3 mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.firstName}!</h1>
          <p className="text-muted-foreground mt-2">Here is an overview of your learning progress.</p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Course</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{progress?.currentCourse || "None"}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {profile?.registrations?.filter(r => r.status === 'approved').length || 0} Enrolled
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress?.progressPercent || 0}%</div>
              <Progress value={progress?.progressPercent || 0} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Modules Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress?.completedModules || 0} / {progress?.totalModules || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {progress?.daysRemaining || 0} days remaining in cohort
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>My Registrations</CardTitle>
              <CardDescription>Your current course enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              {profile?.registrations && profile.registrations.length > 0 ? (
                <div className="space-y-4">
                  {profile.registrations.map(reg => (
                    <div key={reg.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{reg.courseName}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-4">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(reg.registeredAt).toLocaleDateString()}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            reg.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            reg.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {reg.status}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/courses/${reg.courseId}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You are not enrolled in any courses yet.</p>
                  <Button asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Announcements/Info */}
          <Card>
            <CardHeader>
              <CardTitle>Important Announcements</CardTitle>
              <CardDescription>Updates from StanlleyHub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-medium text-sm text-primary mb-1">Welcome to StanlleyHub!</p>
                  <p className="text-sm text-muted-foreground">The May cohort is starting soon. Make sure to complete your profile and prepare your development environment.</p>
                </div>
                
                {progress?.certificateEarned && (
                  <div className="border-l-4 border-accent pl-4 bg-accent/5 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-accent" />
                      <p className="font-bold text-accent">Certificate Earned!</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Congratulations on completing your course! Your certificate is ready.</p>
                    <Button variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent hover:text-white">
                      <Link href="/student/certificate">View Certificate</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
