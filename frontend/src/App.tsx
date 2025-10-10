import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
// import Summary from "./pages/Summary";
// import ManageUsers from "./pages/admin/ManageUsers";
// import GenerateSummary from "./pages/admin/GenerateSummary";
// import CreateMeal from "./pages/manager/CreateMeal";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />src/pages/manager
            {/* <Route
              path="/summary"
              element={
                <ProtectedRoute>
                  <Summary />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/generate-summary"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <GenerateSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/create-meal"
              element={
                <ProtectedRoute allowedRoles={['manager']}>
                  <CreateMeal />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
