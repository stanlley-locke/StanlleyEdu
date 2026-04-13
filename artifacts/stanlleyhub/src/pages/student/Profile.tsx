import { StudentLayout } from "@/components/layout/StudentLayout";
import { useGetMyProfile, getGetMyProfileQueryKey, useUpdateStudent } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, User, Settings } from "lucide-react";
import { useEffect, useRef } from "react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone number is required"),
  bio: z.string().optional(),
});

export default function StudentProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const initialized = useRef(false);
  
  const { data: profile, isLoading } = useGetMyProfile({
    query: { queryKey: getGetMyProfileQueryKey() }
  });

  const updateProfile = useUpdateStudent();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (profile && !initialized.current) {
      form.reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      });
      initialized.current = true;
    }
  }, [profile, form]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    if (!profile) return;
    
    updateProfile.mutate(
      { id: profile.id, data: values },
      {
        onSuccess: (data) => {
          toast({
            title: "Profile Updated",
            description: "Your personal information has been saved successfully.",
          });
          queryClient.setQueryData(getGetMyProfileQueryKey(), (old: any) => 
            old ? { ...old, ...data } : old
          );
        },
        onError: (err) => {
          toast({
            title: "Update Failed",
            description: "Could not update your profile. Please try again.",
            variant: "destructive",
          });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-3xl mx-auto">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight uppercase">My <span className="text-secondary">Profile</span></h1>
          <p className="text-slate-500 mt-2">Manage your personal information and preferences.</p>
        </div>

        <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
          <CardHeader className="bg-primary text-white p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                <CardDescription className="text-slate-300 mt-1">Update your contact details and bio.</CardDescription>
              </div>
              <Settings className="text-secondary h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden relative group">
                    {profile?.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-10 w-10 text-slate-400 group-hover:text-secondary transition-colors" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary">{profile?.firstName} {profile?.lastName}</h3>
                    <p className="text-slate-500">{profile?.email}</p>
                    <div className="text-[10px] bg-secondary/20 text-primary px-3 py-1 rounded-full inline-block mt-2 font-black uppercase tracking-wider">
                      Student Account
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us a bit about yourself..." 
                          className="resize-none h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-8 mt-8 border-t border-slate-100">
                  <Button type="submit" disabled={updateProfile.isPending} className="bg-primary text-white hover:bg-primary/90 font-bold rounded-xl px-8 py-6">
                    {updateProfile.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
