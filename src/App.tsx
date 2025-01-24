import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Live from "./pages/Live";
import Wallet from "./pages/Wallet";
import Morpion from "./pages/Morpion";
import TournamentDetails from "./pages/TournamentDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-primary text-white">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/live" element={<Live />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/morpion" element={<Morpion />} />
            <Route path="/tournament/:id" element={<TournamentDetails />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;