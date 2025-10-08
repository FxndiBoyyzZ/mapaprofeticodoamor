import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Termos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-secondary/20">
      <Header />

      <div className="pt-[100px] pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/resultado")}
            className="mb-6 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Resultado
          </Button>
          
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-primary mb-3">Termos de Uso</h1>
            <p className="text-sm text-text-muted">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <Card className="p-8 md:p-12 shadow-card space-y-6 text-text-secondary">
            <section>
              <h2 className="text-primary-dark mb-3">1. Aceitação dos Termos</h2>
              <p className="text-sm leading-relaxed">
                Ao acessar e usar este site, você concorda com estes Termos de Uso e nossa 
                Política de Privacidade. Se você não concorda, não use nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">2. Descrição do Serviço</h2>
              <p className="text-sm leading-relaxed mb-3">
                O Mapa Profético do Seu Futuro Amoroso é um produto digital de conteúdo 
                espiritual e inspiracional. Oferecemos:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Quiz personalizado sobre vida amorosa</li>
                <li>Mapa profético em formato PDF</li>
                <li>Reflexões bíblicas e direções práticas</li>
                <li>Produtos complementares (upsells)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">3. Natureza do Conteúdo</h2>
              <p className="text-sm leading-relaxed mb-3">
                <strong>Aviso Importante:</strong> Este é um conteúdo espiritual inspiracional 
                baseado em princípios bíblicos e reflexões pessoais. NÃO é:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Profecia pessoal ou revelação divina direta</li>
                <li>Aconselhamento psicológico ou terapêutico</li>
                <li>Garantia de resultados específicos na vida amorosa</li>
                <li>Promessa de casamento, reconciliação ou eventos futuros</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Os resultados dependem da sua aplicação pessoal e circunstâncias individuais.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">4. Compra e Pagamento</h2>
              <p className="text-sm leading-relaxed mb-3">
                Ao realizar uma compra, você concorda que:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Todas as vendas são processadas por plataformas terceiras (Hotmart, etc.)</li>
                <li>Os preços estão em Reais (BRL) e podem mudar sem aviso prévio</li>
                <li>O acesso ao produto é concedido imediatamente após confirmação do pagamento</li>
                <li>Produtos digitais não podem ser devolvidos fisicamente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">5. Garantia e Reembolso</h2>
              <p className="text-sm leading-relaxed mb-3">
                Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito por 
                qualquer motivo, solicitamos o reembolso total em até 48 horas.
              </p>
              <p className="text-sm leading-relaxed">
                Para solicitar, envie e-mail para: contato@profeticoamoroso.com
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">6. Propriedade Intelectual</h2>
              <p className="text-sm leading-relaxed mb-3">
                Todo o conteúdo deste site (textos, imagens, design, código, PDFs) é protegido 
                por direitos autorais. Você NÃO pode:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Copiar, reproduzir ou distribuir o conteúdo sem autorização</li>
                <li>Revender ou comercializar os materiais</li>
                <li>Modificar ou criar obras derivadas</li>
                <li>Usar para fins comerciais sem permissão</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">7. Uso Aceitável</h2>
              <p className="text-sm leading-relaxed mb-3">
                Ao usar nosso site, você concorda em NÃO:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Violar leis ou regulamentos aplicáveis</li>
                <li>Tentar hackear, sobrecarregar ou prejudicar o site</li>
                <li>Coletar dados de outros usuários sem permissão</li>
                <li>Usar o serviço para spam ou atividades fraudulentas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">8. Isenção de Responsabilidade</h2>
              <p className="text-sm leading-relaxed mb-3">
                O conteúdo é fornecido "como está", sem garantias de qualquer tipo. Não nos 
                responsabilizamos por:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-4">
                <li>Decisões tomadas com base no conteúdo</li>
                <li>Resultados ou falta de resultados na vida pessoal</li>
                <li>Erros, imprecisões ou omissões no material</li>
                <li>Problemas técnicos, perda de dados ou interrupções</li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">9. Limitação de Responsabilidade</h2>
              <p className="text-sm leading-relaxed">
                Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, 
                incidentais ou consequenciais resultantes do uso ou incapacidade de usar 
                nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">10. Links para Terceiros</h2>
              <p className="text-sm leading-relaxed">
                Nosso site pode conter links para sites de terceiros (processadores de 
                pagamento, redes sociais). Não somos responsáveis pelo conteúdo ou práticas 
                desses sites.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">11. Modificações dos Termos</h2>
              <p className="text-sm leading-relaxed">
                Reservamos o direito de modificar estes termos a qualquer momento. Mudanças 
                significativas serão notificadas por e-mail ou aviso no site.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">12. Lei Aplicável</h2>
              <p className="text-sm leading-relaxed">
                Estes termos são regidos pelas leis brasileiras. Quaisquer disputas serão 
                resolvidas nos tribunais competentes do Brasil.
              </p>
            </section>

            <section>
              <h2 className="text-primary-dark mb-3">13. Contato</h2>
              <p className="text-sm leading-relaxed">
                Para questões sobre estes termos:
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li><strong>E-mail:</strong> contato@profeticoamoroso.com</li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/+5511966138651?text=Ol%C3%A1%2C%20estou%20com%20d%C3%BAvida%20em%20rela%C3%A7%C3%A3o%20ao%20meu%20Mapa..." target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(11) 96613-8651</a></li>
              </ul>
            </section>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Termos;
