import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
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

  const navLinks = [
    { label: "Inicio", target: "inicio" },
    { label: "Servicios", target: "servicios" },
    { label: "Flota", target: "flota" },
    { label: "Nosotros", target: "nosotros" },
    { label: "Contacto", target: "contacto-seccion" },
  ];

  const servicesList = [
    "Transporte corporativo y ejecutivo",
    "Traslados desde y hacia el aeropuerto",
    "Paseos familiares",
    "Eventos sociales",
    "Viajes privados a destinos seleccionados",
    "Transporte para grupos y delegaciones",
  ];

  return (
    <footer id="contacto-seccion" className="bg-[#520d1a] border-t border-[#fab511]/20 text-red-100 pt-10 pb-6 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Columnas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          {/* Col 1: Logo oficial + presentación + redes sociales */}
          <div className="space-y-4">
            <a 
              href="#inicio" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("inicio");
              }} 
              aria-label="Transporte JUVASA - Inicio"
              className="inline-block cursor-pointer"
            >
              <img 
                src="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/logo01.webp"
                alt="Logo oficial Transporte JUVASA"
                width="168"
                height="48"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain transition-transform hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </a>
            
            <p className="text-xs sm:text-sm text-red-200/90 font-sans leading-relaxed">
              Brindamos servicios de transporte privado y turístico con seguridad, puntualidad y atención personalizada.
            </p>

            {/* Redes sociales */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#fab511] uppercase tracking-wider block mb-2">
                Redes sociales (@transportejuvasa)
              </span>
              <div className="flex flex-col gap-1 text-xs text-red-200 font-medium">
                <span>• Facebook: @transportejuvasa</span>
                <span>• Instagram: @transportejuvasa</span>
                <span>• TikTok: @transportejuvasa</span>
              </div>
            </div>
          </div>

          {/* Col 2: Enlaces rápidos */}
          <div className="space-y-4">
            <p className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
              Enlaces rápidos
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.target)}
                    className="text-xs sm:text-sm text-red-200 hover:text-[#fab511] transition-colors cursor-pointer block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Servicios */}
          <div className="space-y-4">
            <p className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
              Servicios
            </p>
            <ul className="space-y-2">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => {
                      const select = document.getElementById("tipo-servicio") as HTMLSelectElement | null;
                      if (select) {
                        select.value = service;
                        select.dispatchEvent(new Event("change", { bubbles: true }));
                      }
                      scrollToSection("inicio");
                    }}
                    className="text-xs sm:text-sm text-red-200 hover:text-[#fab511] transition-colors cursor-pointer text-left block"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="space-y-4">
            <p className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
              Contacto
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-red-100 font-sans">
              <a 
                href="https://wa.me/51981370909" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp al +51 981 370 909"
                className="flex items-center gap-2.5 hover:text-[#fab511] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#fab511] shrink-0" aria-hidden="true" />
                <span>WhatsApp: +51 981 370 909</span>
              </a>
              <a 
                href="mailto:reservas@transportejuvasa.com.pe" 
                aria-label="Enviar correo a reservas@transportejuvasa.com.pe"
                className="flex items-center gap-2.5 hover:text-[#fab511] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#fab511] shrink-0" aria-hidden="true" />
                <span className="break-words">Correo: reservas@transportejuvasa.com.pe</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#fab511] shrink-0" aria-hidden="true" />
                <span>Ubicación: Lima, Perú</span>
              </div>
            </div>
          </div>

        </div>

        {/* Empresa formal: RUC, Facturación electrónica, SOAT vigente, Permisos */}
        <div className="mt-8 pt-4 pb-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-red-200">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-bold text-[#fab511]">
              Empresa formal
            </span>
            <span className="px-2.5 py-1 bg-black/20 rounded-lg text-[10px] text-white">
              RUC Activo
            </span>
            <span className="px-2.5 py-1 bg-black/20 rounded-lg text-[10px] text-white">
              Facturación electrónica
            </span>
            <span className="px-2.5 py-1 bg-black/20 rounded-lg text-[10px] text-white">
              SOAT vigente
            </span>
            <span className="px-2.5 py-1 bg-black/20 rounded-lg text-[10px] text-white">
              Permisos correspondientes (MTC / ATU)
            </span>
          </div>

          <div className="text-[11px] text-red-200/80">
            Emitimos boletas y facturas para empresas y particulares.
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-red-200/70 font-sans">
          <span>&copy; {currentYear} Transporte JUVASA. Todos los derechos reservados.</span>
          <span>Transporte privado y turístico en Lima y Perú.</span>
        </div>

      </div>
    </footer>
  );
}
