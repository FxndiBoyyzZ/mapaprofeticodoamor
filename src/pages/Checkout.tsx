import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle2, MessageCircle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";

const Checkout = () => {
  const CHECKOUT_URL = "https://pay.cakto.com.br/7k6p9n7_596897";
  const WHATSAPP_URL = "https://wa.me/+5511966138651?text=Ol%C3%A1%2C%20estou%20com%20d%C3%BAvida%20em%20rela%C3%A7%C3%A3o%20ao%20meu%20Mapa...";
  const PRECO = "27";
  
  const { trackViewContent, trackInitiateCheckout } = useTracking();
  const [showSticky, setShowSticky] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);

  useEffect(() => {
    // Track ViewContent on page load only (not InitiateCheckout)
    trackViewContent({
      content_name: "checkout_bridge",
      content_category: "checkout"
    });

    // Sticky CTA visibility on scroll
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowSticky(scrollPercentage > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackViewContent]);

  const goToCheckout = () => {
    // Fire InitiateCheckout with event_id
    trackInitiateCheckout(Number(PRECO));
    
    // Redirect with all tracking params
    const checkoutUrlWithParams = tracking.appendParams(CHECKOUT_URL);
    window.location.href = checkoutUrlWithParams;
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Mapa Profético do Seu Futuro Amoroso</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen w-full bg-[#F8FAFC]">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-[640px]">
          <Card className="p-5 sm:p-6 rounded-2xl border-[#EEF2FF] shadow-[0_8px_24px_rgba(15,23,42,0.10)] animate-fade-in-up">
            {/* Header with Title and Price */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text-[22px] leading-[28px] sm:text-[26px] sm:leading-[32px] font-bold text-primary font-[Poppins]">
                Mapa Profético do Seu Futuro Amoroso
              </h1>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[11px] text-[#94A3B8] line-through">de R$97</span>
                <span className="text-[28px] sm:text-[32px] leading-tight font-bold text-primary font-[Poppins]">
                  R${PRECO}
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-[13px] leading-[18px] text-[#334155] mb-5">
              Acesso completo • PDF personalizado
            </p>

            {/* Main Benefits (3 bullets) */}
            <div className="space-y-3 mb-4">
              {[
                "Mapa personalizado (PDF bonito)",
                "Plano de 7 dias com direções práticas",
                "Acesso imediato após pagamento"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-[18px] h-[18px] text-[#FFD700] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[16px] leading-[24px] text-[#334155]">{item}</span>
                </div>
              ))}
            </div>

            {/* Collapsible Extra Benefits */}
            <Collapsible open={isBenefitsOpen} onOpenChange={setIsBenefitsOpen} className="mb-6">
              <CollapsibleTrigger asChild>
                <button 
                  className="text-[13px] text-primary hover:text-primary/80 transition-colors flex items-center gap-1 mb-4"
                  aria-label={isBenefitsOpen ? "Ver menos benefícios" : "Ver mais benefícios"}
                >
                  {isBenefitsOpen ? "ver menos" : "ver mais benefícios"}
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${isBenefitsOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mb-6 animate-accordion-down">
                {[
                  "Análise do seu tempo espiritual",
                  "Versículos e reflexões personalizadas",
                  "Suporte por e-mail/WhatsApp",
                  "Atualizações do material quando houver"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-[14px] h-[14px] text-[#FFD700] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-[13px] leading-[18px] text-[#64748B]">{item}</span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Primary CTA */}
            <Button
              onClick={goToCheckout}
              className="w-full h-[52px] rounded-full bg-[#3F51B5] hover:bg-[#283593] text-white font-semibold text-[16px] font-[Poppins] transition-all duration-200 active:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#3F51B5] focus:ring-offset-2 shadow-lg hover:shadow-xl mb-3"
              aria-label="Pagar com segurança agora"
            >
              Pagar com segurança agora
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Button>

            {/* Microcopy under button */}
            <p className="text-[13px] leading-[18px] text-center text-[#334155] mb-6">
              Você será redirecionado ao pagamento seguro. Acesso imediato e garantia de 7 dias.
            </p>

            {/* Guarantee Card */}
            <Card className="p-4 rounded-lg border-2 border-[#3F51B5] bg-[#F2F4FF] mb-5">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#7C3AED] flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-[16px] leading-[22px] font-semibold text-primary mb-1 font-[Poppins]">
                    Garantia de 7 dias
                  </h3>
                  <p className="text-[13px] leading-[18px] text-[#334155]">
                    Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Trust Line */}
            <div className="flex items-center justify-center gap-3 text-[13px] text-[#334155] mb-5 flex-wrap">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" aria-hidden="true" />
                <span>SSL Seguro</span>
              </div>
              <span className="text-[#94A3B8]">•</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Dados Protegidos</span>
              </div>
              <span className="text-[#94A3B8]">•</span>
              <span>Plataforma Reconhecida</span>
            </div>

            {/* Secondary CTA - WhatsApp */}
            <Button
              asChild
              variant="outline"
              className="w-full h-[48px] rounded-full border-2 border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5]/5 font-medium transition-colors mb-4"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
                <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </Button>

            {/* Back Link */}
            <div className="text-center">
              <Link 
                to="/resultado" 
                className="text-[13px] text-[#94A3B8] hover:text-[#64748B] transition-colors inline-flex items-center gap-1"
              >
                ← Voltar para o resultado
              </Link>
            </div>
          </Card>
        </div>

        {/* Sticky CTA Bar (Mobile) */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EEF2FF] shadow-[0_-2px_16px_rgba(0,0,0,0.08)] transition-all duration-200 ${
            showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          } sm:hidden`}
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="container mx-auto px-4 py-3">
            <p className="text-[13px] text-center text-[#334155] mb-2 font-medium">
              Pronto para garantir seu Mapa?
            </p>
            <Button
              onClick={goToCheckout}
              className="w-full h-[52px] rounded-full bg-[#3F51B5] hover:bg-[#283593] text-white font-semibold text-[15px] font-[Poppins] transition-all duration-200 active:scale-[1.01] shadow-lg"
              aria-label={`Garantir meu Mapa por R$${PRECO} – Ir para pagamento seguro`}
            >
              Garantir meu Mapa por R${PRECO}
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
            className="h-[52px] px-6 rounded-full bg-[#3F51B5] hover:bg-[#283593] text-white font-semibold text-[15px] font-[Poppins] transition-all duration-200 hover:scale-105 shadow-xl"
            aria-label="Garantir meu Mapa"
          >
            Garantir por R${PRECO}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
