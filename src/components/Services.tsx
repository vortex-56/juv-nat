import { useState, useRef, TouchEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES, ServiceItem } from "../types";

// Íconos SVG dedicados con estilo y silueta idénticos a la referencia visual
function CorporateBriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  );
}

function AirportPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function FamilyGroupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Adult left */}
      <circle cx="6" cy="6.5" r="2.5" />
      <path d="M6 10.5c-2.2 0-4 1.8-4 4V20h3v-4h2v4h3v-5.5c0-2.2-1.8-4-4-4z" />
      {/* Adult right */}
      <circle cx="18" cy="6.5" r="2.5" />
      <path d="M18 10.5c-2.2 0-4 1.8-4 4V20h3v-4h2v4h3v-5.5c0-2.2-1.8-4-4-4z" />
      {/* Child center */}
      <circle cx="12" cy="11.5" r="2" />
      <path d="M12 14.5c-1.7 0-3 1.3-3 3V20h6v-2.5c0-1.7-1.3-3-3-3z" />
    </svg>
  );
}

function SocialToastGlassesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.5 3h4c.3 0 .5.2.5.5v3.5c0 1.5-1 2.8-2.4 3.1v3.9h1.9c.3 0 .5.2.5.5s-.2.5-.5.5h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.9V10.1C5 9.8 4 8.5 4 7V3.5c0-.3.2-.5.5-.5zm9 0h4c.3 0 .5.2.5.5v3.5c0 1.5-1 2.8-2.4 3.1v3.9h1.9c.3 0 .5.2.5.5s-.2.5-.5.5h-5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.9V10.1c-1.4-.3-2.4-1.6-2.4-3.1V3.5c0-.3.2-.5.5-.5z" />
      <circle cx="12" cy="4" r="1.1" />
      <circle cx="10" cy="1.6" r=".8" />
      <circle cx="14" cy="1.6" r=".8" />
    </svg>
  );
}

function DestinationPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function GroupsDelegationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "transporte-corporativo":
        return CorporateBriefcaseIcon;
      case "traslados-aeropuerto":
        return AirportPlaneIcon;
      case "paseos-familiares":
        return FamilyGroupIcon;
      case "eventos-sociales":
        return SocialToastGlassesIcon;
      case "viajes-privados-destinos":
        return DestinationPinIcon;
      case "transporte-grupos-delegaciones":
        return GroupsDelegationIcon;
      default:
        return CorporateBriefcaseIcon;
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    const selectElem = document.getElementById("tipo-servicio") as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = serviceTitle;
      selectElem.dispatchEvent(new Event("change", { bubbles: true }));
    }
    const heroElem = document.getElementById("inicio");
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SERVICES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderServiceCard = (service: ServiceItem) => {
    const IconComponent = getServiceIcon(service.id);

    return (
      <div
        key={service.id}
        className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full text-left"
      >
        {/* Imagen en proporción 16:9 con esquinas superiores redondeadas */}
        <div className="w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bloque inferior: Ícono a la izquierda de Título y Subtítulo */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
          <div className="flex items-start gap-3.5 sm:gap-4">
            {/* Ícono abajo y a la izquierda de los títulos y subtítulos */}
            <div className="shrink-0 text-[#8b1528] pt-1">
              <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            {/* Título y descripción */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base sm:text-lg font-black text-gray-900 group-hover:text-[#8b1528] transition-colors leading-tight mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="servicios" className="py-8 sm:py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado: Sin 'PROPUESTAS A MEDIDA', sin línea amarilla, NUESTROS en negro y SERVICIOS en rojo con letra más gruesa */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight">
            <span className="text-gray-950 font-extrabold">NUESTROS </span>
            <span className="text-[#8b1528] font-black">SERVICIOS</span>
          </h2>
          <p className="text-gray-600 font-sans text-sm sm:text-base mt-2">
            Soluciones de transporte para cada necesidad.
          </p>
        </div>

        {/* 1. Vista para ESCRITORIO: Se muestran los 6 servicios en formato 3 × 2 */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8">
          {SERVICES.map((service) => renderServiceCard(service))}
        </div>

        {/* 2. Vista para MÓVIL / PANTALLAS PEQUEÑAS: Carrusel interactivo */}
        <div className="block lg:hidden">
          <div
            className="relative overflow-hidden px-1 pb-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SERVICES.map((service) => (
                <div key={service.id} className="w-full shrink-0 px-1 sm:px-2">
                  {renderServiceCard(service)}
                </div>
              ))}
            </div>

            {/* Controles de navegación */}
            <button
              onClick={prevSlide}
              aria-label="Servicio anterior"
              className="absolute left-2 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-gray-800 shadow-lg border border-gray-200 flex items-center justify-center hover:bg-[#8b1528] hover:text-white transition-colors z-20 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente servicio"
              className="absolute right-2 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-gray-800 shadow-lg border border-gray-200 flex items-center justify-center hover:bg-[#8b1528] hover:text-white transition-colors z-20 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicadores de puntos (Paginación) */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {SERVICES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Ir al servicio ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? "w-8 bg-[#8b1528]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
