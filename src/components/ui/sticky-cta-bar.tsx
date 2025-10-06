import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface StickyCTABarProps {
  text?: string;
  buttonText?: string;
  href: string;
}

const StickyCTABar = ({
  text = "Pronto para desbloquear seu Mapa?",
  buttonText = "Quero meu Mapa",
  href,
}: StickyCTABarProps) => {
  const [isVisible, setIsVisible] = useState(false);

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
      window.fbq('trackCustom', 'checkout_click', { value: 47, currency: 'BRL', source: 'sticky_bar' });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-2xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-text-secondary hidden sm:block">{text}</p>
        <Button 
          asChild 
          className="w-full sm:w-auto rounded-xl font-bold text-sm sm:text-base shadow-button hover:scale-[1.03] hover:brightness-110 transition-all duration-300 animate-glow-pulse px-3 sm:px-6"
          style={{ backgroundColor: '#6C4AB6', color: 'white', paddingTop: '12px', paddingBottom: '12px' }}
          onClick={handleClick}
        >
          <a href={href} className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Key className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{buttonText}</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default StickyCTABar;
