import { StudentLayout } from "@/components/layout/StudentLayout";
import { useGetMyProgress, getGetMyProgressQueryKey, useGetMyProfile, getGetMyProfileQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Download, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentCertificate() {
  const { data: progress, isLoading: loadingProgress } = useGetMyProgress({
    query: { queryKey: getGetMyProgressQueryKey() }
  });
  
  const { data: profile, isLoading: loadingProfile } = useGetMyProfile({
    query: { queryKey: getGetMyProfileQueryKey() }
  });

  const handleDownload = () => {
    window.print();
  };

  const isLoading = loadingProgress || loadingProfile;

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-4xl mx-auto text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <Skeleton className="h-[500px] w-full rounded-xl" />
        </div>
      </StudentLayout>
    );
  }

  const isEarned = progress?.certificateEarned;

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
          <p className="text-muted-foreground mt-2">
            View and download your earned certificates.
          </p>
        </div>

        {isEarned ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="print:shadow-none print:border-none"
          >
            <Card className="overflow-hidden border-2 border-primary/20 shadow-xl print:shadow-none print:border-none print:bg-white print:text-black">
              <div id="certificate-content" className="bg-gradient-to-r from-primary/10 via-background to-primary/10 p-12 text-center border-b border-border/50 relative print:bg-white print:from-white print:to-white print:p-8">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background print:hidden" />
                <Award className="h-20 w-20 text-primary mx-auto mb-6 relative z-10 print:text-black" />
                <h2 className="text-xl text-muted-foreground tracking-[0.2em] uppercase font-medium mb-4 relative z-10 print:text-gray-500">Certificate of Completion</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 relative z-10 print:text-black">{profile?.firstName} {profile?.lastName}</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10 print:text-gray-600">
                  Has successfully completed the comprehensive <strong className="text-foreground print:text-black">{progress?.currentCourse || "Software Engineering Bootcamp"}</strong> program at StanlleyHub.
                </p>
                <div className="mt-12 flex justify-center gap-12 text-left relative z-10">
                  <div className="text-center">
                    <div className="border-b border-primary/30 w-48 mb-2 pb-2 print:border-black">
                      <span className="font-serif italic text-xl block text-center">Stanlley Locke</span>
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider print:text-gray-500">Instructor</div>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-primary/30 w-48 mb-2 pb-2 print:border-black">
                      <span className="font-serif text-xl block text-center">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider print:text-gray-500">Date</div>
                  </div>
                </div>
              </div>
              <CardContent className="bg-card flex justify-center py-6 print:hidden">
                <Button className="gap-2" size="lg" onClick={handleDownload}>
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
              </CardContent>
            </Card>
            
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                body * { visibility: hidden; }
                #certificate-content, #certificate-content * { visibility: visible; }
                #certificate-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  background: white !important;
                  border: 2px solid #000;
                  padding: 40px;
                }
              }
            `}} />
          </motion.div>
        ) : (
          <Card className="text-center py-20 border-dashed bg-muted/30">
            <CardContent>
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Certificate Locked</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                You need to complete your current course ({progress?.progressPercent || 0}% done) to unlock your certificate. Keep up the great work!
              </p>
              <div className="w-full max-w-md mx-auto bg-muted rounded-full h-3 mb-2">
                <div 
                  className="bg-primary h-3 rounded-full transition-all" 
                  style={{ width: `${progress?.progressPercent || 0}%` }}
                />
              </div>
              <p className="text-sm font-medium">{progress?.progressPercent || 0}% Complete</p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}
