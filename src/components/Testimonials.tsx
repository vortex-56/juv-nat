import { useState, useRef, useEffect, TouchEvent, MouseEvent } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, ExternalLink } from "lucide-react";
import { TESTIMONIALS, TestimonialItem } from "../types";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const googleMapsUrl =
    "https://www.google.com/maps/place/Transporte+Juvasa/@-12.026445,-77.3174408,10z/data=!3m1!4b1!4m6!3m5!1s0x610005759ea32923:0x5668248138d7cc55!8m2!3d-12.0266383!4d-76.9877792!16s%2Fg%2F11l5y65sr8";

  // En móvil: 1 comentario. En escritorio: 3 comentarios
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = Math.max(0, TESTIMONIALS.length - visibleCount);

  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, maxSlide));
  }, [maxSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  // Manejo de gestos táctiles (swipe)
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Manejo de arrastre con mouse
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || mouseStartX.current === null) return;
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setIsDragging(false);
    mouseStartX.current = null;
  };

  // Render de tarjeta individual de testimonio real de Google Maps (sin respuesta del propietario)
  const renderTestimonialCard = (item: TestimonialItem) => (
    <div className="p-5 sm:p-6 bg-white border border-gray-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between h-full space-y-4">
      <div className="space-y-3">
        {/* Cabecera del usuario: Avatar con iniciales al estilo Google Maps + Nombre + Tiempo */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-display font-black text-sm flex items-center justify-center shrink-0 shadow-xs select-none relative`}
            >
              {item.initials}
              {/* Badge oficial Google */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs border border-gray-200">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-gray-950 leading-tight">
                {item.author}
              </h4>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                {item.role} · <span className="text-gray-400">{item.timeAgo}</span>
              </p>
            </div>
          </div>

          <MessageSquareQuote className="w-5 h-5 text-[#6c1323]/25 shrink-0" />
        </div>

        {/* Calificación: 5 estrellas amarillas */}
        <div className="flex items-center gap-1 text-[#fab511] pt-0.5">
          {Array.from({ length: item.stars }).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-[#fab511] text-[#fab511] shrink-0" />
          ))}
          <span className="text-xs font-bold text-gray-700 ml-1.5">5.0</span>
        </div>

        {/* Comentario del cliente */}
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
          "{item.comment}"
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-8 sm:py-10 bg-gray-50/60 border-b border-gray-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado con badge y enlace a Google Maps */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <p className="text-xs sm:text-sm font-extrabold tracking-wider text-gray-500 uppercase">
            EXPERIENCIAS DE
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-[900] text-gray-900 tracking-tight leading-tight">
            NUESTROS <span className="text-[#6c1323]">CLIENTES</span>
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm">
            Opiniones verificadas de clientes reales en Google Maps.
          </p>

          <div className="pt-1.5 flex items-center justify-center gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-xs text-xs font-bold text-gray-800 hover:text-[#6c1323] hover:border-[#6c1323]/30 transition-all cursor-pointer group"
            >
              {/* Google G icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>5.0 en Google Maps · Ver perfil oficial</span>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-[#6c1323] transition-colors" />
            </a>
          </div>
        </div>

        {/* Carrusel interactivo unificado: 3 en escritorio, 1 en móvil */}
        <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
          <div
            className="overflow-hidden py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              if (isDragging) setIsDragging(false);
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleCount)}%)`,
              }}
            >
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 px-2 sm:px-2.5 h-full"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {renderTestimonialCard(item)}
                </div>
              ))}
            </div>
          </div>

          {/* Flecha anterior */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Comentario anterior"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Flecha siguiente */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente comentario"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicadores de puntos */}
          <div className="flex justify-center items-center gap-1.5 mt-5">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={`dot-page-${index}`}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ver página ${index + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === index
                    ? "w-7 bg-[#6c1323]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
