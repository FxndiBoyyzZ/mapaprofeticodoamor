import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, 
  Shield, 
  CheckCircle2, 
  Calendar, 
  Heart, 
  Sparkles, 
  Eye, 
  Key,
  Star,
  MessageCircle
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTracking } from "@/hooks/useTracking";
import quizBg from "@/assets/quiz-bg.png";
import bonusGuia from "@/assets/bonus-guia-relacionamentos.png";
import bonusDevocional from "@/assets/bonus-devocional-7dias.png";
import bonusDiario from "@/assets/bonus-diario-oracao.png";

const Resultado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, quizData } = location.state || {};
  const { trackViewContent, trackEvent } = useTracking();
  const videoRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!profile) return;

    // Track ViewContent
    trackViewContent({
      content_name: 'Resultado Quiz',
      content_category: 'resultado',
    });

    // Track custom event
    if (window.fbq) {
      window.fbq('trackCustom', 'quiz_loading_completed');
    }

    // Setup Vimeo Player API for play/pause control
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [profile]);

  if (!profile) {
    return <Navigate to="/quiz" replace />;
  }

  const handleCheckoutClick = () => {
    // Track checkout click
    if (window.fbq) {
      window.fbq('trackCustom', 'checkout_click', { value: 27, currency: 'BRL' });
    }
    navigate('/checkout');
  };

  const handleVideoClick = () => {
    const iframe = videoRef.current?.querySelector('iframe');
    if (!iframe || !(window as any).Vimeo) return;

    const player = new (window as any).Vimeo.Player(iframe);
    
    player.getPaused().then((paused: boolean) => {
      if (paused) {
        player.play();
        setIsPlaying(true);
      } else {
        player.pause();
        setIsPlaying(false);
      }
    });
  };

  const testimonials = [
    {
      name: "Ana Paula S.",
      text: "Recebi meu Mapa e em 2 semanas conheci alguém exatamente como foi revelado! Incrível!",
      stars: 5
    },
    {
      name: "Mariana R.",
      text: "A clareza espiritual que recebi mudou completamente minha perspectiva sobre o amor.",
      stars: 5
    },
    {
      name: "Carolina M.",
      text: "Os sinais que estavam no Mapa começaram a aparecer na minha vida. Deus é fiel!",
      stars: 5
    }
  ];

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${quizBg})` }}
    >
      {/* Header */}
      <header className="py-8 px-4 text-center">
        <div 
          className="inline-block px-8 py-4 rounded-2xl animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 42, 26, 0.95) 0%, rgba(212, 162, 76, 0.3) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(212, 162, 76, 0.3)'
          }}
        >
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-golden mb-2">
            📜 Mapa Profético do Amor
          </h1>
          <p className="text-sm text-white/80">Revelações espirituais personalizadas</p>
        </div>
      </header>

      <div className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in-up space-y-6">
            <h2 
              className="text-3xl md:text-5xl font-playfair font-bold text-white leading-tight"
              style={{
                textShadow: '0 0 40px rgba(212, 162, 76, 0.6), 0 0 20px rgba(212, 162, 76, 0.4)'
              }}
            >
              ✨ Seu Mapa Profético foi revelado com sucesso!
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Descubra agora as revelações únicas que Deus preparou para sua vida amorosa — 
              e os sinais que confirmam o propósito divino reservado para você.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-white/70">
              <Sparkles className="w-4 h-4 text-golden" />
              <span>+1.247 pessoas desbloquearam seu Mapa esta semana</span>
              <span className="text-golden">• Dados atualizados hoje</span>
            </div>
          </div>

          {/* VSL Video Section */}
          <div 
            className="mb-12 animate-fade-in-up relative"
            style={{
              animationDelay: '450ms'
            }}
          >
            <div 
              className="relative max-w-full md:max-w-[60%] mx-auto rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(63, 46, 23, 0.05) 0%, rgba(108, 74, 182, 0.05) 100%)',
                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.4)',
                border: '2px solid rgba(212, 162, 76, 0.3)'
              }}
            >
              {/* Golden glow effect */}
              <div 
                className="absolute -inset-4 blur-xl opacity-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)'
                }}
              />
              
              <div 
                ref={videoRef}
                className="relative aspect-video max-h-[480px] cursor-pointer"
                onClick={handleVideoClick}
              >
                <iframe 
                  src="https://player.vimeo.com/video/1126207484?badge=0&autopause=0&autoplay=1&controls=0&muted=0&loop=1&player_id=0&app_id=58479" 
                  className="w-full h-full pointer-events-none"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  title="VSL Mapa Profético"
                  id="vimeo-player"
                />
              </div>

              {/* Video played halo effect */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(212, 175, 55, 0.2)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              />
            </div>

            {/* Copy de apoio */}
            <p className="text-center text-[#F8E7C2] text-base sm:text-lg font-medium mt-6 leading-snug max-w-2xl mx-auto">
              ✨ Se essa mensagem falou ao seu coração, não ignore esse sinal.<br/>
              <span className="text-[#FFD700] font-semibold">Clique abaixo</span> e desbloqueie agora o seu Mapa Profético completo.
            </p>
          </div>

          {/* Card Principal - Resumo Profético */}
          <div 
            className="p-8 md:p-12 mb-12 rounded-2xl animate-fade-in-up text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 42, 26, 0.95) 0%, rgba(212, 162, 76, 0.2) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(212, 162, 76, 0.4), 0 8px 32px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(212, 162, 76, 0.3)',
              animationDelay: '150ms'
            }}
          >
            <div className="animate-spiritual-pulse">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-golden" />
            </div>
            
            <p className="text-2xl md:text-3xl font-playfair text-white mb-6 leading-relaxed">
              💌 {quizData?.nome || 'Sua alma'}, seu tempo espiritual é de <span className="text-golden font-bold">{profile.tempoEspiritual}</span>.
            </p>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Este é o momento em que Deus te revela os próximos passos para o amor verdadeiro.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, text: "Quando você vai conhecer" },
                { icon: Heart, text: "Como será essa pessoa" },
                { icon: Sparkles, text: "Sinais de confirmação" },
                { icon: Eye, text: "O que evitar" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-golden/20 hover:bg-white/10 transition-all"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-golden" />
                  <p className="text-xs text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Valor e Ancoragem */}
          <div 
            className="p-8 md:p-12 mb-12 rounded-2xl text-center animate-fade-in-up"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 162, 76, 0.3) 0%, rgba(59, 42, 26, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(212, 162, 76, 0.5)',
              border: '2px solid rgba(212, 162, 76, 0.4)',
              animationDelay: '300ms'
            }}
          >
            <p className="text-xl md:text-2xl text-white mb-4">
              O valor original do Mapa Profético Completo é <span className="line-through text-white/60">R$97</span>.
            </p>
            <p className="text-lg text-white/90 mb-6">
              Mas hoje, você pode desbloquear tudo por apenas:
            </p>
            
            <div className="mb-6">
              <div className="text-6xl md:text-7xl font-bold text-golden mb-2 animate-glow-pulse">
                💎 R$27
              </div>
              <p className="text-base text-white/90">à vista</p>
            </div>

            <p className="text-sm text-golden italic">
              *Oferta única, válida apenas nesta revelação.
            </p>
          </div>

          {/* Bônus Exclusivos */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
            <div className="text-center mb-8">
              <Badge 
                className="mb-4 px-6 py-2 text-base font-bold"
                style={{ background: '#D4A24C', color: '#3B2A1A' }}
              >
                🎁 Bônus Exclusivos Incluídos
              </Badge>
              <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
                + R$ 120 em Bônus de Graça
              </h3>
              <p className="text-white/80">
                Materiais extras sem custo adicional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card 
                className="overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  background: 'rgba(59, 42, 26, 0.9)',
                  border: '2px solid rgba(212, 162, 76, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }}
              >
                <img 
                  src={bonusGuia} 
                  alt="Guia Profético de Relacionamentos" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6 space-y-3">
                  <Badge variant="outline" className="border-golden text-golden">
                    Valor: R$ 40
                  </Badge>
                  <h4 className="font-bold text-white text-lg">
                    📘 Guia Profético de Relacionamentos
                  </h4>
                  <p className="text-sm text-white/70">
                    Oriente seu relacionamento com os princípios da palavra de Deus.
                  </p>
                </div>
              </Card>

              <Card 
                className="overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  background: 'rgba(59, 42, 26, 0.9)',
                  border: '2px solid rgba(212, 162, 76, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }}
              >
                <img 
                  src={bonusDevocional} 
                  alt="Plano de Oração de 7 Dias" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6 space-y-3">
                  <Badge variant="outline" className="border-golden text-golden">
                    Valor: R$ 40
                  </Badge>
                  <h4 className="font-bold text-white text-lg">
                    🙏 Plano de Oração de 7 Dias + Acompanhamento Profético
                  </h4>
                  <p className="text-sm text-white/70">
                    Um roteiro diário para fortalecer sua fé e atrair o amor segundo o tempo divino.
                  </p>
                </div>
              </Card>

              <Card 
                className="overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  background: 'rgba(59, 42, 26, 0.9)',
                  border: '2px solid rgba(212, 162, 76, 0.3)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }}
              >
                <img 
                  src={bonusDiario} 
                  alt="Os 5 Sinais que Antecedem o Encontro" 
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6 space-y-3">
                  <Badge variant="outline" className="border-golden text-golden">
                    Valor: R$ 40
                  </Badge>
                  <h4 className="font-bold text-white text-lg">
                    💫 Relatório Profético Extra: Os 5 Sinais que Antecedem o Encontro
                  </h4>
                  <p className="text-sm text-white/70">
                    Identifique os sinais espirituais que anunciam o amor destinado por Deus.
                  </p>
                </div>
              </Card>
            </div>

            <div 
              className="p-6 rounded-xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 162, 76, 0.2) 0%, rgba(59, 42, 26, 0.8) 100%)',
                border: '1px solid rgba(212, 162, 76, 0.3)'
              }}
            >
              <p className="text-xl font-bold text-white">
                Total em Bônus: <span className="text-3xl text-golden">R$ 120</span>
              </p>
              <p className="text-sm text-white/70 mt-2">
                Tudo isso incluído gratuitamente na sua compra hoje
              </p>
            </div>
          </div>

          {/* CTA Principal */}
          <div 
            className="p-8 md:p-12 mb-12 rounded-2xl text-center animate-fade-in-up"
            style={{
              background: 'rgba(59, 42, 26, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(212, 162, 76, 0.5)',
              boxShadow: '0 0 60px rgba(212, 162, 76, 0.4)',
              animationDelay: '600ms'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-6">
              O que está incluído no Mapa Completo:
            </h3>

            <div className="space-y-3 mb-8 text-left max-w-xl mx-auto">
              {[
                "✅ Mapa Profético completo e personalizado (PDF)",
                "✅ Quando você vai conhecer (timing divino revelado)",
                "✅ Como será essa pessoa (perfil detalhado)",
                "✅ Sinais de confirmação práticos",
                "✅ O que evitar durante a espera",
                "✅ Plano de oração para 7 dias",
                "✅ Todos os 3 bônus (R$ 120 em valor)"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-golden flex-shrink-0 mt-1" />
                  <p className="text-white text-base">{item}</p>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full h-auto py-5 px-4 rounded-2xl font-bold text-sm md:text-xl shadow-2xl hover:scale-105 transition-all duration-300 animate-glow-pulse mb-6 whitespace-normal gap-2"
              style={{ 
                background: 'linear-gradient(135deg, #D4A24C 0%, #F5E2B8 50%, #D4A24C 100%)',
                color: '#3B2A1A',
                boxShadow: '0 8px 40px rgba(212, 162, 76, 0.6)'
              }}
              onClick={handleCheckoutClick}
            >
              <span className="text-center leading-tight w-full">✨ Desbloquear Meu Mapa Completo por R$27</span>
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-4">
              <Shield className="w-5 h-5 text-golden" />
              <span>Acesso imediato • Revelação completa • Garantia 7 dias</span>
            </div>
          </div>

          {/* Prova Social */}
          <div 
            className="p-8 md:p-12 mb-12 rounded-2xl text-center animate-fade-in-up"
            style={{
              background: 'rgba(59, 42, 26, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 162, 76, 0.2)',
              animationDelay: '750ms'
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-golden text-golden" />
                  ))}
                </div>
                <span className="text-white font-bold">4.8</span>
              </div>
              <span className="text-white/60">|</span>
              <span className="text-white">+1.200 Mapas revelados</span>
              <span className="text-white/60">|</span>
              <span className="text-white">97% relatam mais clareza espiritual</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <Card 
                  key={idx}
                  className="p-6 text-left"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(212, 162, 76, 0.2)'
                  }}
                >
                  <div className="flex mb-3">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                    ))}
                  </div>
                  <p className="text-white/90 text-sm mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-golden font-semibold text-sm">— {testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Garantia e Segurança */}
          <div 
            className="p-8 rounded-2xl mb-12 text-center animate-fade-in-up"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 162, 76, 0.15) 0%, rgba(59, 42, 26, 0.9) 100%)',
              border: '2px solid rgba(212, 162, 76, 0.3)',
              animationDelay: '900ms'
            }}
          >
            <Shield className="w-16 h-16 mx-auto mb-4 text-golden" />
            <h4 className="text-2xl font-playfair font-bold text-white mb-4">
              🔒 Garantia Incondicional de 7 Dias
            </h4>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Se não sentir clareza e paz após ler seu Mapa, devolvemos 100% do valor. 
              Sem perguntas, sem complicação.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/70">
              <span>🔐 Checkout Seguro</span>
              <span>💳 Pix e Cartão</span>
              <span>🛡️ SSL Certificado</span>
            </div>
          </div>

          {/* Contato WhatsApp */}
          <div className="text-center mb-8">
            <p className="text-white/80 mb-4">Ficou com alguma dúvida?</p>
            <a
              href="https://wa.me/5511966138651?text=Ol%C3%A1,%20estou%20com%20d%C3%BAvida%20em%20rela%C3%A7%C3%A3o%20ao%20meu%20Mapa%20Prof%C3%A9tico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Fale com nosso suporte no WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(59, 42, 26, 0.95) 0%, rgba(59, 42, 26, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: '2px solid rgba(212, 162, 76, 0.3)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Button 
          size="lg" 
          className="w-full h-auto py-4 rounded-xl font-bold text-sm leading-tight animate-pulse-cta"
          style={{ 
            background: 'linear-gradient(135deg, #D4A24C 0%, #F5E2B8 50%, #D4A24C 100%)',
            color: '#3B2A1A',
            boxShadow: '0 4px 20px rgba(212, 162, 76, 0.5)'
          }}
          onClick={handleCheckoutClick}
        >
          <Key className="w-4 h-4 flex-shrink-0" />
          <span className="text-center">Desbloquear por R$27</span>
        </Button>
      </div>

      {/* Footer */}
      <footer 
        className="py-8 px-4 text-center border-t"
        style={{
          background: 'rgba(59, 42, 26, 0.95)',
          borderColor: 'rgba(212, 162, 76, 0.2)'
        }}
      >
        <div className="container mx-auto max-w-4xl space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-white/70">
            <Link to="/privacidade" className="hover:text-golden transition-colors">
              Política de Privacidade
            </Link>
            <span>|</span>
            <Link to="/termos" className="hover:text-golden transition-colors">
              Termos de Uso
            </Link>
          </div>
          <p className="text-sm text-white/60">
            © 2025 Mapa Profético do Amor — Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Resultado;
