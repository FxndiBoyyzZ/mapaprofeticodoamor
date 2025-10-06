import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Download, Mail, Sparkles, ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import tracking from "@/lib/tracking";

const Obrigado = () => {
  const { trackPurchase } = useTracking();

  useEffect(() => {
    // Track Purchase event with same event_id for deduplication
    trackPurchase(47, 'Mapa Profético do Seu Futuro Amoroso');
  }, []);
  return (
    <div className="min-h-screen w-full bg-secondary/20">
      <Header />

      <div className="pt-[100px] pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-primary mb-3">Compra confirmada! 🙌</h1>
            <p className="text-base text-text-secondary">
              Seu Mapa Profético está pronto. Agora é hora de aplicar e transformar sua vida amorosa.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 mb-12">
            {/* Step 1 */}
            <Card className="p-6 shadow-card animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-dark mb-3">Seu Mapa foi gerado</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Baixe agora seu PDF personalizado e salve para consultar sempre que precisar.
                  </p>
                  <Button className="w-full sm:w-auto rounded-full font-semibold">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar meu Mapa (PDF)
                  </Button>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 shadow-card animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lilac text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-dark mb-3">Verifique seu e-mail</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Enviamos uma cópia do seu Mapa e instruções de acesso para o e-mail cadastrado.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Mail className="w-4 h-4" />
                    <span>Se não receber em 5 minutos, verifique o spam</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 3 - Upsell Teaser */}
            <Card className="p-6 shadow-card border-2 border-golden/30 bg-gradient-to-br from-golden/5 to-white animate-fade-in-up" style={{ animationDelay: "450ms" }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-golden text-golden-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <Badge className="bg-golden text-golden-foreground mb-3 font-semibold">
                    ⚡ Recomendado
                  </Badge>
                  <h3 className="text-primary-dark mb-3">Participe do Desafio 7 Dias</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Potencialize seus resultados com áudios diários, diário de aplicação e roteiro de oração
                    guiado. Transforme conhecimento em ação real.
                  </p>
                  <Button asChild className="w-full sm:w-auto rounded-full font-semibold bg-golden hover:bg-golden/90 text-golden-foreground">
                    <Link to="/upsell">
                      Ver o Desafio 7 Dias
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Post-Purchase FAQ */}
          <div className="mb-12">
            <h3 className="text-primary-dark text-center mb-6">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-xl px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left font-medium text-text-primary hover:no-underline">
                  Quando vou receber meu Mapa?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary">
                  Seu Mapa está disponível imediatamente. Você pode baixar agora clicando no botão acima. Uma
                  cópia também foi enviada para seu e-mail em até 5 minutos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-xl px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left font-medium text-text-primary hover:no-underline">
                  Como funciona o suporte?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary">
                  Você pode entrar em contato conosco por e-mail (contato@profeticoamoroso.com) ou <a href="https://wa.link/dxs2et" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a> a qualquer momento.
                  qualquer momento. Respondemos em até 24 horas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-xl px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-left font-medium text-text-primary hover:no-underline">
                  E se eu quiser reembolso?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary">
                  Você tem 7 dias de garantia incondicional. Basta nos enviar um e-mail solicitando o reembolso
                  e processaremos em até 48 horas. Sem perguntas, sem complicação.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Final Message */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-lilac/5 border-primary/20 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-primary-dark mb-3">Sua jornada começa agora</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Dedique os próximos 7 dias para aplicar as direções do seu Mapa. Ore, reflita e tome decisões
              alinhadas com o propósito de Deus para sua vida amorosa. Estamos torcendo por você! 💙
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Obrigado;
