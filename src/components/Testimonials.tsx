import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  comment: string;
  author: string;
  role: string;
  imageUrl: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    comment: "Excelente servicio para el traslado de nuestro personal. Siempre puntuales y responsables. Totalmente recomendados.",
    author: "Jefe de Logística",
    role: "Empresa Constructora",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "2",
    comment: "Nos recogieron en el aeropuerto a la hora indicada y el viaje fue súper cómodo. 100% recomendados.",
    author: "Carlos M.",
    role: "Cliente Particular",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "3",
    comment: "Contratamos el servicio para nuestro evento corporativo y todo salió perfecto. Muy profesionales.",
    author: "Claudia P.",
    role: "Organizadora de Eventos",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function Testimonials() {
  // Mobile Carousel repeated items: [last item, all items, first item]
  const carouselItems = [
    testimonialsData[2],
    ...testimonialsData,
    testimonialsData[0]
  ];

  const [mobileIndex, setMobileIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    if (!isTransitioning) return;
    setMobileIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setMobileIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (mobileIndex >= 4) {
      setIsTransitioning(false);
      setMobileIndex(1);
    } else if (mobileIndex <= 0) {
      setIsTransitioning(false);
      setMobileIndex(3);
    }
  };

  // Autoplay loop every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [mobileIndex, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <section className="py-8 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2">
          <h2 className="font-display text-xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <div className="w-12 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all relative text-left flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* 5 estrellas amarillas */}
                  <div className="flex gap-1 text-brand-yellow">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-brand-yellow text-brand-yellow shrink-0" />
                    ))}
                  </div>
                  {/* Icono de comillas */}
                  <Quote className="w-7 h-7 text-brand-red/10 shrink-0" />
                </div>

                {/* Texto del review */}
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed font-sans">
                  "{item.comment}"
                </p>
              </div>

              {/* Perfil del cliente (foto y cargo) */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold font-display text-gray-900 leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Infinite Carousel */}
        <div className="md:hidden relative px-8">
          <div className="overflow-hidden rounded-2xl">
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {carouselItems.map((item, idx) => (
                <div key={idx} className="w-full shrink-0 px-1">
                  <div className="p-6 bg-white border border-gray-150 rounded-2xl shadow-md text-left flex flex-col justify-between space-y-5 h-full min-h-[220px]">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        {/* Stars */}
                        <div className="flex gap-1 text-brand-yellow">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow shrink-0" />
                          ))}
                        </div>
                        {/* Quote icon */}
                        <Quote className="w-6 h-6 text-brand-red/10 shrink-0" />
                      </div>

                      {/* Comment text */}
                      <p className="text-xs text-gray-700 italic leading-relaxed font-sans">
                        "{item.comment}"
                      </p>
                    </div>

                    {/* Client Profile */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <img
                        src={item.imageUrl}
                        alt={item.author}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-bold font-display text-gray-900 leading-tight">
                          {item.author}
                        </h4>
                        <p className="text-[9px] text-gray-500 font-sans mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Left Control */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-md active:scale-95 transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Carousel Right Control */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-md active:scale-95 transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonialsData.map((_, idx) => {
              const isActive = (mobileIndex - 1 + 3) % 3 === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isTransitioning) return;
                    setMobileIndex(idx + 1);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "bg-brand-red w-4" : "bg-gray-200 hover:bg-gray-300 w-1.5"
                  }`}
                  aria-label={`Ir al comentario ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
