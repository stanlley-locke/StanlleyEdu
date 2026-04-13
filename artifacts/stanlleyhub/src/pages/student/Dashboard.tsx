import { StudentLayout } from "@/components/layout/StudentLayout";
import { useGetMyProfile, getGetMyProfileQueryKey, useGetMyProgress, getGetMyProgressQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Clock, Calendar, Award, Zap, ArrowRight, Bell, Layout } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tighter uppercase">Welcome back, {profile?.firstName}!</h1>
          <p className="text-slate-500 font-bold mt-2 italic">Here is an overview of your learning progress.</p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Current Course</CardTitle>
              <BookOpen className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-black text-primary tracking-tighter uppercase truncate">{progress?.currentCourse || "None"}</div>
              <p className="text-xs font-bold text-slate-400 mt-1 italic">
                {profile?.registrations?.filter(r => r.status === 'approved').length || 0} Enrolled
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Overall Progress</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-black text-primary tracking-tighter">{progress?.progressPercent || 0}%</div>
              <Progress value={progress?.progressPercent || 0} className="mt-4 h-2 bg-slate-100" />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Modules Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-black text-primary tracking-tighter">{progress?.completedModules || 0} / {progress?.totalModules || 0}</div>
              <p className="text-xs font-bold text-slate-400 mt-1 italic">
                {progress?.daysRemaining || 0} days remaining in cohort
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Registrations */}
          <Card className="border-slate-200 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-black text-primary tracking-tighter uppercase">My Registrations</CardTitle>
              <CardDescription className="font-bold text-slate-400 italic">Your current course enrollments</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 font-sans">
              {profile?.registrations && profile.registrations.length > 0 ? (
                <div className="space-y-4">
                  {profile.registrations.map(reg => (
                    <div key={reg.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-secondary/20 transition-all">
                      <div>
                        <p className="font-bold text-primary uppercase tracking-tight">{reg.courseName}</p>
                        <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 gap-4">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(reg.registeredAt).toLocaleDateString()}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                            reg.status === 'approved' ? 'bg-green-100 text-green-700' :
                            reg.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {reg.status}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="rounded-lg border-slate-200 font-bold hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                        <Link href={`/courses/${reg.courseId}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-bold mb-6 italic">You are not enrolled in any courses yet.</p>
                  <Button asChild className="bg-secondary text-primary font-black uppercase tracking-widest hover:bg-secondary/90 shadow-lg shadow-secondary/10 px-8 h-12 rounded-xl">
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Announcements/Info */}
          <Card className="border-slate-200 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-black text-primary tracking-tighter uppercase">Important Announcements</CardTitle>
              <CardDescription className="font-bold text-slate-400 italic">Updates from StanlleyHub</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 font-sans">
              <div className="space-y-6">
                <div className="border-l-4 border-secondary pl-6 py-1">
                  <p className="font-black text-sm text-primary uppercase tracking-tight mb-1">Welcome to StanlleyHub!</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">The May cohort is starting soon. Make sure to complete your profile and prepare your development environment.</p>
                </div>
                
                {progress?.certificateEarned && (
                  <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="h-6 w-6 text-primary" />
                      <p className="font-black text-primary uppercase tracking-tight">Certificate Earned!</p>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-4 italic">Congratulations on completing your course! Your physical engineering credentials are ready.</p>
                    <Button variant="outline" size="sm" asChild className="w-full h-12 border-primary text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-secondary rounded-xl">
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
