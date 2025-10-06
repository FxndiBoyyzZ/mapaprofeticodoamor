import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Sparkles, Heart, Clock } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import heroGradientBg from "@/assets/hero-gradient-bg.png";

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
        {/* Hero Gradient Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroGradientBg}
            alt="Gradiente profético - Mapa do Amor"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ filter: 'blur(4px)' }}
          />
          
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(108, 74, 182, 0.85) 0%, rgba(118, 75, 162, 0.8) 25%, rgba(182, 143, 255, 0.75) 50%, rgba(108, 74, 182, 0.8) 75%, rgba(118, 75, 162, 0.85) 100%)',
              backdropFilter: 'blur(12px)',
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md animate-fade-in px-6">
          <div className="flex justify-center mb-4 xs:mb-6">
            <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl xs:text-3xl">✨</span>
            </div>
          </div>

            <h1 
              className="text-[24px] xs:text-[26px] md:text-3xl font-bold text-center leading-tight"
              style={{
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                marginBottom: '16px',
              }}
            >
              ✨ Deus tem{' '}
              <span style={{ color: '#FFD76B' }}>revelações únicas</span>{' '}
              sobre sua vida amorosa...
              <br />
              Descubra{' '}
              <span style={{ color: '#C3A6FF' }}>quando</span>,{' '}
              como será essa pessoa e{' '}
              <span style={{ color: '#FFD76B' }}>os sinais proféticos</span>{' '}
              que Ele preparou especialmente para você.
            </h1>

            <p 
              className="text-center text-[15px] xs:text-base leading-relaxed"
              style={{ 
                color: '#D8D8E5', 
                marginTop: '8px',
                marginBottom: '16px'
              }}
            >
              Em apenas 2 minutos, <strong>comece gratuitamente</strong> a descobrir seu{' '}
              <strong>Mapa Profético exclusivo</strong>, revelando os próximos passos do plano de Deus para sua vida amorosa.
            </p>

            <div 
              className="rounded-lg p-3 mb-4"
              style={{
                backdropFilter: 'blur(8px)',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
            >
              <div className="flex items-center justify-center gap-2 text-[14px] font-medium text-center" style={{ color: '#FFFFFF' }}>
                <span className="text-lg">✨</span>
                <span>
                  <strong>+1.247 pessoas</strong> descobriram seu tempo espiritual esta semana • Dados atualizados hoje
                </span>
              </div>
            </div>

            <Button 
              asChild
              size="lg"
              className="w-full text-base font-bold transition-all duration-200 hover:scale-[1.03]"
              style={{
                height: '60px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #6C4AB6 0%, #B69FFF 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 20px rgba(108, 74, 182, 0.4)',
                padding: '0 32px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(108, 74, 182, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(108, 74, 182, 0.4)';
              }}
              onClick={() => {
                if (typeof window.fbq === 'function') {
                  window.fbq('trackCustom', 'StartQuiz');
                }
              }}
            >
              <Link to="/quiz">
                🔥 Receber Minha Revelação Agora
              </Link>
            </Button>

            <div className="text-center space-y-1 mt-4">
              <p 
                className="text-[12px] xs:text-[13px] flex flex-wrap items-center justify-center gap-2"
                style={{ color: '#CFCFE4' }}
              >
                <span>✅ 100% Cristão</span>
                <span>•</span>
                <span>⏱️ Apenas 2 minutos</span>
              </p>
              
              <p 
                className="text-[12px] xs:text-[13px] flex flex-wrap items-center justify-center gap-2"
                style={{ color: '#CFCFE4' }}
              >
                <span>✍️ Sem cadastro</span>
                <span>•</span>
              <span>📖 Alinhado à Bíblia</span>
              </p>
            </div>
          </div>

        <button 
          onClick={() => setShowMore(true)}
          className="absolute bottom-6 left-0 right-0 z-10 text-center text-[11px] xs:text-[12px] hover:opacity-100 transition-opacity"
          style={{ color: '#E2E8F0', opacity: 0.7 }}
        >
          Ver como funciona ↓
        </button>
      </div>

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
