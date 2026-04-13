import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { Users, MessageSquare, Globe, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentCommunity() {
  const groups = [
    { title: "Frontend Developers", members: "1.2k", topic: "React, Vue, Tailwind", active: true },
    { title: "UI/UX Designers", members: "850", topic: "Figma, Design Systems", active: true },
    { title: "Career Growth", members: "2.1k", topic: "Interview Prep, Networking", active: false },
  ];

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight uppercase">Student <span className="text-secondary">Community</span></h1>
            <p className="text-slate-500 mt-2">Connect with peers, share knowledge, and grow together.</p>
          </div>
          <Button className="bg-primary text-white hover:bg-primary/90 font-bold rounded-xl px-8 py-6">
            <Sparkles className="mr-2 h-5 w-5 text-secondary" />
            Join New Group
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-100 bg-white">
                <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                  <Globe className="text-secondary h-6 w-6" />
                  Active Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-secondary/30 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center font-bold text-primary">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-primary group-hover:text-secondary transition-colors">How to handle complex state in React?</h4>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">2h ago</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">I'm working on a large dashboard and wondering what the best practices are for managing global state...</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MessageSquare className="h-3 w-3" /> 12 replies
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Users className="h-3 w-3" /> 45 views
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-100 bg-white">
                <CardTitle className="text-xl font-bold text-primary">Popular Groups</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {groups.map((group, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAFAFA] border border-transparent hover:border-secondary/20 transition-all">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-primary text-sm">{group.title}</h4>
                      {group.active && <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />}
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{group.topic}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase">{group.members} Members</span>
                      <Button variant="ghost" size="sm" className="text-secondary font-bold text-xs h-8 hover:bg-secondary/10">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-primary text-white rounded-3xl p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <MapPin className="text-secondary h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Local Meetups</h3>
                <p className="text-sm text-slate-300 mb-6">Find other StanlleyHub students in your city for in-person coding sessions.</p>
                <Button className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-xl">
                  Check Map
                </Button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Globe className="h-40 w-40" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
