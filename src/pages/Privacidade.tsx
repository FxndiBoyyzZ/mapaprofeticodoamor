import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";

const Privacidade = () => {
  return (
    <div className="min-h-screen w-full bg-secondary/20">
      <Header />

      <div className="pt-[100px] pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-primary mb-3">Política de Privacidade</h1>
            <p className="text-sm text-text-muted">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <Card className="p-8 md:p-12 shadow-card space-y-6 text-text-secondary">
            <section>
              <h2 className="text-primary-dark mb-3">1. Informações que Coletamos</h2>
              <p className="text-sm leading-relaxed mb-3">
                Coletamos informações que você nos fornece diretamente, como nome e e-mail ao 
                preencher o quiz. Também coletamos automaticamente dados de navegação, incluindo 
                endereço IP, tipo de dispositivo, navegador e interações com o site.
              </p>
              <p className="text-sm leading-relaxed">
                Utilizamos cookies e tecnologias similares (incluindo Facebook Pixel e Google Tag 
                Manager) para rastrear sua navegação e melhorar sua experiência.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">2. Como Usamos Suas Informações</h2>
              <p className="text-sm leading-relaxed">
                Suas informações são utilizadas para:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 mt-2 ml-4">
                <li>Personalizar e entregar seu Mapa Profético</li>
                <li>Processar pagamentos e enviar confirmações</li>
                <li>Enviar e-mails com conteúdo, atualizações e ofertas</li>
                <li>Melhorar nossos produtos e serviços</li>
                <li>Medir a eficácia das nossas campanhas de marketing</li>
                <li>Prevenir fraudes e garantir a segurança</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">3. Compartilhamento de Dados</h2>
              <p className="text-sm leading-relaxed mb-3">
                Não vendemos suas informações pessoais. Podemos compartilhar dados com:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Processadores de pagamento (Hotmart, Stripe, etc.)</li>
                <li>Plataformas de e-mail marketing</li>
                <li>Meta (Facebook) para otimização de campanhas publicitárias</li>
                <li>Google para análise de tráfego e publicidade</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">4. Cookies e Rastreamento</h2>
              <p className="text-sm leading-relaxed mb-3">
                Utilizamos cookies essenciais, funcionais, analíticos e de marketing. Você pode 
                gerenciar suas preferências através do banner de cookies ou configurações do 
                navegador. Note que desabilitar cookies pode afetar a funcionalidade do site.
              </p>
              <p className="text-sm leading-relaxed">
                Utilizamos Facebook Pixel e Google Tag Manager para rastrear conversões e 
                otimizar anúncios. Esses serviços podem coletar dados adicionais conforme suas 
                próprias políticas de privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">5. Seus Direitos (LGPD)</h2>
              <p className="text-sm leading-relaxed mb-3">
                Você tem direito a:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Acessar, corrigir ou excluir suas informações pessoais</li>
                <li>Solicitar a portabilidade dos seus dados</li>
                <li>Revogar seu consentimento a qualquer momento</li>
                <li>Opor-se ao processamento de dados</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Para exercer seus direitos, entre em contato: contato@profeticoamoroso.com
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">6. Segurança</h2>
              <p className="text-sm leading-relaxed">
                Implementamos medidas técnicas e organizacionais para proteger seus dados contra 
                acesso não autorizado, perda ou divulgação. No entanto, nenhum sistema é 100% 
                seguro.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">7. Retenção de Dados</h2>
              <p className="text-sm leading-relaxed">
                Mantemos suas informações pelo tempo necessário para cumprir os propósitos 
                descritos nesta política, salvo quando um período maior for exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">8. Alterações nesta Política</h2>
              <p className="text-sm leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças 
                significativas por e-mail ou aviso no site.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">9. Contato</h2>
              <p className="text-sm leading-relaxed">
                Para dúvidas sobre privacidade, entre em contato:
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li><strong>E-mail:</strong> contato@profeticoamoroso.com</li>
                <li><strong>WhatsApp:</strong> (11) 99999-9999</li>
              </ul>
            </section>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacidade;
