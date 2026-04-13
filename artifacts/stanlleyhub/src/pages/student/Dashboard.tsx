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
        <div className="space-y-8 p-4">
          <Skeleton className="h-12 w-64 rounded-2xl" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-3xl" />)}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Skeleton className="h-[400px] w-full rounded-[3rem]" />
            <Skeleton className="h-[400px] w-full rounded-[3rem]" />
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-12 max-w-7xl mx-auto py-8 px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
              <Zap className="h-3 w-3 text-secondary fill-secondary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Active Session</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter uppercase leading-none">
              Welcome back, <br/>
              <span className="text-secondary">{profile?.firstName}!</span>
            </h1>
            <p className="text-lg text-muted-foreground font-bold tracking-tight italic">
              Here is an overview of your engineering progress.
            </p>
          </div>
        </motion.div>

        {/* Technical Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              label: "Current Track", 
              value: progress?.currentCourse || "System Initialization", 
              sub: `${profile?.registrations?.filter(r => r.status === 'approved').length || 0} Active Tracks`,
              icon: Layout 
            },
            { 
              label: "System Progress", 
              value: `${progress?.progressPercent || 0}%`, 
              sub: "Performance Index",
              icon: Clock,
              chart: true
            },
            { 
              label: "Modules Deployed", 
              value: `${progress?.completedModules || 0} / ${progress?.totalModules || 0}`, 
              sub: `${progress?.daysRemaining || 0} Delta Days`,
              icon: CheckCircle 
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-[2.5rem] bg-white border border-black/5 hover:border-secondary/30 transition-all duration-500 shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-[#FAFAFA] flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                  <stat.icon className="h-6 w-6 text-muted-foreground/30 group-hover:text-secondary transition-colors" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">{stat.label}</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary tracking-tighter truncate uppercase">{stat.value}</div>
                <p className="text-xs font-bold text-muted-foreground italic">{stat.sub}</p>
              </div>
              {stat.chart && (
                <div className="mt-6 pt-6 border-t border-black/5">
                  <Progress value={progress?.progressPercent || 0} className="h-2 bg-[#FAFAFA]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Active Registrations Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] bg-white border border-black/5 overflow-hidden shadow-sm flex flex-col"
          >
            <div className="p-10 border-b border-black/5 flex justify-between items-center bg-[#FAFAFA]/50">
              <div>
                <h3 className="text-2xl font-black text-primary tracking-tighter uppercase mb-1">My Registrations</h3>
                <p className="text-xs font-bold text-muted-foreground italic">Your engineering track enrollments</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-black/5 flex items-center justify-center">
                 <BookOpen className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>
            
            <div className="p-10 flex-1">
              {profile?.registrations && profile.registrations.length > 0 ? (
                <div className="space-y-6">
                  {profile.registrations.map(reg => (
                    <div key={reg.id} className="group p-6 rounded-3xl bg-[#FAFAFA] border border-transparent hover:border-black/5 transition-all flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <p className="font-black text-lg text-primary tracking-tight uppercase">{reg.courseName}</p>
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            reg.status === 'approved' ? 'bg-[#00C389]/10 text-[#00C389]' :
                            reg.status === 'pending' ? 'bg-secondary/10 text-secondary' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {reg.status}
                          </span>
                        </div>
                        <div className="flex items-center text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest gap-4">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date(reg.registeredAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-2xl group-hover:bg-white transition-all shadow-sm group-hover:text-secondary">
                        <Link href={`/courses/${reg.courseId}`}><ArrowRight className="h-5 w-5" /></Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-8">
                  <div className="w-20 h-20 bg-[#FAFAFA] rounded-full flex items-center justify-center mx-auto border border-black/5">
                    <BookOpen className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-primary uppercase tracking-tighter">No Active Tracks Found</p>
                    <p className="text-sm font-bold text-muted-foreground italic">You are not enrolled in any courses yet.</p>
                  </div>
                  <Button asChild className="h-14 px-8 rounded-2xl bg-primary text-secondary font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                    <Link href="/courses">Browse Tracks</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Announcements & Comms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="rounded-[3rem] bg-white border border-black/5 p-10 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black text-primary tracking-tighter uppercase mb-1">System Bulletins</h3>
                  <p className="text-xs font-bold text-muted-foreground italic">Updates from StanlleyHub Control</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-secondary" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-secondary/30 py-2">
                  <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-secondary" />
                  <p className="font-black text-sm text-primary uppercase tracking-tight mb-2">Welcome to StanlleyHub!</p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                    The next engineering cohort sequence is initializing soon. Review your development environment specs in the onboarding documentation.
                  </p>
                </div>
                
                {progress?.certificateEarned && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="p-8 rounded-[2rem] bg-primary text-white space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 blur-[60px]" />
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-secondary fill-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/40">Achievement Unlocked</p>
                        <p className="text-xl font-bold tracking-tight">Certificate Earned!</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 font-medium leading-snug italic">
                      Mission successful. Your verified engineering credentials are ready for deployment.
                    </p>
                    <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                      <Link href="/student/certificate text-white">Extract Credentials</Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Support Quick Link */}
            <div className="rounded-[2.5rem] bg-[#FAFAFA] border border-black/5 p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-sm font-black text-primary">?</div>
                <div>
                   <p className="text-sm font-black text-primary uppercase tracking-tight">Need Technical Specs?</p>
                   <p className="text-xs font-bold text-muted-foreground italic">Our lead mentors are online.</p>
                </div>
              </div>
              <Button variant="ghost" className="h-12 px-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white shadow-sm">
                Connect
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </StudentLayout>
  );
}
