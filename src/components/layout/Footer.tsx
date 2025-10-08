import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-24 py-12">
      <div className="container mx-auto px-4">
        {/* Manifesto */}
        <div className="text-center mb-8">
          <p className="text-base text-text-secondary font-medium">
            Clareza, direção e fé para sua vida amorosa.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 mb-8" aria-label="Footer navigation">
          <Link to="/" className="text-sm text-text-muted hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="/quiz" className="text-sm text-text-muted hover:text-primary transition-colors">
            Quiz
          </Link>
          <Link to="/#faq" className="text-sm text-text-muted hover:text-primary transition-colors">
            Perguntas
          </Link>
          <Link to="/#cta" className="text-sm text-text-muted hover:text-primary transition-colors">
            Comprar
          </Link>
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Tenho%20dúvidas%20sobre%20o%20Mapa%20Profético%20do%20Amor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Contato
          </a>
        </nav>

        {/* Educational Notice */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-text-muted mb-4 max-w-2xl mx-auto">
            Conteúdo espiritual inspiracional. Este material oferece reflexões baseadas em princípios
            bíblicos e não garante resultados específicos. Seu uso é de responsabilidade pessoal.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-text-muted">
            <Link to="/privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
          <p className="text-xs text-text-muted mt-4">
            © 2025 Profético Amoroso. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
