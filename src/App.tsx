import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { I18nProvider } from "@/hooks/useI18n";
import Home from "./pages/Home";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'ADMIN' | 'USER' }) {
  const { isAuthenticated, user } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  if (requiredRole && user?.type !== requiredRole) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

// Dashboard Router Component
function DashboardRouter() {
  const { user } = useAuth()
  
  if (user?.type === 'ADMIN') {
    return <Navigate to="/admin" replace />
  } else {
    return <Navigate to="/client" replace />
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route 
                path="/client" 
                element={
                  <ProtectedRoute requiredRole="USER">
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
