import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import AiTools from "@/pages/ai-tools";
import Community from "@/pages/community";
import Education from "@/pages/education";
import AiHub from "@/pages/ai-hub";
import DeveloperTools from "@/pages/developer-tools";
import CreatorTools from "@/pages/creator-tools";
import ClientBuilder from "@/pages/client-builder";
import AiWorkers from "@/pages/ai-workers";
import Auth from "@/pages/auth";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-tools" element={<AiTools />} />
            <Route path="/community" element={<Community />} />
            <Route path="/education" element={<Education />} />
            <Route path="/ai-hub" element={<AiHub />} />
            <Route path="/developer-tools" element={<DeveloperTools />} />
            <Route path="/creator-tools" element={<CreatorTools />} />
            <Route path="/client-builder" element={<ClientBuilder />} />
            <Route path="/ai-workers" element={<AiWorkers />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;