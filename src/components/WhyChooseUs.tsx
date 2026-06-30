import { useState, useEffect } from "react";
import { 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  FileCheck, 
  HeartHandshake,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: <Clock className="w-6 h-6 text-brand-red-dark" />,
      title: "Puntualidad Real",
      desc: "Cumplimos los horarios acordados. Tu tiempo es importante."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-red-dark" />,
      title: "Seguridad Garantizada",
      desc: "Conductores profesionales, unidades autorizadas y seguros vigentes."
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-red-dark" />,
      title: "Cobertura Amplia",
      desc: "Lima Metropolitana y provincias. Viajes cortos y largos."
    },
    {
      icon: <Phone className="w-6 h-6 text-brand-red-dark" />,
      title: "Atención Personalizada",
      desc: "Asesoría rápida y directa por WhatsApp las 24 horas."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-brand-red-dark" />,
      title: "Empresa Formal",
      desc: "Facturación electrónica, RUC, SOAT y permisos en regla."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-brand-red-dark" />,
      title: "Experiencia y Confianza",
      desc: "Años de experiencia brindando el mejor servicio de transporte."
    }
  ];

  // We repeat items on both sides to support infinite smooth loop transitions:
  // [last 3 points, all points, first 3 points]
  const carouselItems = [...points.slice(-3), ...points, ...points.slice(0, 3)];

  const [currentIndex, setCurrentIndex] = useState(3); // Start at index 3 (item 0)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleItems = isMobile ? 1 : 3;

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= 9) {
      setIsTransitioning(false);
      setCurrentIndex(3);
    } else if (currentIndex <= 2) {
      setIsTransitioning(false);
      setCurrentIndex(8);
    }
  };

  // Autoplay loop every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <section id="nosotros" className="py-8 md:py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <h2 className="font-display text-xl sm:text-3xl font-extrabold text-brand-red-dark tracking-tight">
            ¿Por qué elegir Juvasa?
          </h2>
          <div className="w-12 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
          <p className="text-gray-600 font-sans text-[11px] sm:text-sm pt-0.5">
            Comprometidos con tu seguridad y satisfacción
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-10">
          
          {/* Track Frame */}
          <div className="overflow-hidden">
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {carouselItems.map((point, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 shrink-0 flex-none px-2 sm:px-3"
                >
                  <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-3 flex flex-col justify-between hover:border-brand-red-dark/10 group h-full">
                    <div className="space-y-3">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-brand-red-light flex items-center justify-center border border-brand-red/10 group-hover:scale-105 transition-transform duration-300">
                        {point.icon}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 group-hover:text-brand-red transition-colors">
                        {point.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-150 flex items-center justify-center text-brand-red-dark shadow-md hover:bg-gray-50 transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-150 flex items-center justify-center text-brand-red-dark shadow-md hover:bg-gray-50 transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {points.map((_, idx) => {
            const isActive = (currentIndex - 3 + 6) % 6 === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (!isTransitioning) return;
                  setCurrentIndex(idx + 3);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? "bg-brand-red-dark w-5" : "bg-gray-200 hover:bg-gray-300 w-2"
                }`}
                aria-label={`Ir al elemento ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
