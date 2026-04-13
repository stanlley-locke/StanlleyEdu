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
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight uppercase">My <span className="text-secondary">Certificates</span></h1>
          <p className="text-slate-500 mt-2">
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
            <Card className="overflow-hidden border-none shadow-xl bg-white rounded-3xl print:shadow-none print:border-none print:bg-white print:text-black">
              <div id="certificate-content" className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-16 text-center border-b border-slate-100 relative print:bg-white print:from-white print:to-white print:p-8">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background print:hidden pointer-events-none" />
                <Award className="h-24 w-24 text-secondary mx-auto mb-8 relative z-10 print:text-black" />
                <h2 className="text-2xl text-primary/60 tracking-[0.3em] uppercase font-bold mb-6 relative z-10 print:text-gray-500">Certificate of Completion</h2>
                <h3 className="text-5xl md:text-6xl font-serif font-black text-primary mb-8 relative z-10 print:text-black">{profile?.firstName} {profile?.lastName}</h3>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto relative z-10 print:text-gray-600 leading-relaxed">
                  Has successfully completed the comprehensive <strong className="text-primary print:text-black">{progress?.currentCourse || "Software Engineering Bootcamp"}</strong> program at StanlleyHub.
                </p>
                <div className="mt-12 flex justify-center gap-12 text-left relative z-10">
                  <div className="text-center">
                    <div className="border-b-2 border-secondary w-48 mb-3 pb-3 print:border-black">
                      <span className="font-serif italic text-2xl block text-center text-primary">Stanlley Locke</span>
                    </div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest print:text-gray-500">Instructor</div>
                  </div>
                  <div className="text-center">
                    <div className="border-b-2 border-secondary w-48 mb-3 pb-3 print:border-black">
                      <span className="font-serif text-2xl block text-center text-primary">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest print:text-gray-500">Date</div>
                  </div>
                </div>
              </div>
              <CardContent className="bg-white flex justify-center py-8 print:hidden">
                <Button className="gap-2 bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-xl px-8 py-6 text-lg" onClick={handleDownload}>
                  <Download className="h-5 w-5" /> Download PDF
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
          <Card className="text-center py-24 border-none shadow-xl bg-white rounded-3xl">
            <CardContent>
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-dashed animate-[spin_10s_linear_infinite]" />
                <Lock className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4">Certificate Locked</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
                You need to complete your current course ({progress?.progressPercent || 0}% done) to unlock your certificate. Keep up the great work, you're almost there!
              </p>
              <div className="w-full max-w-md mx-auto bg-slate-100 rounded-full h-4 mb-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-secondary h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progress?.progressPercent || 0}%` }}
                />
              </div>
              <p className="text-sm font-bold text-primary uppercase tracking-wider">{progress?.progressPercent || 0}% Complete</p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}
