import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListCourses, getListCoursesQueryKey, useDeleteCourse } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function AdminCourses() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useListCourses(
    {},
    { query: { queryKey: getListCoursesQueryKey({}) } }
  );

  const deleteCourse = useDeleteCourse();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      deleteCourse.mutate(
        { id },
        {
          onSuccess: () => {
            toast({ title: "Course deleted" });
            queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey({}) });
          },
          onError: () => {
            toast({ title: "Delete failed", variant: "destructive" });
          }
        }
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground mt-1">Manage curriculum and cohorts.</p>
          </div>
          <Button className="shrink-0" disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : (data ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No courses found.
                    </TableCell>
                  </TableRow>
                ) : (
                  (data ?? []).map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="line-clamp-1">{course.title}</div>
                        <div className="text-xs text-muted-foreground font-normal mt-1">{course.duration} | {course.level}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{course.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          course.status === 'active' ? 'border-green-500 text-green-600' :
                          course.status === 'draft' ? 'border-gray-500 text-gray-600' :
                          'border-yellow-500 text-yellow-600'
                        }>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-secondary h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full" 
                              style={{ width: `${(course.enrolledCount / course.maxStudents) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{course.enrolledCount}/{course.maxStudents}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {course.price.toLocaleString()} Ksh
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/courses/${course.id}`} className="cursor-pointer">
                                View Public Page
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(course.id)}>
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
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
