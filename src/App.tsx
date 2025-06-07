
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
import NotFound from "./pages/NotFound";

// Auth pages
import Welcome from "./pages/auth/Welcome";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Dashboard pages (will be created next)
// import Dashboard from "./pages/dashboard/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
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

            {/* Auth routes (no navbar/footer) */}
            <Route path="/auth/welcome" element={<Welcome />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* Legacy auth route redirect */}
            <Route path="/auth" element={<Welcome />} />

            {/* Dashboard routes (protected, will be added next) */}
            {/* <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } /> */}

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
