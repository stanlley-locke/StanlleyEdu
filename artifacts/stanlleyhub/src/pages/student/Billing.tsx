import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { CreditCard, History, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentBilling() {
  const transactions = [
    { id: "TRX-001", date: "2026-04-01", amount: "$499.00", status: "Paid", course: "Frontend Engineering Bootcamp" },
    { id: "TRX-002", date: "2026-03-15", amount: "$299.00", status: "Paid", course: "UI/UX Design Fundamentals" },
  ];

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight uppercase">Billing & <span className="text-secondary">Payments</span></h1>
          <p className="text-slate-500 mt-2">Manage your subscriptions and view transaction history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-white p-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold">Current Balance</CardTitle>
                <CreditCard className="text-secondary h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-4xl font-black text-primary">$0.00</div>
              <p className="text-sm text-slate-400 mt-2">No outstanding payments</p>
              <Button className="w-full mt-6 bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-xl py-6">
                Add Funds
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <ShieldCheck className="text-secondary h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold text-primary">Payment Security</h3>
              <p className="text-sm text-slate-500 mt-2">Your payment information is encrypted and processed securely through our partners.</p>
            </div>
            <Button variant="link" className="text-secondary p-0 h-auto font-bold mt-4 justify-start">
              Learn more
            </Button>
          </Card>

          <Card className="border-none shadow-xl bg-white rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <Download className="text-secondary h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold text-primary">Tax Invoices</h3>
              <p className="text-sm text-slate-500 mt-2">Need a formal invoice for your employer? Download them from the history below.</p>
            </div>
            <Button variant="link" className="text-secondary p-0 h-auto font-bold mt-4 justify-start">
              Request Invoice
            </Button>
          </Card>
        </div>

        <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <History className="text-secondary h-6 w-6" />
              <CardTitle className="text-xl font-bold text-primary">Transaction History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FAFAFA] text-slate-400 uppercase text-[10px] font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Course / Description</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-primary">{trx.course}</p>
                        <p className="text-xs text-slate-400">{trx.id}</p>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-600">{trx.date}</td>
                      <td className="px-8 py-6 font-bold text-primary">{trx.amount}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary hover:bg-secondary/10">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
