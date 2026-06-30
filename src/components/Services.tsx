import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "transporte-empresas",
    title: "Transporte para Empresas",
    description: "Movilidad corporativa para ejecutivos y colaboradores.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s3-transporteparaempresas.webp",
    iconName: "Briefcase"
  },
  {
    id: "transporte-personal",
    title: "Transporte de Personal",
    description: "Servicio de traslado diario de trabajadores.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s4-transportedepersonal.webp",
    iconName: "Users"
  },
  {
    id: "traslados-aeropuerto",
    title: "Traslados al Aeropuerto",
    description: "Recojos y traslados puntuales 24/7.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s5-aeropuertos.webp",
    iconName: "Plane"
  },
  {
    id: "paseos-familiares",
    title: "Paseos Familiares",
    description: "Viajes cómodos para familias y grupos.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s6-paseofamiliar.webp",
    iconName: "Compass"
  },
  {
    id: "eventos-sociales",
    title: "Eventos Sociales",
    description: "Transporte para matrimonios, cumpleaños y más.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s01-eventossociales.webp",
    iconName: "Sparkles"
  },
  {
    id: "eventos-corporativos",
    title: "Eventos Corporativos",
    description: "Conferencias, activaciones y reuniones empresariales.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s2-eventoscorporativos.webp",
    iconName: "Award"
  }
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass: LucideIcons.Compass,
  Briefcase: LucideIcons.Briefcase,
  Users: LucideIcons.Users,
  Plane: LucideIcons.Plane,
  Sparkles: LucideIcons.Sparkles,
  Award: LucideIcons.Award
};

export default function Services() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPosRef = useRef<number>(0);
  const autoResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Custom Drag refs to support desktop mouse dragging & mobile swipe
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftStartRef = useRef<number>(0);
  const dragThresholdRef = useRef<boolean>(false); // prevents accidental clicks when dragging
  
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isPausedState, setIsPausedState] = useState<boolean>(false);

  // If a service card is selected or we're currently dragging, we pause the automatic scrolling
  const isPaused = selectedService !== null || isPausedState;

  // Triple the list to create a seamless infinite loop in both directions
  const tripledServices = [...servicesData, ...servicesData, ...servicesData];

  // Helper function to manage the 7-second auto-resume timer cleanly
  const resetAutoResumeTimer = (delayMs = 7000) => {
    if (autoResumeTimeoutRef.current) {
      clearTimeout(autoResumeTimeoutRef.current);
    }
    autoResumeTimeoutRef.current = setTimeout(() => {
      setSelectedService(null);
      setIsPausedState(false);
    }, delayMs);
  };

  const scrollToForm = (serviceTitle: string) => {
    const element = document.getElementById("contacto");
    if (element) {
      const selectElem = document.getElementById("tipo-servicio") as HTMLSelectElement | null;
      if (selectElem) {
        selectElem.value = serviceTitle;
        selectElem.dispatchEvent(new Event("change", { bubbles: true }));
      }
      
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // On mount, position scroll container in the middle set of items
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const initScroll = () => {
        if (container.scrollWidth > 0) {
          const startScroll = container.scrollWidth / 3;
          container.scrollLeft = startScroll;
          scrollPosRef.current = startScroll;
        } else {
          // Retry shortly if layout hasn't loaded yet
          setTimeout(initScroll, 50);
        }
      };
      initScroll();
    }

    return () => {
      if (autoResumeTimeoutRef.current) {
        clearTimeout(autoResumeTimeoutRef.current);
      }
    };
  }, []);

  // Continuous marquee animation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollSpeed = 0.55; // Slow constant speed (pixels per frame)

    const animateMarquee = () => {
      if (container) {
        // Only progress the scroll position if the pasarela is NOT paused by selection
        if (!isPaused) {
          scrollPosRef.current += scrollSpeed;
          container.scrollLeft = Math.floor(scrollPosRef.current);
        } else {
          // Keep floating-point position in sync if paused
          scrollPosRef.current = container.scrollLeft;
        }

        const singleSetWidth = container.scrollWidth / 3;

        // Wrap boundaries seamlessly
        if (scrollPosRef.current >= singleSetWidth * 2) {
          scrollPosRef.current -= singleSetWidth;
          container.scrollLeft = Math.floor(scrollPosRef.current);
        } else if (scrollPosRef.current <= singleSetWidth / 2) {
          scrollPosRef.current += singleSetWidth;
          container.scrollLeft = Math.floor(scrollPosRef.current);
        }
      }
      animationFrameRef.current = requestAnimationFrame(animateMarquee);
    };

    animationFrameRef.current = requestAnimationFrame(animateMarquee);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  // Keep ref position in sync with any manual user scrolls or swipes
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    
    // If user swiped or dragged manually, update the float ref if deviation is significant
    if (Math.abs(scrollPosRef.current - container.scrollLeft) > 1.5) {
      scrollPosRef.current = container.scrollLeft;
    }
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    
    isDraggingRef.current = true;
    dragThresholdRef.current = false;
    setIsPausedState(true);

    if (autoResumeTimeoutRef.current) {
      clearTimeout(autoResumeTimeoutRef.current);
    }
    
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    
    const container = containerRef.current;
    if (!container) return;
    
    const x = e.pageX - container.offsetLeft;
    const distanceDragged = x - startXRef.current;
    
    // If dragged more than a tiny threshold, mark as dragging (prevents click firing on release)
    if (Math.abs(distanceDragged) > 5) {
      dragThresholdRef.current = true;
    }
    
    const speedMultiplier = 1.35;
    const targetScroll = scrollLeftStartRef.current - (distanceDragged * speedMultiplier);
    
    container.scrollLeft = targetScroll;
    scrollPosRef.current = targetScroll;
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Start exactly 7 seconds countdown to auto-resume scrolling
      resetAutoResumeTimer(7000);
    }
  };

  // Touch Swipe Events (mobile touch screen drag support)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || e.touches.length === 0) return;
    
    isDraggingRef.current = true;
    dragThresholdRef.current = false;
    setIsPausedState(true);

    if (autoResumeTimeoutRef.current) {
      clearTimeout(autoResumeTimeoutRef.current);
    }
    
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const x = e.touches[0].pageX - container.offsetLeft;
    const distanceDragged = x - startXRef.current;
    
    if (Math.abs(distanceDragged) > 5) {
      dragThresholdRef.current = true;
    }
    
    const targetScroll = scrollLeftStartRef.current - (distanceDragged * 1.25);
    container.scrollLeft = targetScroll;
    scrollPosRef.current = targetScroll;
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Start exactly 7 seconds countdown to auto-resume scrolling
      resetAutoResumeTimer(7000);
    }
  };

  // Handle manual navigation buttons
  const handleManualScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = window.innerWidth < 640 ? 270 : 334; // width of card + gaps
    const targetScroll = container.scrollLeft + (direction === "right" ? cardWidth : -cardWidth);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });

    scrollPosRef.current = targetScroll;
    
    // Temporarily pause auto-scrolling and start exactly 7 seconds countdown
    setIsPausedState(true);
    resetAutoResumeTimer(7000);
  };

  return (
    <section id="servicios" className="py-12 sm:py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-3">
          <span className="text-brand-yellow font-sans text-xs font-black uppercase tracking-widest block">
            NUESTRAS COBERTURAS Y CATEGORÍAS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-red-dark tracking-tight">
            Nuestros Servicios
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto rounded-full"></div>
          
          <p className="text-gray-700 font-sans text-[11px] sm:text-sm">
            Arrastra de un lado a otro con tu dedo o mouse, o selecciona una tarjeta para detener el movimiento y ver detalles.
          </p>

          {/* Active status indicator ABOVE the carousel */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 bg-gray-50 border border-gray-200/60 rounded-full shadow-sm">
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isPaused ? "bg-amber-400 animate-pulse" : "bg-emerald-500 animate-pulse"}`}></span>
            <span className="text-[10px] sm:text-xs text-gray-600 font-bold font-sans">
              {isPaused ? "Pasarela pausada" : "Pasarela activa"}
            </span>
          </div>
        </div>

        {/* Continuous conveyor belt (Pasarela) container */}
        <div className="relative">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex flex-row gap-4 sm:gap-6 pb-2 sm:pb-4 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing touch-pan-y"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {tripledServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || LucideIcons.Info;
              const isSelected = selectedService === `${service.id}-${index}`;
              
              return (
                <div
                  key={`${service.id}-${index}`}
                  onClick={() => {
                    // If the user was just dragging, do not trigger a selection click
                    if (dragThresholdRef.current) return;
                    
                    if (isSelected) {
                      setSelectedService(null);
                      setIsPausedState(false);
                    } else {
                      setSelectedService(`${service.id}-${index}`);
                      setIsPausedState(true);
                      resetAutoResumeTimer(7000); // 7-second countdown starts immediately
                    }
                  }}
                  className={`group bg-white rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 p-4 sm:p-5 text-left shrink-0 cursor-pointer h-[270px] sm:h-[310px] w-[250px] sm:w-[310px] ${
                    isSelected 
                      ? "border-brand-yellow ring-4 ring-brand-yellow/15 shadow-lg scale-[0.98]" 
                      : "border-gray-150 shadow-sm hover:shadow-md hover:border-brand-yellow/25"
                  }`}
                >
                  {/* Header section: Title and description */}
                  <div className="space-y-1">
                    <h3 className="font-display text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-brand-red transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-sans line-clamp-2 h-8 sm:h-9">
                      {service.description}
                    </p>
                  </div>

                  {/* Media section: Image with absolute top-left icon badge, and booking button */}
                  <div className="mt-2 space-y-2">
                    <div className="h-24 sm:h-32 overflow-hidden rounded-xl bg-gray-100 relative">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Icon Badge at top-left of the image */}
                      <div className="absolute top-2 left-2 w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/95 backdrop-blur-sm text-brand-yellow flex items-center justify-center shadow-md border border-brand-yellow/20">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering card selection
                        scrollToForm(service.title);
                      }}
                      className="w-full py-1.5 sm:py-2 bg-brand-red-light text-brand-red group-hover:bg-brand-red group-hover:text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Cotizar Servicio
                      <LucideIcons.ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elegant Left/Right side gradient fade to imply continuity */}
          <div className="absolute top-0 bottom-2 sm:bottom-4 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 bottom-2 sm:bottom-4 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Carousel Control Bar at the bottom (tightened padding & margin for mobile) */}
        <div className="mt-2.5 sm:mt-5 border-t border-gray-100 pt-3.5 sm:pt-5 flex flex-col items-center gap-3">
          
          {/* Navigation Controls (Arrows) */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleManualScroll("left")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-red-dark shadow-sm hover:bg-gray-50 transition-all cursor-pointer active:scale-95 focus:outline-none"
              aria-label="Anterior"
            >
              <LucideIcons.ChevronLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => handleManualScroll("right")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-red-dark shadow-sm hover:bg-gray-50 transition-all cursor-pointer active:scale-95 focus:outline-none"
              aria-label="Siguiente"
            >
              <LucideIcons.ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Detailed instruction message BELOW the arrows */}
          <p className="text-[10px] sm:text-xs text-gray-400 font-sans italic text-center max-w-lg px-2 leading-snug">
            * Arrastra o toca una tarjeta para detenerla y ver detalles. Toca nuevamente para reanudar.
          </p>

        </div>

      </div>
    </section>
  );
}
