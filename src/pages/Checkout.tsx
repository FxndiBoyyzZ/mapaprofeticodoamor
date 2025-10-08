import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, Lock, Sparkles, Heart, Gift, ArrowRight, Clock } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";
import quizBg from "@/assets/quiz-bg.png";

const Checkout = () => {
  const CHECKOUT_URL = "https://pay.cakto.com.br/7k6p9n7_596897";
  const PRECO = "27";
  
  const navigate = useNavigate();
  const { trackViewContent, trackInitiateCheckout } = useTracking();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    // Track ViewContent on page load
    trackViewContent({
      content_name: "checkout_page",
      content_category: "checkout"
    });

    // Sticky CTA visibility on scroll
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowSticky(scrollPercentage > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackViewContent]);

  const goToCheckout = () => {
    // Track InitiateCheckout
    trackInitiateCheckout(Number(PRECO));
    
    // Redirect with tracking params
    const checkoutUrlWithParams = tracking.appendParams(CHECKOUT_URL);
    window.location.href = checkoutUrlWithParams;
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Mapa Profético do Seu Futuro Amoroso</title>
        <meta name="description" content="Garanta agora seu Mapa Profético completo com desconto exclusivo" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div 
        className="min-h-screen w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${quizBg})` }}
      >
        <div className="pb-24 px-4 pt-8">
          <div className="container mx-auto max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in-up">
              <Badge className="bg-golden text-golden-foreground mb-4 px-4 py-1.5 animate-pulse">
                ✨ Oferta Exclusiva
              </Badge>
              <h1 className="text-white mb-3 font-bold">
                💌 Complete Seu Mapa Profético Agora
              </h1>
              <p className="text-base text-white/80">
                Receba acesso imediato ao seu Mapa completo + Bônus exclusivos
              </p>
            </div>

            {/* Main Card */}
            <div 
              className="p-8 mb-6 animate-fade-in-up rounded-xl" 
              style={{ 
                animationDelay: "150ms",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(40, 30, 25, 0.9)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
                border: "2px solid rgba(230, 126, 34, 0.3)"
              }}
            >
              {/* Pricing */}
              <div className="text-center mb-8 pb-8 border-b border-white/10">
                <p className="text-sm text-white/60 mb-2">Investimento hoje:</p>
                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-lg line-through text-white/40">R$ 97</span>
                  <h2 className="text-5xl font-bold" style={{ color: '#E67E22' }}>R$ {PRECO}</h2>
                  <Badge className="bg-destructive text-white font-bold text-sm">-72% OFF</Badge>
                </div>
                <p className="text-sm text-white/80">
                  Pagamento único • Acesso vitalício • Sem mensalidade
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4 text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#E67E22' }} />
                  O que você vai receber:
                </h3>
                
                <div className="space-y-3">
                  {[
                    { icon: Heart, text: "Mapa Profético completo personalizado (PDF)" },
                    { icon: Clock, text: "Quando você vai conhecer (timing divino revelado)" },
                    { icon: Sparkles, text: "Como será essa pessoa (perfil espiritual detalhado)" },
                    { icon: CheckCircle2, text: "Sinais de confirmação práticos" },
                    { icon: Gift, text: "Plano de oração para 7 dias" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(230, 126, 34, 0.1)" }}>
                      <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#E67E22' }} />
                      <span className="text-sm text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonuses */}
              <div 
                className="mb-8 p-6 rounded-lg"
                style={{
                  background: "rgba(230, 126, 34, 0.15)",
                  border: "1px solid rgba(230, 126, 34, 0.3)"
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5" style={{ color: '#F39C12' }} />
                  <h3 className="text-white font-semibold">+ Bônus Exclusivos (R$ 120)</h3>
                </div>
                <div className="space-y-2">
                  {[
                    "Guia Profético de Relacionamentos (R$ 40)",
                    "Devocional Profético de 7 Dias (R$ 40)",
                    "Diário de Oração e Reflexão (R$ 40)",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" style={{ color: '#F39C12' }} />
                      <span className="text-sm text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="w-full h-auto py-5 rounded-xl font-bold text-lg shadow-2xl hover:scale-[1.02] hover:brightness-110 transition-all duration-300 animate-glow-pulse mb-4"
                style={{ 
                  background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(230, 126, 34, 0.5)'
                }}
                onClick={goToCheckout}
              >
                <Lock className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">Garantir Meu Mapa Agora</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </Button>

              <p className="text-xs text-center text-white/70 mb-6">
                🔒 Pagamento 100% seguro • Acesso imediato por email
              </p>

              {/* Guarantee */}
              <div 
                className="rounded-lg p-5"
                style={{ 
                  background: "rgba(230, 126, 34, 0.15)", 
                  border: "1px solid rgba(230, 126, 34, 0.3)" 
                }}
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 flex-shrink-0" style={{ color: '#F39C12' }} />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      🛡️ Garantia de 7 dias
                    </h4>
                    <p className="text-sm text-white/80">
                      Se não for impactado(a) pelo Mapa Profético, devolvemos 100% do seu dinheiro, sem perguntas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div 
              className="p-6 rounded-lg text-center mb-6 animate-fade-in-up"
              style={{ 
                animationDelay: "300ms",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(40, 30, 25, 0.85)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" style={{ color: '#E67E22' }} />
                  <span>Pagamento Seguro</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4" style={{ color: '#E67E22' }} />
                  <span>Dados Protegidos</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#E67E22' }} />
                  <span>Acesso Imediato</span>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <div className="text-center">
              <Link 
                to="/resultado" 
                className="text-sm text-white/60 hover:text-white/80 transition-colors inline-flex items-center gap-1"
              >
                ← Voltar para o resultado
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky CTA Bar (Mobile Bottom) */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 sm:hidden ${
            showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          style={{ 
            paddingBottom: 'env(safe-area-inset-bottom)',
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(40, 30, 25, 0.95)",
            borderTop: "1px solid rgba(230, 126, 34, 0.3)",
            boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.4)"
          }}
        >
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Oferta exclusiva:</span>
              <span className="text-lg font-bold" style={{ color: '#E67E22' }}>R$ {PRECO}</span>
            </div>
            <Button
              onClick={goToCheckout}
              className="w-full h-12 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{ 
                background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
                color: 'white'
              }}
            >
              Garantir Meu Mapa Agora
            </Button>
          </div>
        </div>

        {/* Sticky CTA (Desktop - Bottom Right) */}
        <div
          className={`hidden sm:block fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <Button
            onClick={goToCheckout}
            className="h-14 px-8 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
              color: 'white',
              boxShadow: '0 8px 24px rgba(230, 126, 34, 0.5)'
            }}
          >
            Garantir por R$ {PRECO}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
