import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Sparkles, Heart, Clock } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import landingBg from "@/assets/landing-bg-couple.jpg";

declare global {
  interface Window {
    fbq: any;
  }
}

const Index = () => {
  const { trackViewContent } = useTracking();
  const [showMore, setShowMore] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    // Track landing page view
    trackViewContent({
      content_name: 'Landing Page',
      content_category: 'home',
    });

    // Scroll tracking
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Show sticky CTA after 30% scroll
      if (scrollPercent > 30) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }

      // Track 50% scroll
      if (scrollPercent >= 50 && typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'LP_50_Scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Hero Section */}
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
        {/* Real Photo Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={landingBg} 
            alt="Casal romântico ao pôr do sol - Mapa Profético do Amor"
            className="w-full h-full object-cover"
            loading="eager"
          />
          
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 25%, rgba(240, 147, 251, 0.5) 50%, rgba(79, 172, 254, 0.5) 75%, rgba(0, 242, 254, 0.6) 100%)',
            }}
          />
          
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-pink-300/30 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 30 + 20}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              >
                ♥
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-md animate-fade-in">
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 pb-2 xs:p-8 xs:pb-3 sm:pb-8 shadow-2xl border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex justify-center mb-4 xs:mb-6">
              <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl xs:text-3xl">✨</span>
              </div>
            </div>

            <h1 
              className="text-[24px] xs:text-[26px] md:text-3xl font-bold text-center mb-2 xs:mb-3 leading-tight"
              style={{
                color: '#3F3D56',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              Descubra quando você vai conhecer o amor da sua vida,{' '}
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #F9D65C 0%, #F5A623 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                como será essa pessoa e os sinais que Deus vai te mostrar.
              </span>
            </h1>

            <p 
              className="text-center text-[14px] xs:text-base mb-4 xs:mb-6 leading-relaxed"
              style={{ color: '#7A7A8C', marginTop: '8px' }}
            >
              Leva menos de 2 minutos. Resultado imediato e personalizado.
            </p>

            <div 
              className="rounded-xl p-3 xs:p-3 mb-4 xs:mb-5"
              style={{
                backdropFilter: 'blur(8px)',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid #E9E6FF',
                borderRadius: '12px',
              }}
            >
              <div className="flex items-center justify-center gap-2 text-[13px] xs:text-sm font-medium" style={{ color: '#3F3D56' }}>
                <div className="flex -space-x-2 mr-2">
                  {['M', 'A', 'J', 'L', 'C', 'R'].map((initial, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 xs:w-7 xs:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-semibold border-2 border-white"
                      style={{
                        background: `hsl(${i * 60}, 70%, 60%)`,
                        color: 'white',
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <span>
                  ✦ +1.247 pessoas receberam seu Mapa esta semana • Atualizado hoje
                </span>
              </div>
            </div>

            <Button 
              asChild
              size="lg"
              className="w-full text-[15px] xs:text-base font-semibold transition-all duration-200"
              style={{
                height: '56px',
                borderRadius: '14px',
                background: '#6C4AB6',
                color: '#FFFFFF',
                boxShadow: '0 8px 18px rgba(108, 74, 182, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5A3CA1';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#6C4AB6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onClick={() => {
                if (typeof window.fbq === 'function') {
                  window.fbq('trackCustom', 'StartQuiz');
                }
              }}
            >
              <Link to="/quiz">
                Começar minha revelação agora ✨
              </Link>
            </Button>

            <p 
              className="text-center text-[12px] xs:text-[13px] mt-2 xs:mt-3 mb-3 xs:mb-4"
              style={{ color: '#5E5E70' }}
            >
              Gratuito • Sem cadastro • 6 perguntas
            </p>

            <p 
              className="text-center text-[12px] xs:text-[13px] mb-2 flex flex-wrap items-center justify-center gap-2"
              style={{ color: '#7A7A8C' }}
            >
              <span>Alinhado à Bíblia</span>
              <span>·</span>
              <span>Conteúdo 100% cristão</span>
              <span>·</span>
              <span>Seguro e privado</span>
            </p>
          </div>
        </div>

        <button 
          onClick={() => setShowMore(true)}
          className="absolute bottom-6 left-0 right-0 z-10 text-center text-[12px] xs:text-[13px] hover:opacity-100 transition-opacity"
          style={{ color: '#E2E8F0', opacity: 0.8 }}
        >
          Ver como funciona ↓
        </button>
      </div>

      {/* Sticky CTA Mobile */}
      {showStickyCTA && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg md:hidden animate-fade-in"
          style={{
            animation: 'slideUp 180ms ease-out',
          }}
        >
          <Button 
            asChild
            size="lg"
            className="w-full text-[15px] font-semibold transition-all duration-200"
            style={{
              height: '52px',
              borderRadius: '12px',
              background: '#6C4AB6',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(108, 74, 182, 0.25)',
            }}
            onClick={() => {
              if (typeof window.fbq === 'function') {
                window.fbq('trackCustom', 'StartQuiz');
              }
            }}
          >
            <Link to="/quiz">
              Começar minha revelação agora ✨
            </Link>
          </Button>
        </div>
      )}

      {/* More Details Section */}
      {showMore && (
        <div className="relative z-10 bg-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* What You'll Discover */}
            <div className="text-center mb-12">
              <h2 className="text-primary mb-4">O que você vai descobrir no seu Mapa:</h2>
              <p className="text-text-secondary">
                Respostas práticas e direção bíblica para sua vida amorosa
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-lilac/5 border border-primary/10">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-primary-dark mb-2 font-semibold">Quando você vai encontrar</h3>
                <p className="text-sm text-text-secondary">
                  Sinais e timing divino para o seu momento
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-lilac/5 to-golden/5 border border-lilac/10">
                <Sparkles className="w-12 h-12 text-lilac mx-auto mb-4" />
                <h3 className="text-primary-dark mb-2 font-semibold">Como será essa pessoa</h3>
                <p className="text-sm text-text-secondary">
                  Perfil espiritual e características do amor destinado
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-golden/5 to-primary/5 border border-golden/10">
                <Clock className="w-12 h-12 text-golden mx-auto mb-4" />
                <h3 className="text-primary-dark mb-2 font-semibold">Seu tempo espiritual</h3>
                <p className="text-sm text-text-secondary">
                  O que Deus está fazendo na sua vida amorosa agora
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-secondary/30 rounded-3xl p-8 mb-12">
              <h3 className="text-primary-dark text-center mb-6">Incluído no seu Mapa Profético:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Análise do seu momento espiritual no amor",
                  "Perfil detalhado do amor que te espera",
                  "Sinais práticos para reconhecer a pessoa certa",
                  "Plano de oração e ação para 7 dias",
                  "Versículos personalizados para seu tempo",
                  "PDF bonito para salvar e consultar sempre"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-6 py-3 border border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary-dark">
                  Garantia de 7 dias • 100% do seu dinheiro de volta
                </span>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <Button 
                asChild
                size="lg"
                className="h-14 px-12 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Link to="/quiz">
                  Quero Meu Mapa Agora
                </Link>
              </Button>
              <p className="text-xs text-text-muted mt-4">
                Acesso imediato após o teste • Menos de 2 minutos
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
