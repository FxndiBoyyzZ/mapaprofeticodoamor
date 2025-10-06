import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100;
      setIsScrolled(scrollPercentage > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCtaLink = () => {
    if (location.pathname === "/") return "#cta";
    if (location.pathname === "/quiz") return "/quiz";
    if (location.pathname === "/resultado") return "/checkout";
    return "/quiz";
  };

  const scrollToOrNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = getCtaLink();
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hide header on quiz page
  if (location.pathname === "/quiz") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-dark/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 h-[60px] flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1
            className={`text-xl font-heading font-bold transition-colors duration-300 ${
              isScrolled ? "text-white" : "text-primary"
            }`}
          >
            Profético Amoroso
          </h1>
        </Link>

        <Button
          asChild
          size="sm"
          variant={isScrolled ? "secondary" : "default"}
          className="h-9 px-4 rounded-full font-semibold"
        >
          <a href={getCtaLink()} onClick={scrollToOrNavigate}>
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Comprar
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
