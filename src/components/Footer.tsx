import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { label: "Servicios", target: "servicios" },
    { label: "Flota", target: "flota" },
    { label: "Cobertura", target: "cobertura" },
    { label: "Nosotros", target: "nosotros" },
  ];

  const servicesList = [
    "Paseos familiares turísticos",
    "Transporte para Empresas",
    "Transporte de Personal",
    "Traslados al Aeropuerto",
    "Eventos Sociales",
    "Eventos Corporativos",
  ];
  return (
    <footer id="contacto-footer" className="bg-brand-red-dark border-t border-brand-yellow/20 text-red-100 pt-16 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-yellow/10">
          
          {/* Col 1: JUVASA brand brief */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("inicio")}>
              <img 
                src="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/logo01.webp"
                alt="Logo Transporte Juvasa"
                className="h-12 sm:h-14 w-auto object-contain hover:scale-105 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-red-200/90 font-sans leading-relaxed max-w-sm">
              Brindamos las mejores soluciones de transporte privado en el Perú con un enfoque riguroso de seguridad, puntualidad y el máximo confort para que viajes seguro.
            </p>
          </div>

          {/* Col 2: Enlaces Rápidos */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">Enlaces rápidos</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="text-xs sm:text-sm text-red-200 hover:text-brand-yellow transition-colors cursor-pointer block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Servicios */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">Nuestros Servicios</h4>
            <ul className="space-y-2.5">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      const select = document.getElementById("tipo-servicio") as HTMLSelectElement | null;
                      if (select) {
                        select.value = service;
                        select.dispatchEvent(new Event("change", { bubbles: true }));
                      }
                      scrollToSection("contacto");
                    }}
                    className="text-xs sm:text-sm text-red-200 hover:text-brand-yellow transition-colors cursor-pointer text-left block"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">Contacto</h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-red-100 font-sans">
              <a href="tel:+51981370909" className="flex items-center gap-2.5 hover:text-brand-yellow transition-colors">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>+51 981 370 909</span>
              </a>
              <a href="mailto:informes@transportejuvasa.com.pe" className="flex items-center gap-2.5 hover:text-brand-yellow transition-colors">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0 animate-pulse-slow" />
                <span className="truncate">informes@transportejuvasa.com.pe</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>Lima, Perú</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] bg-brand-red/35 border border-brand-yellow/20 p-2 rounded-lg text-brand-yellow">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Guardia y Atención 24/7</span>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Legal Footer Banner */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-between text-xs text-red-200/95 border-b border-brand-yellow/10 pb-8">
          <div className="flex flex-wrap gap-4 items-center md:justify-start">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-red/30 border border-brand-yellow/20 rounded-lg text-[10px] uppercase leading-none">
              <span>SOAT Vigente</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-red/30 border border-brand-yellow/20 rounded-lg text-[10px] uppercase leading-none">
              <span>MTC Permiso Oficial</span>
            </div>
          </div>
          
          <div className="md:text-right text-[11px] font-sans">
            Comprobantes de pago: <span className="text-white font-bold">Emitimos Facturación Electrónica</span> (Boletas y Facturas para deducción de gastos).
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-200/70 font-sans">
          <span>&copy; {currentYear} Transporte Juvasa. Todos los derechos reservados.</span>
          <div className="flex items-center gap-1 text-[11px] text-red-200/50">
            <span>Hecho para el Transporte y Turismo Ejecutivo en el Perú.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
