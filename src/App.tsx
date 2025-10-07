import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Loading from "./pages/Loading";
import Resultado from "./pages/Resultado";
import Checkout from "./pages/Checkout";
import Obrigado from "./pages/Obrigado";
import Upsell from "./pages/Upsell";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/upsell" element={<Upsell />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
