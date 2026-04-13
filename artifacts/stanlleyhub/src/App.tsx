import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth";

// Pages
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Mentor from "@/pages/Mentor";
import Connect from "@/pages/Connect";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCourses from "@/pages/student/Courses";
import StudentProfile from "@/pages/student/Profile";
import StudentCertificate from "@/pages/student/Certificate";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminStudents from "@/pages/admin/Students";
import AdminCourses from "@/pages/admin/Courses";
import AdminRegistrations from "@/pages/admin/Registrations";
import AdminSettings from "@/pages/admin/Settings";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component, allowedRole }: { component: any, allowedRole: 'student' | 'admin' }) {
  const { token, role } = useAuth();
  const [, setLocation] = useLocation();

  if (!token) {
    setLocation('/login');
    return null;
  }

  if (role !== allowedRole) {
    setLocation(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/mentor" component={Mentor} />
      <Route path="/connect" component={Connect} />

      {/* Student Portal */}
      <Route path="/student/dashboard">
        {() => <ProtectedRoute allowedRole="student" component={StudentDashboard} />}
      </Route>
      <Route path="/student/courses">
        {() => <ProtectedRoute allowedRole="student" component={StudentCourses} />}
      </Route>
      <Route path="/student/profile">
        {() => <ProtectedRoute allowedRole="student" component={StudentProfile} />}
      </Route>
      <Route path="/student/certificate">
        {() => <ProtectedRoute allowedRole="student" component={StudentCertificate} />}
      </Route>

      {/* Admin Panel */}
      <Route path="/admin/dashboard">
        {() => <ProtectedRoute allowedRole="admin" component={AdminDashboard} />}
      </Route>
      <Route path="/admin/students">
        {() => <ProtectedRoute allowedRole="admin" component={AdminStudents} />}
      </Route>
      <Route path="/admin/courses">
        {() => <ProtectedRoute allowedRole="admin" component={AdminCourses} />}
      </Route>
      <Route path="/admin/registrations">
        {() => <ProtectedRoute allowedRole="admin" component={AdminRegistrations} />}
      </Route>
      <Route path="/admin/settings">
        {() => <ProtectedRoute allowedRole="admin" component={AdminSettings} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
