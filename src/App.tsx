
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScrollToTop from "@/components/common/ScrollToTop";

// Public pages
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Docs from "./pages/Docs";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import OrganizationDashboard from "./pages/dashboard/OrganizationDashboard";
import GovernmentDashboard from "./pages/dashboard/GovernmentDashboard";
import VerifyAddress from "./pages/dashboard/VerifyAddress";
import Profile from "./pages/dashboard/Profile";
import History from "./pages/dashboard/History";
import Documents from "./pages/dashboard/Documents";
import Notifications from "./pages/dashboard/Notifications";
import Search from "./pages/dashboard/Search";
import VerificationResults from "./pages/dashboard/VerificationResults";
import DashboardSettings from "./pages/dashboard/DashboardSettings";

// Admin pages
import Users from "./pages/dashboard/Users";
import VerificationQueue from "./pages/dashboard/VerificationQueue";
import ApiMonitor from "./pages/dashboard/ApiMonitor";
import DashboardPricing from "./pages/dashboard/DashboardPricing";

// Organization pages
import BulkUpload from "./pages/dashboard/BulkUpload";
import Verifications from "./pages/dashboard/Verifications";
import ApiAccess from "./pages/dashboard/ApiAccess";
import Activity from "./pages/dashboard/Activity";
import Billing from "./pages/dashboard/Billing";
import ConditionalEscalationCenter from "@/components/dashboard/ConditionalEscalationCenter";
import TeamManagement from "./pages/dashboard/TeamManagement";
import SystemTesting from "./pages/dashboard/SystemTesting";
import HelpSupport from "./pages/dashboard/HelpSupport";

// Simple placeholder component for routes that need implementation
const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
            {/* Public routes with navbar/footer */}
            <Route path="/" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <Index />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/how-it-works" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <HowItWorks />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/features" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <Features />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/pricing" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <Pricing />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <About />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <Contact />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/blog" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <Blog />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/blog/:slug" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <BlogPost />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/docs" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <Docs />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/faq" element={
              <div className="min-h-screen flex flex-col w-full">
                <Navbar />
                <main className="flex-1">
                  <FAQ />
                </main>
                <Footer />
              </div>
            } />

            {/* Auth routes (no navbar/footer) */}
            <Route path="/auth/welcome" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/verify-otp" element={<VerifyOTP />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Legacy auth route redirect */}
            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

            {/* Dashboard routes (protected) */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="verify" element={<VerifyAddress />} />
              <Route path="verification-results" element={<VerificationResults />} />
              <Route path="history" element={<History />} />
              <Route path="documents" element={<Documents />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="search" element={<Search />} />
              
              {/* Admin routes */}
              <Route path="users" element={<Users />} />
              <Route path="queue" element={<VerificationQueue />} />
              <Route path="api-monitor" element={<ApiMonitor />} />
              <Route path="pricing" element={<DashboardPricing />} />
              
              {/* Organization routes */}
              <Route path="bulk-upload" element={<BulkUpload />} />
              <Route path="verifications" element={<Verifications />} />
              <Route path="api" element={<ApiAccess />} />
              <Route path="activity" element={<Activity />} />
              <Route path="billing" element={<Billing />} />
              <Route path="escalation" element={<ConditionalEscalationCenter />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="help-support" element={<HelpSupport />} />
              <Route path="system-testing" element={<SystemTesting />} />
              
              {/* Placeholder routes */}
              <Route path="upgrade" element={
                <PlaceholderPage
                  title="Upgrade Plan"
                  description="Explore premium features and upgrade your subscription."
                />
              } />
              <Route path="logout" element={
                <PlaceholderPage
                  title="Logout"
                  description="You have been logged out successfully."
                />
              } />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
);

export default App;
