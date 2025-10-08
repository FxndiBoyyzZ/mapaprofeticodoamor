import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Headphones, BookOpen, Heart, ArrowRight, ExternalLink } from "lucide-react";
import devotionalImage from "@/assets/devotional-desk.jpg";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";

const Upsell = () => {
  // Replace with your actual checkout URL for upsell
  const CHECKOUT_URL_UPSELL = "https://pay.hotmart.com/YYYYYYYYY";
  const { trackViewContent, trackInitiateCheckout } = useTracking();

  useEffect(() => {
    // Track ViewContent for upsell page
    trackViewContent({
      content_name: 'Desafio 7 Dias',
      content_category: 'upsell',
    });
  }, []);

  const checkoutUrlWithParams = tracking.appendParams(CHECKOUT_URL_UPSELL);

  const handleUpsellClick = () => {
    trackInitiateCheckout(27);
  };

  return (
    <div className="min-h-screen w-full bg-secondary/20">
      <Header />

      <div className="pt-[100px] pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Badge className="bg-golden text-golden-foreground mb-4 px-4 py-1.5 font-semibold">
              ⚡ Oferta Exclusiva Pós-Compra
            </Badge>
            <h1 className="text-primary mb-4">
              Desafio 7 Dias para Destravar sua Vida Amorosa
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Você tem o Mapa. Agora transforme conhecimento em ação real com acompanhamento diário guiado.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-card animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <img
              src={devotionalImage}
              alt="Mesa com Bíblia, devocional e luz da manhã"
              className="w-full h-auto aspect-video object-cover"
              loading="lazy"
            />
          </div>

          {/* Emotional Hook */}
          <Card className="p-8 mb-8 shadow-card animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <p className="text-base text-text-secondary leading-relaxed mb-6">
              Ter o Mapa é o primeiro passo. Mas aqui está a verdade: <strong>informação sem aplicação não
              muda nada</strong>. Muitas pessoas baixam o Mapa, sentem-se inspiradas, mas voltam à rotina sem
              colocar em prática.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              O <strong>Desafio 7 Dias</strong> é o sistema que garante que você vai aplicar cada direção,
              orar com foco e sentir a transformação real na sua vida amorosa.
            </p>
          </Card>

          {/* What's Included */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <h2 className="text-primary-dark text-center mb-6">O que está incluído:</h2>
            
            <div className="space-y-4">
              <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-primary-dark mb-2">7 Áudios Devocionais Diários</h3>
                    <p className="text-sm text-text-secondary">
                      Mensagens curtas (5-7 min) para você ouvir pela manhã. Direção, oração e motivação para
                      cada dia da sua jornada.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-lilac/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-lilac" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-primary-dark mb-2">Diário de Aplicação (PDF interativo)</h3>
                    <p className="text-sm text-text-secondary">
                      Registro diário para anotar insights, orações e decisões. No final dos 7 dias, você terá
                      um histórico completo da sua transformação.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-golden/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-golden" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-primary-dark mb-2">Roteiro de Oração Guiado</h3>
                    <p className="text-sm text-text-secondary">
                      Passo a passo de como orar por cada área da sua vida amorosa. Palavras prontas para você
                      personalizar e usar com confiança.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Benefits */}
          <Card className="p-8 bg-primary/5 border-primary/20 mb-8 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <h3 className="text-primary-dark text-center mb-6">Por que funciona:</h3>
            <div className="space-y-3">
              {[
                "Estrutura diária que elimina a procrastinação",
                "Conteúdo pronto para você não ter que pensar no que fazer",
                "Motivação constante para não desistir no meio",
                "Registro das suas decisões e mudanças",
                "Oração focada que traz paz e clareza real"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-8 shadow-xl border-2 border-golden/30 mb-8 animate-fade-in-up" style={{ animationDelay: "750ms" }}>
            <div className="text-center space-y-6">
              <Badge className="bg-golden text-golden-foreground font-bold px-4 py-2 text-sm">
                🔥 Só para quem acabou de comprar
              </Badge>

              <div>
                <p className="text-sm text-text-muted line-through mb-1">De R$ 67</p>
                <h2 className="text-primary text-4xl mb-2">R$ 27</h2>
                <p className="text-sm text-text-secondary">Acesso vitalício • Comece hoje mesmo</p>
              </div>

              <Button 
                asChild 
                size="lg" 
                className="w-full h-14 rounded-full font-bold text-lg bg-golden hover:bg-golden/90 text-golden-foreground shadow-button hover:scale-[1.02] transition-transform"
              >
                <a 
                  href={checkoutUrlWithParams} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleUpsellClick}
                >
                  Adicionar à minha jornada por R$ 27
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>

              <p className="text-xs text-text-muted">
                Esta oferta especial só está disponível agora. Depois, o valor volta para R$ 67.
              </p>
            </div>
          </Card>

          {/* Social Proof */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "900ms" }}>
            <h3 className="text-primary-dark text-center mb-6">Quem fez o Desafio, conta:</h3>
            <div className="grid gap-4">
              <Card className="p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-lilac flex items-center justify-center text-white font-bold flex-shrink-0">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary mb-1">Ana Paula R.</p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      "Os áudios me ajudaram a começar o dia com fé. No 5º dia, tomei a decisão que estava
                      adiando há meses. Não tem preço."
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-golden to-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    F
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary mb-1">Felipe N.</p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      "O diário de aplicação foi um divisor de águas. Ver minha evolução escrita me deu
                      confiança de que Deus estava trabalhando."
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <Button asChild variant="ghost" size="sm" className="text-text-muted hover:text-text-secondary">
              <Link to="/obrigado">Pular por enquanto →</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Upsell;
