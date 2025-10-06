import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import TemanAuth from "./pages/auth/TemanAuth";
import MitraAuth from "./pages/auth/MitraAuth";

import TemanDashboard from "./pages/teman/Dashboard";
import TemanRiwayat from "./pages/teman/Riwayat";
import TemanPencairan from "./pages/teman/Pencairan";
import TemanProfil from "./pages/teman/Profil";

import MitraDashboard from "./pages/mitra/Dashboard";
import MitraRiwayat from "./pages/mitra/Riwayat";
import MitraPencairan from "./pages/mitra/Pencairan";
import MitraProfil from "./pages/mitra/Profil";
import MachineDetail from "./pages/mitra/MachineDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/auth/teman" element={<TemanAuth />} />
          <Route path="/auth/mitra" element={<MitraAuth />} />
          
          {/* Teman Routes */}
          <Route path="/teman/dashboard" element={<TemanDashboard />} />
          <Route path="/teman/riwayat" element={<TemanRiwayat />} />
          <Route path="/teman/pencairan" element={<TemanPencairan />} />
          <Route path="/teman/profil" element={<TemanProfil />} />
          
          {/* Mitra Routes */}
          <Route path="/mitra/dashboard" element={<MitraDashboard />} />
          <Route path="/mitra/riwayat" element={<MitraRiwayat />} />
          <Route path="/mitra/pencairan" element={<MitraPencairan />} />
          <Route path="/mitra/profil" element={<MitraProfil />} />
          <Route path="/mitra/machine/:id" element={<MachineDetail />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
