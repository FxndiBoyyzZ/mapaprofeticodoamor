import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import tracking from '@/lib/tracking';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after small delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    tracking.setConsent(true);
    setIsVisible(false);
  };

  const handleReject = () => {
    tracking.setConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-primary/20">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-primary-dark font-semibold mb-2">
                🍪 Cookies e Privacidade
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Usamos cookies e tecnologias de rastreamento para melhorar sua experiência, 
                personalizar conteúdo e medir resultados das nossas campanhas. Ao continuar 
                navegando, você concorda com nossa{' '}
                <a href="/privacidade" className="text-primary underline hover:text-primary-dark">
                  Política de Privacidade
                </a>.
              </p>
            </div>
            <button
              onClick={handleReject}
              className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              size="lg"
              className="flex-1 sm:flex-initial rounded-full font-semibold"
            >
              Aceitar e continuar
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-initial rounded-full font-semibold"
            >
              Apenas necessários
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
