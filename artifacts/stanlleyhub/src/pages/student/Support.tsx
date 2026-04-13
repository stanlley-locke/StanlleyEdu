import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { HeadphonesIcon, BookOpen, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentSupport() {
  const faqs = [
    { question: "How do I access my course materials?", answer: "Once enrolled, course materials are available under 'My Courses'." },
    { question: "Can I upgrade my subscription?", answer: "Yes, you can manage your subscription from the Billing page." },
    { question: "Who do I contact for technical issues?", answer: "You can submit a support ticket right here!" },
  ];

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight uppercase">Get <span className="text-secondary">Help & Support</span></h1>
          <p className="text-slate-500 mt-2">We're here to help you succeed. Find answers or contact us directly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-xl bg-white rounded-3xl p-6 text-center hover:shadow-2xl transition-all cursor-pointer group">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <HeadphonesIcon className="text-secondary h-8 w-8" />
            </div>
            <h3 className="font-bold text-primary mb-2">Live Chat</h3>
            <p className="text-xs text-slate-500">Chat directly with our support team</p>
          </Card>
          <Card className="border-none shadow-xl bg-white rounded-3xl p-6 text-center hover:shadow-2xl transition-all cursor-pointer group">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <BookOpen className="text-secondary h-8 w-8" />
            </div>
            <h3 className="font-bold text-primary mb-2">Knowledge Base</h3>
            <p className="text-xs text-slate-500">Browse tutorials and articles</p>
          </Card>
          <Card className="border-none shadow-xl bg-white rounded-3xl p-6 text-center hover:shadow-2xl transition-all cursor-pointer group">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <MessageCircle className="text-secondary h-8 w-8" />
            </div>
            <h3 className="font-bold text-primary mb-2">Community Forum</h3>
            <p className="text-xs text-slate-500">Ask questions to other students</p>
          </Card>
          <Card className="border-none shadow-xl bg-white rounded-3xl p-6 text-center hover:shadow-2xl transition-all cursor-pointer group">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <FileText className="text-secondary h-8 w-8" />
            </div>
            <h3 className="font-bold text-primary mb-2">Submit a Ticket</h3>
            <p className="text-xs text-slate-500">For complex or account-specific issues</p>
          </Card>
        </div>

        <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden mt-8">
          <CardHeader className="p-8 border-b border-slate-100 bg-white">
            <CardTitle className="text-xl font-bold text-primary">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                <h4 className="font-bold text-primary text-md mb-2">{faq.question}</h4>
                <p className="text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
