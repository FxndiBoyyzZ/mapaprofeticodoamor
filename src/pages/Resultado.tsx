import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTABar from "@/components/ui/sticky-cta-bar";
import { Lock, ArrowRight, Shield, CheckCircle2, Clock, Calendar, Heart, Sparkles, Eye, Key } from "lucide-react";
import { useEffect, useState } from "react";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";

const Resultado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, quizData } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(0);
  const { trackViewContent } = useTracking();

  // Generate dynamic insights based on profile
  const generateInsights = () => {
    const insights = [
      {
        icon: Calendar,
        title: "Quando você vai conhecer",
        preview: "⏳ O tempo perfeito está sendo revelado no seu Mapa Profético...",
        locked: "O timing exato está revelado no seu Mapa completo"
      },
      {
        icon: Heart,
        title: "Como será essa pessoa",
        preview: "💌 Características espirituais detalhadas foram traçadas para te guiar até o amor preparado por Deus...",
        locked: "Características detalhadas, valores e sinais de confirmação no Mapa completo"
      },
      {
        icon: Sparkles,
        title: "Sinais de que é a pessoa certa",
        preview: "✨ 5 sinais proféticos que Deus colocará no seu caminho para confirmar o encontro divino...",
        locked: "Lista completa de confirmações divinas no Mapa"
      },
      {
        icon: Eye,
        title: "O que evitar enquanto espera",
        preview: "⚠️ 3 armadilhas espirituais que impedem a promessa de se cumprir foram reveladas para você...",
        locked: "Direções específicas para não perder o timing no Mapa completo"
      }
    ];

    return insights;
  };

  useEffect(() => {
    if (!profile) return;

    // Track ViewContent with profile data
    trackViewContent({
      content_name: 'Resultado Quiz',
      content_category: `${profile.tempoEspiritual} | ${profile.perfilAmor}`,
    });

    // Start timer using tracking manager
    tracking.startTimer();
    
    // Update timer display
    const updateTimer = () => {
      const remaining = tracking.getTimerRemaining(15);
      setTimeLeft(remaining);
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [profile]);

  if (!profile) {
    return <Navigate to="/quiz" replace />;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const insights = generateInsights();

  const handleCheckoutClick = () => {
    // Track custom checkout_click event only (not InitiateCheckout)
    if (typeof window.fbq !== 'undefined') {
      window.fbq('trackCustom', 'checkout_click', { value: 47, currency: 'BRL' });
    }
    
    // Navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-secondary/20 via-white to-primary/5">
      <Header />

      <div className="pt-[80px] pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header with urgency */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Badge className="bg-golden text-golden-foreground mb-4 px-4 py-1.5 animate-pulse">
              🎉 Resultado Pronto{quizData?.nome ? `, ${quizData.nome}` : ""}!
            </Badge>
            <h2 className="text-[#3F3D56] mb-4 font-bold">
              ✨ Seu Mapa Profético foi revelado com sucesso 💌
            </h2>
            <p className="text-base text-text-secondary">
              Veja uma prévia incrível do que Deus revelou sobre seu futuro amoroso
            </p>
          </div>

          {/* Main Profile Preview */}
          <Card className="p-8 shadow-xl mb-6 border-2 border-primary/20 animate-fade-in-up animate-spiritual-pulse" style={{ animationDelay: "150ms" }}>
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-border">
                <h3 className="text-primary-dark mb-4">Seu Momento Espiritual:</h3>
                <div className="inline-block">
                  <Badge className="bg-gradient-to-r from-golden to-primary text-white font-bold text-lg px-8 py-3 shadow-lg">
                    ✨ {profile.tempoEspiritual}
                  </Badge>
                </div>
                <p className="text-base text-[#5E5E70] mt-3 max-w-md mx-auto">
                  Este é o tempo que Deus preparou para você. Cada momento tem um propósito divino.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-lilac/5 rounded-xl border border-lilac/20">
                  <Heart className="w-8 h-8 text-lilac mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-primary-dark mb-1">Seu Perfil de Amor</h4>
                  <p className="text-base font-bold text-lilac">{profile.perfilAmor}</p>
                </div>

                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-primary-dark mb-1">Versículo-Chave</h4>
                  <p className="text-sm font-bold text-primary">{profile.versiculo}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Locked Insights - Create Curiosity */}
          <div className="mb-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <h3 className="text-primary-dark text-center mb-6">
              O que mais você vai descobrir no Mapa completo:
            </h3>
            
            {insights.map((insight, idx) => (
              <Card key={idx} className="p-6 relative overflow-hidden border-2 border-border hover:border-primary/30 transition-all">
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-dark mb-1">{insight.title}</h4>
                      <p className="text-sm text-text-secondary">{insight.preview}</p>
                    </div>
                  </div>
                  
                  <div className="relative mt-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-white z-10" />
                    <p className="text-sm text-text-muted blur-sm select-none">
                      {insight.locked}
                    </p>
                  </div>
                </div>

                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 animate-lock-bounce">
                  <div className="bg-primary text-white p-3 rounded-full shadow-lg">
                    <Lock className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Urgency Timer */}
          <Card className="p-6 bg-gradient-to-r from-destructive/10 to-golden/10 border border-[#E5E5EE] rounded-lg mb-6 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-golden" />
                <div>
                  <p className="text-sm font-bold text-primary-dark">⚡ Oferta Especial Expira em:</p>
                  <p className="text-xs text-text-muted">Preço promocional por tempo limitado</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#D97706] font-mono animate-timer-pulse">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </p>
              </div>
            </div>
          </Card>

          {/* Main CTA with Pricing */}
          <Card className="p-8 shadow-2xl border-2 border-primary/30 mb-6 bg-gradient-to-br from-white to-primary/5 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <div className="text-center space-y-6">
              <h3 className="text-[#3F3D56] mb-2">
                💌 Receba agora o Mapa Profético Completo revelado para a sua vida amorosa
              </h3>
              
              <div>
                <p className="text-sm text-text-muted line-through mb-1">De R$ 97</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h2 className="text-primary text-5xl font-bold">R$ 47</h2>
                  <Badge className="bg-destructive text-white font-bold">-51% OFF</Badge>
                </div>
                <p className="text-sm text-text-secondary">Pagamento único • Acesso vitalício • Sem mensalidade</p>
              </div>

              <div className="space-y-2">
                {[
                  "✅ Mapa Profético completo (PDF)",
                  "✅ Quando você vai conhecer (timing divino)",
                  "✅ Como será essa pessoa (perfil detalhado)",
                  "✅ Sinais de confirmação práticos",
                  "✅ Plano de oração para 7 dias",
                ].map((item, idx) => (
                  <p key={idx} className="text-sm text-text-secondary text-left">
                    {item}
                  </p>
                ))}
              </div>

              {/* Garantia */}
              <div className="bg-[#F4F0FF] rounded-lg p-4 border border-lilac/20">
                <div className="flex items-center justify-center gap-2 text-sm text-primary-dark">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium">🛡️ Garantia de 7 dias: se não for impactado(a) pelo Mapa Profético, devolvemos 100% do seu dinheiro, sem perguntas.</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-auto py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:scale-[1.03] hover:brightness-110 transition-all duration-300 animate-glow-pulse px-4 sm:px-8"
                style={{ backgroundColor: '#6C4AB6', color: 'white' }}
                onClick={handleCheckoutClick}
              >
                <Key className="w-5 h-5 flex-shrink-0" />
                <span className="leading-tight">✨ Desbloquear meu Mapa Completo por R$47</span>
              </Button>
            </div>
          </Card>

          {/* Social Proof */}
          <div className="space-y-4 mb-8 animate-fade-in-up" style={{ animationDelay: "750ms" }}>
            <Card className="p-4 bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌿</span>
                <div>
                  <p className="text-xl font-bold text-primary">+1.200</p>
                  <p className="text-sm text-text-muted">Mapas gerados esta semana</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-3xl">✨</span>
                <div>
                  <p className="text-xl font-bold text-lilac">97%</p>
                  <p className="text-sm text-text-muted">relatam mais clareza espiritual após receberem</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="text-xl font-bold text-golden">4.8</p>
                  <p className="text-sm text-text-muted">de avaliação média</p>
                </div>
              </div>
            </Card>
          </div>

          {/* What's Included */}
          <Card className="p-6 bg-secondary/30 border-border shadow-sm mb-8 animate-fade-in-up" style={{ animationDelay: "900ms" }}>
            <h3 className="text-primary-dark mb-4 text-center">Tudo que você recebe:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Análise completa do seu tempo espiritual",
                "Data profética de quando vai conhecer",
                "Perfil detalhado do amor destinado",
                "5 sinais práticos de confirmação",
                "Versículos personalizados por dia",
                "Plano de oração estruturado",
                "Direções sobre o que evitar",
                "PDF bonito para salvar"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Secondary options */}
          <div className="text-center space-y-4">
            <p className="text-xs text-text-muted">
              💡 Dúvidas? Entre em contato pelo <a href="https://wa.link/dxs2et" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>
            </p>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/quiz">
                ← Refazer o teste
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Sticky CTA Bar */}
      <StickyCTABar 
        text="Pronto para desbloquear seu Mapa?"
        buttonText="✨ Desbloquear meu Mapa Completo por R$47"
        href="/checkout"
      />
    </div>
  );
};

export default Resultado;
