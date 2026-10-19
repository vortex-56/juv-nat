import { useState, useRef, TouchEvent } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, TestimonialItem } from "../types";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Manejo de gestos táctiles (swipe) en dispositivos móviles
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
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Render de tarjeta individual de testimonio
  const renderTestimonialCard = (item: TestimonialItem) => (
    <div className="p-6 sm:p-8 bg-gray-50/80 border border-gray-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between h-full space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* Calificación: 5 estrellas amarillas */}
          <div className="flex gap-1 text-[#fab511]">
            {Array.from({ length: item.stars }).map((_, idx) => (
              <Star key={idx} className="w-4 h-4 fill-[#fab511] text-[#fab511] shrink-0" />
            ))}
          </div>
          {/* Comillas decorativas */}
          <Quote className="w-6 h-6 text-[#6c1323]/25 shrink-0" />
        </div>

        {/* Comentario */}
        <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed font-sans">
          "{item.comment}"
        </p>
      </div>

      {/* Nombre y rol del cliente */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <img
          src={item.imageUrl}
          alt={item.author}
          referrerPolicy="no-referrer"
          className="w-11 h-11 rounded-full object-cover border border-gray-300 shrink-0"
        />
        <div>
          <h4 className="text-sm font-bold font-display text-gray-900 leading-tight">
            {item.author}
          </h4>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2">
          <p className="text-xs sm:text-sm font-bold tracking-wider text-gray-500 uppercase">
            EXPERIENCIAS DE
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            NUESTROS <span className="text-[#6c1323]">CLIENTES</span>
          </h2>
          <p className="text-gray-600 font-sans text-sm sm:text-base pt-1">
            La confianza también se refleja en quienes nos eligen.
          </p>
        </div>

        {/* VISTA ESCRITORIO (md en adelante): Las 3 opiniones en cuadrícula */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="h-full">
              {renderTestimonialCard(item)}
            </div>
          ))}
        </div>

        {/* VISTA MÓVIL (hasta md): Carrusel interactivo con swipe, flechas y puntos */}
        <div className="block md:hidden relative">
          <div
            className="overflow-hidden px-1"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {TESTIMONIALS.map((item) => (
                <div key={`mob-${item.id}`} className="w-full shrink-0 px-1">
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
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Flecha siguiente */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente comentario"
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicadores de puntos */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={`dot-testimonial-${item.id}`}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ver comentario ${index + 1}`}
                className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === index
                    ? "w-7 bg-[#6c1323]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
