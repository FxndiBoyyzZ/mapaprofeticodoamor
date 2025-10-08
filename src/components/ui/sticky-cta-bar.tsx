import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StickyCTABarProps {
  text?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
}

const StickyCTABar = ({
  text = "Pronto para desbloquear seu Mapa?",
  buttonText = "Quero meu Mapa",
  href,
  onClick,
}: StickyCTABarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Track custom checkout_click event
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', { value: 27, currency: 'BRL', source: 'sticky_bar' });
    }
    
    // Use custom onClick if provided, otherwise navigate to href
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t shadow-2xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ 
        background: 'rgba(40, 30, 25, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderColor: 'rgba(230, 126, 34, 0.3)'
      }}
    >
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white/80 hidden sm:block">{text}</p>
        <Button 
          className="w-full sm:w-auto rounded-xl font-bold text-sm sm:text-base hover:scale-[1.03] hover:brightness-110 transition-all duration-300 animate-glow-pulse px-3 sm:px-6"
          style={{ 
            background: 'linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #E67E22 100%)',
            color: 'white',
            paddingTop: '12px',
            paddingBottom: '12px',
            boxShadow: '0 8px 24px rgba(230, 126, 34, 0.5)'
          }}
          onClick={handleClick}
        >
          <Key className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{buttonText}</span>
        </Button>
      </div>
    </div>
  );
};

export default StickyCTABar;
