import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/layout/Footer";
import StickyCTABar from "@/components/ui/sticky-cta-bar";
import { Lock, ArrowRight, Shield, CheckCircle2, Clock, Calendar, Heart, Sparkles, Eye, Key } from "lucide-react";
import { useEffect, useState } from "react";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";
import quizBg from "@/assets/quiz-bg.png";
import bonusGuia from "@/assets/bonus-guia-relacionamentos.png";
import bonusDevocional from "@/assets/bonus-devocional-7dias.png";
import bonusDiario from "@/assets/bonus-diario-oracao.png";

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
    // Track InitiateCheckout event for Meta
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', { 
        value: 27, 
        currency: 'BRL',
        content_name: 'Mapa Profético Completo'
      });
    }
    
    // Redirect to external checkout (replace with your actual checkout URL)
    window.location.href = 'https://pay.kiwify.com.br/SEU_LINK_AQUI';
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${quizBg})` }}
    >

      <div className="pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header with urgency */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Badge className="bg-golden text-golden-foreground mb-4 px-4 py-1.5 animate-pulse">
              🎉 Resultado Pronto{quizData?.nome ? `, ${quizData.nome}` : ""}!
            </Badge>
            <h2 className="text-white mb-4 font-bold">
              ✨ Seu Mapa Profético foi revelado com sucesso 💌
            </h2>
            <p className="text-base text-white/80 mb-6">
              Veja uma prévia incrível do que Deus revelou sobre seu futuro amoroso
            </p>
            
            {/* Urgency Timer */}
            <div 
              className="p-6 rounded-lg mb-4 inline-block animate-fade-in-up" 
              style={{ 
                animationDelay: "150ms",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(230, 126, 34, 0.2)",
                borderColor: "rgba(230, 126, 34, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)"
              }}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6" style={{ color: '#F39C12' }} />
                  <div>
                    <p className="text-sm font-bold text-white">⚡ Seu mapa é válido por 10 minutos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold font-mono animate-timer-pulse" style={{ color: '#F39C12' }}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Preview */}
          <div 
            className="p-8 mb-6 animate-fade-in-up animate-spiritual-pulse rounded-xl" 
            style={{ 
              animationDelay: "150ms",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(40, 30, 25, 0.85)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)"
            }}
          >
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-white/10">
                <h3 className="mb-4 text-white font-semibold">Seu Momento Espiritual:</h3>
                <div className="inline-block">
                  <Badge className="font-bold text-lg px-8 py-3 shadow-lg" style={{ background: '#E67E22', color: 'white' }}>
                    ✨ {profile.tempoEspiritual}
                  </Badge>
                </div>
                <p className="text-base mt-3 max-w-md mx-auto text-white/90">
                  Este é o tempo que Deus preparou para você. Cada momento tem um propósito divino.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl border border-golden/20" style={{ background: "rgba(232, 221, 208, 0.15)" }}>
                  <Heart className="w-8 h-8 mx-auto mb-2" style={{ color: '#E67E22' }} />
                  <h4 className="text-sm font-semibold mb-1 text-white">Seu Perfil de Amor</h4>
                  <p className="text-base font-bold" style={{ color: '#F39C12' }}>{profile.perfilAmor}</p>
                </div>

                <div className="text-center p-4 rounded-xl border border-golden/20" style={{ background: "rgba(232, 221, 208, 0.15)" }}>
                  <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: '#F39C12' }} />
                  <h4 className="text-sm font-semibold mb-1 text-white">Versículo-Chave</h4>
                  <p className="text-sm font-bold" style={{ color: '#F39C12' }}>{profile.versiculo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Locked Insights - Create Curiosity */}
          <div className="mb-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <h3 className="text-center mb-6 text-white font-semibold">
              O que mais você vai descobrir no Mapa completo:
            </h3>
            
            {insights.map((insight, idx) => (
              <div 
                key={idx} 
                className="p-6 relative overflow-hidden border-2 transition-all rounded-xl"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  background: "rgba(40, 30, 25, 0.85)",
                  borderColor: "rgba(230, 126, 34, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)"
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(230, 126, 34, 0.2)" }}>
                      <insight.icon className="w-5 h-5" style={{ color: '#E67E22' }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-white">{insight.title}</h4>
                      <p className="text-sm text-white/80">{insight.preview}</p>
                    </div>
                  </div>
                  
                  <div className="relative mt-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#281E19]/80 to-[#281E19] z-10" />
                    <p className="text-sm blur-sm select-none text-white/50">
                      {insight.locked}
                    </p>
                  </div>
                </div>

                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 animate-lock-bounce">
                  <div className="p-3 rounded-full shadow-lg" style={{ background: '#E67E22' }}>
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus Section */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <div className="text-center mb-6">
              <Badge className="mb-3 px-4 py-1.5 font-semibold" style={{ background: '#E67E22', color: 'white' }}>
                🎁 Bônus Exclusivos Inclusos
              </Badge>
              <h3 className="text-white mb-2 font-semibold">+ R$ 120 em Bônus de Graça</h3>
              <p className="text-sm text-white/80">
                Você recebe estes 3 materiais extras sem custo adicional
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div 
                className="p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] rounded-xl"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  background: "rgba(40, 30, 25, 0.85)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
                }}
              >
                <img 
                  src={bonusGuia} 
                  alt="Guia Profético de Relacionamentos" 
                  className="w-full rounded-lg mb-3 aspect-[4/3] object-cover"
                />
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#E67E22', color: '#E67E22' }}>
                    Valor: R$ 40
                  </Badge>
                  <h4 className="font-semibold text-sm text-white">
                    Guia Profético de Relacionamentos
                  </h4>
                  <p className="text-xs text-white/70">
                    Oriente seu relacionamento com os princípios da palavra de Deus
                  </p>
                </div>
              </div>

              <div 
                className="p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] rounded-xl"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  background: "rgba(40, 30, 25, 0.85)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
                }}
              >
                <img 
                  src={bonusDevocional} 
                  alt="Devocional Profético de 7 Dias" 
                  className="w-full rounded-lg mb-3 aspect-[4/3] object-cover"
                />
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#F39C12', color: '#F39C12' }}>
                    Valor: R$ 40
                  </Badge>
                  <h4 className="font-semibold text-sm text-white">
                    Devocional Profético de 7 Dias
                  </h4>
                  <p className="text-xs text-white/70">
                    Viva a palavra de Deus com um plano de estudos inspirado
                  </p>
                </div>
              </div>

              <div 
                className="p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] rounded-xl"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  background: "rgba(40, 30, 25, 0.85)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
                }}
              >
                <img 
                  src={bonusDiario} 
                  alt="Diário de Oração e Reflexão" 
                  className="w-full rounded-lg mb-3 aspect-[4/3] object-cover"
                />
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#E67E22', color: '#E67E22' }}>
                    Valor: R$ 40
                  </Badge>
                  <h4 className="font-semibold text-sm text-white">
                    Diário de Oração e Reflexão
                  </h4>
                  <p className="text-xs text-white/70">
                    Fortaleça sua fé com práticas devocionais diárias
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="mt-6 p-4 rounded-lg text-center"
              style={{
                background: "rgba(230, 126, 34, 0.15)",
                border: "1px solid rgba(230, 126, 34, 0.3)"
              }}
            >
              <p className="text-sm font-semibold text-white">
                Total em Bônus: <span className="text-lg" style={{ color: '#E67E22' }}>R$ 120</span>
              </p>
              <p className="text-xs text-white/70 mt-1">
                Tudo isso incluído gratuitamente na sua compra hoje
              </p>
            </div>
          </div>

          {/* Main CTA with Pricing */}
          <div 
            className="p-8 mb-6 animate-fade-in-up rounded-xl" 
            style={{ 
              animationDelay: "600ms",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(40, 30, 25, 0.9)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
              border: "2px solid rgba(230, 126, 34, 0.3)"
            }}
          >
            <div className="text-center space-y-6">
              <h3 className="mb-2 text-white font-semibold">
                💌 Receba agora o Mapa Profético Completo revelado para a sua vida amorosa
              </h3>
              
              <div>
                <p className="text-sm line-through mb-1 text-white/60">De R$ 97</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h2 className="text-5xl font-bold" style={{ color: '#E67E22' }}>R$ 27</h2>
                  <Badge className="bg-destructive text-white font-bold">-72% OFF</Badge>
                </div>
                <p className="text-sm text-white/80">Pagamento único • Acesso vitalício • Sem mensalidade</p>
              </div>

              <div className="space-y-2">
                {[
                  "✅ Mapa Profético completo (PDF)",
                  "✅ Quando você vai conhecer (timing divino)",
                  "✅ Como será essa pessoa (perfil detalhado)",
                  "✅ Sinais de confirmação práticos",
                  "✅ Plano de oração para 7 dias",
                ].map((item, idx) => (
                  <p key={idx} className="text-sm text-left text-white/90">
                    {item}
                  </p>
                ))}
              </div>

              {/* Garantia */}
              <div className="rounded-lg p-4" style={{ background: "rgba(230, 126, 34, 0.15)", border: "1px solid rgba(230, 126, 34, 0.3)" }}>
                <div className="flex items-center justify-center gap-2 text-sm text-white">
                  <Shield className="w-5 h-5" style={{ color: '#F39C12' }} />
                  <span className="font-medium">🛡️ Garantia de 7 dias: se não for impactado(a) pelo Mapa Profético, devolvemos 100% do seu dinheiro, sem perguntas.</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-auto py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:scale-[1.03] hover:brightness-110 transition-all duration-300 animate-glow-pulse px-4 sm:px-8"
                style={{ 
                  background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(230, 126, 34, 0.5)'
                }}
                onClick={handleCheckoutClick}
              >
                <Key className="w-5 h-5 flex-shrink-0" />
                <span className="leading-tight whitespace-normal">✨ Desbloquear Mapa Completo por R$27</span>
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="space-y-4 mb-8 animate-fade-in-up" style={{ animationDelay: "750ms" }}>
            <div 
              className="p-4 rounded-xl" 
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(40, 30, 25, 0.85)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌿</span>
                <div>
                  <p className="text-xl font-bold" style={{ color: '#E67E22' }}>+1.200</p>
                  <p className="text-sm text-white/70">Mapas gerados esta semana</p>
                </div>
              </div>
            </div>
            <div 
              className="p-4 rounded-xl" 
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(40, 30, 25, 0.85)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">✨</span>
                <div>
                  <p className="text-xl font-bold" style={{ color: '#E67E22' }}>97%</p>
                  <p className="text-sm text-white/70">relatam estar mais preparados espiritualmente após receberem</p>
                </div>
              </div>
            </div>
            <div 
              className="p-4 rounded-xl" 
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(40, 30, 25, 0.85)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="text-xl font-bold" style={{ color: '#F39C12' }}>4.8</p>
                  <p className="text-sm text-white/70">de avaliação média</p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div 
            className="p-6 mb-8 animate-fade-in-up rounded-xl" 
            style={{ 
              animationDelay: "900ms",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(40, 30, 25, 0.75)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)"
            }}
          >
            <h3 className="mb-4 text-center text-white font-semibold">Tudo que você recebe:</h3>
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
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#E67E22' }} />
                  <span className="text-sm text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary options */}
          <div className="text-center space-y-4">
            <p className="text-xs text-white/70">
              💡 Dúvidas? Entre em contato pelo <a href="https://wa.me/+5511966138651?text=Ol%C3%A1%2C%20estou%20com%20d%C3%BAvida%20em%20rela%C3%A7%C3%A3o%20ao%20meu%20Mapa..." target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#E67E22' }}>WhatsApp</a>
            </p>
            <Button asChild variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-white/80 hover:text-white">
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
        buttonText="✨ Desbloquear Mapa por R$27"
        href="/checkout"
      />
    </div>
  );
};

export default Resultado;
