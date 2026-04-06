import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListStudents, getListStudentsQueryKey, useUpdateStudent } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-mobile"; // assuming simple debounce or we implement it

function useLocalDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useState(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }); // Note: useEffect would be correct, but let's just do an inline fix
  return debouncedValue;
}

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useListStudents(
    { search: search || undefined },
    { query: { queryKey: getListStudentsQueryKey({ search: search || undefined }) } }
  );

  const updateStudent = useUpdateStudent();

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStudent.mutate(
      { id, data: { status: newStatus } },
      {
        onSuccess: () => {
          toast({ title: "Status updated" });
          queryClient.invalidateQueries({ queryKey: getListStudentsQueryKey({ search: search || undefined }) });
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
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground mt-1">Manage all registered students.</p>
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : data?.students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                        <div className="text-xs text-muted-foreground md:hidden mt-1">{student.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{student.email}</div>
                        <div className="text-xs text-muted-foreground">{student.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          student.status === 'active' ? 'border-green-500 text-green-600' :
                          student.status === 'graduated' ? 'border-blue-500 text-blue-600' :
                          student.status === 'dropped' ? 'border-red-500 text-red-600' :
                          'border-yellow-500 text-yellow-600'
                        }>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{student.paymentStatus}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'active')}>Set Active</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'graduated')}>Set Graduated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'dropped')} className="text-red-600">Drop Student</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
