import { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { label: "Servicios", target: "servicios" },
    { label: "Flota", target: "flota" },
    { label: "Cobertura", target: "cobertura" },
    { label: "Nosotros", target: "nosotros" },
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-red-dark/95 backdrop-blur-md shadow-lg py-2 border-b border-brand-yellow/10"
          : "bg-gradient-to-b from-brand-red-dark/95 to-brand-red-dark/0 py-3 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => scrollToSection("inicio")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img 
              src="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/logo01.webp"
              alt="Logo Transporte Juvasa"
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="text-[11px] xl:text-xs font-bold uppercase tracking-wider text-white hover:text-brand-yellow hover:scale-105 transition-all cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-yellow after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection("contacto")}
              className="px-4 py-2 xl:px-5 xl:py-2.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-red-dark font-extrabold text-[10px] xl:text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_14px_rgba(250,191,18,0.25)] hover:shadow-[0_6px_20px_rgba(250,191,18,0.4)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
              Cotizar por WhatsApp
            </button>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-brand-yellow focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-[64px] left-0 w-full bg-brand-red-dark/95 border-b border-brand-yellow/20 backdrop-blur-lg shadow-2xl transition-all duration-300 transform ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-3 flex flex-col items-stretch">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-brand-red/30 hover:text-brand-yellow transition-colors border-l-2 border-transparent hover:border-brand-yellow"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-brand-yellow/10">
            <button
              onClick={() => scrollToSection("contacto")}
              className="w-full py-3.5 bg-brand-yellow text-brand-red-dark font-extrabold text-sm uppercase tracking-wide rounded-xl shadow-lg flex items-center justify-center gap-2 focus:outline-none active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              Cotizar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
