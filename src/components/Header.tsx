import { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
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
    { label: "Inicio", target: "inicio" },
    { label: "Servicios", target: "servicios" },
    { label: "Flota", target: "flota" },
    { label: "Nosotros", target: "nosotros" },
    { label: "Contacto", target: "contacto-seccion" },
  ];

  return (
    <header
      id="header"
      className="absolute top-0 left-0 right-0 z-50 bg-[#6c1323] border-b border-[#fab511]/20 py-3 md:py-4 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo oficial de Transporte JUVASA sin modificar ni deformar */}
          <a 
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("inicio");
            }}
            aria-label="Transporte JUVASA - Inicio"
            className="flex items-center cursor-pointer group select-none"
          >
            <img 
              src="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/logo01.webp"
              alt="Transporte JUVASA"
              width="168"
              height="48"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Menú de navegación */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="text-xs xl:text-sm font-bold uppercase tracking-wider text-white hover:text-[#fab511] transition-colors cursor-pointer relative py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Botón destacado: Cotiza por WhatsApp con amarillo corporativo */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/51981370909?text=Hola%2C%20deseo%20cotizar%20un%20servicio%20de%20transporte%20privado%20con%20Transporte%20JUVASA."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cotiza por WhatsApp al +51 981 370 909"
              className="px-5 py-2.5 bg-[#fab511] hover:bg-[#e2a20b] text-[#6c1323] font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_16px_rgba(250,181,17,0.35)] hover:shadow-[0_6px_22px_rgba(250,181,17,0.5)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 fill-[#6c1323]" aria-hidden="true" />
              Cotiza por WhatsApp
            </a>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-[#fab511] focus:outline-none transition-colors"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <nav
        id="mobile-nav"
        aria-label="Navegación móvil"
        className={`lg:hidden absolute top-full left-0 w-full bg-[#6c1323] border-b border-[#fab511]/20 backdrop-blur-xl shadow-2xl transition-all duration-300 transform ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-5 py-6 space-y-3 flex flex-col items-stretch">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="text-left py-2.5 px-3 rounded-lg text-sm font-bold text-white hover:bg-black/20 hover:text-[#fab511] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10">
            <a
              href="https://wa.me/51981370909?text=Hola%2C%20deseo%20cotizar%20un%20servicio%20de%20transporte%20privado%20con%20Transporte%20JUVASA."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cotiza por WhatsApp al +51 981 370 909"
              className="w-full py-3 bg-[#fab511] text-[#6c1323] font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 fill-[#6c1323]" aria-hidden="true" />
              Cotiza por WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
