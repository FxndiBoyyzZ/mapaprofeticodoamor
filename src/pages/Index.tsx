import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Sparkles, Heart, Clock } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import logo from "@/assets/logo.png";

declare global {
  interface Window {
    fbq: any;
  }
}

const Index = () => {
  const { trackViewContent } = useTracking();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Track landing page view
    trackViewContent({
      content_name: 'Landing Page',
      content_category: 'home',
    });
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Hero Section */}
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
        {/* Gradient overlay with stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                opacity: Math.random() * 0.4 + 0.3,
                color: '#FFB84D',
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md animate-fade-in px-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logo} 
              alt="Mapa Profético do Amor" 
              className="h-14 w-auto"
              style={{ 
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
              }}
            />
          </div>

          {/* Main Headline */}
          <h1 
            className="text-[32px] xs:text-[36px] md:text-[40px] font-bold text-center leading-[1.15] mb-6"
            style={{
              color: '#F5F0E8',
              textShadow: '0 3px 10px rgba(0,0,0,0.5)',
              fontFamily: 'Georgia, serif',
            }}
          >
            Deus tem uma revelação única sobre sua vida amorosa...
          </h1>

          {/* Subtitle */}
          <p 
            className="text-center text-[16px] xs:text-[17px] leading-relaxed mb-6"
            style={{ 
              color: '#E8DDD0',
            }}
          >
            Em apenas 2 minutos, descubra os sinais proféticos e o tempo divino que Deus preparou para sua vida amorosa.
          </p>

          {/* Social Proof Card - Glassmorphic */}
          <div 
            className="rounded-2xl p-4 mb-6"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(60, 40, 30, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="text-xl flex-shrink-0 mt-0.5">👥</span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold" style={{ color: '#F5F0E8' }}>
                  +1.247 pessoas receberam esta revelação esta semana
                </p>
              </div>
            </div>
            <p className="text-[13px] pl-8" style={{ color: '#D4BFA8', opacity: 0.8 }}>
              • Dados atualizados hoje
            </p>
          </div>

          {/* CTA Button - Golden Gradient */}
          <Button 
            asChild
            size="lg"
            className="w-full text-[18px] font-bold transition-all duration-300 hover:scale-[1.02] border-0"
            style={{
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)',
              backgroundSize: '200% 100%',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(230, 126, 34, 0.5)',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '100% 0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '0% 0';
            }}
            onClick={() => {
              if (typeof window.fbq === 'function') {
                window.fbq('trackCustom', 'StartQuiz');
              }
            }}
          >
            <Link to="/quiz" className="flex items-center justify-center gap-2">
              <span>✨</span>
              <span>Receber Minha Revelação Agora</span>
            </Link>
          </Button>

          {/* Features/Trust Badges */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-center gap-4 text-[14px]" style={{ color: '#E8DDD0' }}>
              <span className="flex items-center gap-1.5">
                <span>⏱️</span>
                <span>2 minutos</span>
              </span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span className="flex items-center gap-1.5">
                <span>📖</span>
                <span>Alinhado à Bíblia</span>
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-[14px]" style={{ color: '#E8DDD0' }}>
              <span className="flex items-center gap-1.5">
                <span>🔒</span>
                <span>Privado</span>
              </span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span className="flex items-center gap-1.5">
                <span>✝️</span>
                <span>100% Cristão</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* More Details Section */}
      {showMore && (
        <div className="relative z-10 py-16 px-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
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
