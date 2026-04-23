import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/contexts/I18nContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SiteLayout from "@/components/site/SiteLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Discover from "./pages/Discover";
import StylistProfile from "./pages/StylistProfile";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import HowItWorksPage from "./pages/HowItWorksPage";
import Contact from "./pages/Contact";
import { Privacy, Terms, Impressum } from "./pages/Legal";
import UserDashboard from "./pages/dashboard/UserDashboard";
import StylistDashboard from "./pages/dashboard/StylistDashboard";
import AdminPanel from "./pages/dashboard/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/stylists/:id" element={<StylistProfile />} />
                <Route path="/book/:id" element={<Booking />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute role="customer">
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/stylist"
                  element={
                    <ProtectedRoute role="stylist">
                      <StylistDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
