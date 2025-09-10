import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import PersonalityTest from "./pages/PersonalityTest";
import Multimedia from "./pages/Multimedia";
import SuccessStories from "./pages/SuccessStories";
import Resources from "./pages/Resources";
import Feedback from "./pages/Feedback";
import Admissions from "./pages/Admissions";
import Bookmarks from "./pages/Bookmarks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/personality-test" element={<PersonalityTest />} />
              <Route path="/multimedia" element={<Multimedia />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
