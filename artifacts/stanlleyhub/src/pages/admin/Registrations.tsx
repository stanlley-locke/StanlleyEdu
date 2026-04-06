import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListRegistrations, getListRegistrationsQueryKey, useUpdateRegistration } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminRegistrations() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const queryParams = { status: statusFilter === "all" ? undefined : statusFilter };
  
  const { data, isLoading } = useListRegistrations(
    queryParams,
    { query: { queryKey: getListRegistrationsQueryKey(queryParams) } }
  );

  const updateRegistration = useUpdateRegistration();

  const handleUpdate = (id: number, status: string, paymentStatus?: string) => {
    updateRegistration.mutate(
      { id, data: { status, ...(paymentStatus ? { paymentStatus } : {}) } },
      {
        onSuccess: () => {
          toast({ title: "Registration updated" });
          queryClient.invalidateQueries({ queryKey: getListRegistrationsQueryKey(queryParams) });
          // Also invalidate dashboard stats
        },
        onError: () => {
          toast({ title: "Update failed", variant: "destructive" });
        }
      }
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Registrations</h1>
            <p className="text-muted-foreground mt-1">Review and manage student applications.</p>
          </div>
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Registrations</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-24 mt-1" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : data?.registrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No registrations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">
                        {reg.studentName}
                        <div className="text-xs text-muted-foreground font-normal">{reg.studentEmail}</div>
                      </TableCell>
                      <TableCell>
                        <div className="line-clamp-1">{reg.courseName}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 items-start">
                          <Badge variant="secondary" className={
                            reg.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                            reg.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            ''
                          }>
                            {reg.paymentStatus}
                          </Badge>
                          {reg.paymentReference && (
                            <span className="text-[10px] text-muted-foreground font-mono">{reg.paymentReference}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          reg.status === 'approved' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                          reg.status === 'rejected' ? 'border-red-500/50 text-red-400 bg-red-500/10' :
                          'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
                        }>
                          {reg.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {reg.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                                onClick={() => handleUpdate(reg.id, 'approved', 'paid')}
                                disabled={updateRegistration.isPending}
                              >
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                onClick={() => handleUpdate(reg.id, 'rejected')}
                                disabled={updateRegistration.isPending}
                              >
                                <XCircle className="h-3.5 w-3.5 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {reg.status !== 'approved' && (
                                <DropdownMenuItem className="text-green-400" onClick={() => handleUpdate(reg.id, 'approved', 'paid')}>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Approve & Mark Paid
                                </DropdownMenuItem>
                              )}
                              {reg.status !== 'rejected' && (
                                <DropdownMenuItem className="text-red-400" onClick={() => handleUpdate(reg.id, 'rejected')}>
                                  <XCircle className="mr-2 h-4 w-4" /> Reject Application
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
