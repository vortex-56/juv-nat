import React, { useState, useEffect, useRef } from "react";
import { TOUR_DESTINATIONS } from "../types";
import { Compass, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPosRef = useRef<number>(0);
  const autoResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom Drag refs to support desktop mouse dragging & mobile swipe
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftStartRef = useRef<number>(0);
  const dragThresholdRef = useRef<boolean>(false); // prevents accidental clicks when dragging

  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isPausedState, setIsPausedState] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // If a destination card is selected or we're currently dragging, we pause the automatic scrolling
  const isPaused = selectedDestination !== null || isPausedState;

  // Triple the list to create a seamless infinite loop in both directions
  const tripledDestinations = [...TOUR_DESTINATIONS, ...TOUR_DESTINATIONS, ...TOUR_DESTINATIONS];

  // Detect screen size to switch views gracefully
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper function to manage the 7-second auto-resume timer cleanly
  const resetAutoResumeTimer = (delayMs = 7000) => {
    if (autoResumeTimeoutRef.current) {
      clearTimeout(autoResumeTimeoutRef.current);
    }
    autoResumeTimeoutRef.current = setTimeout(() => {
      setSelectedDestination(null);
      setIsPausedState(false);
    }, delayMs);
  };

  const scrollToForm = (destinationName: string) => {
    const element = document.getElementById("contacto");
    if (element) {
      const queryField = document.getElementById("consulta") as HTMLTextAreaElement | null;
      if (queryField) {
        queryField.value = `Hola, deseo cotizar un servicio de transporte turístico privado con destino a: ${destinationName}. `;
      }

      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Position scroll container in the middle set of items for seamless loop
  useEffect(() => {
    if (!isMobile) return;

    const container = containerRef.current;
    if (container) {
      const initScroll = () => {
        if (container.scrollWidth > 0) {
          const startScroll = container.scrollWidth / 3;
          container.scrollLeft = startScroll;
          scrollPosRef.current = startScroll;
        } else {
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
  }, [isMobile]);

  // Continuous marquee animation loop for mobile carousel
  useEffect(() => {
    if (!isMobile) return;

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
  }, [isPaused, isMobile]);

  // Keep ref position in sync with manual scrolls
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    
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

  // Touch Swipe Events
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

    const cardWidth = 270; // width of card + gaps
    const targetScroll = container.scrollLeft + (direction === "right" ? cardWidth : -cardWidth);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });

    scrollPosRef.current = targetScroll;
    
    setIsPausedState(true);
    resetAutoResumeTimer(7000);
  };

  return (
    <section id="cobertura" className="py-8 md:py-16 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2">
          <h2 className="font-display text-xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            Destinos Turísticos Recurrentes
          </h2>
          <div className="w-12 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
          <p className="text-gray-600 font-sans text-[11px] sm:text-sm pt-0.5">
            {isMobile 
              ? "Arrastra de un lado a otro con tu dedo o mouse, o selecciona una tarjeta para detener el movimiento y ver detalles."
              : "Viaja a los mejores atractivos locales de Lima y provincias. Unidades exclusivas a tu disposición con ida y retorno garantizado."
            }
          </p>

          {/* Active status indicator ABOVE the carousel */}
          {isMobile && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-gray-50 border border-gray-200/60 rounded-full shadow-sm mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-400 animate-pulse" : "bg-emerald-500 animate-pulse"}`}></span>
              <span className="text-[10px] text-gray-600 font-bold font-sans">
                {isPaused ? "Pasarela pausada" : "Pasarela activa"}
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Display: Carousel on Mobile, Grid on Desktop */}
        {isMobile ? (
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
              className="flex flex-row gap-4 pb-2 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing touch-pan-y"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {tripledDestinations.map((dest, index) => {
                const isSelected = selectedDestination === `${dest.id}-${index}`;
                
                return (
                  <div
                    key={`${dest.id}-${index}`}
                    onClick={() => {
                      if (dragThresholdRef.current) return;
                      
                      if (isSelected) {
                        setSelectedDestination(null);
                        setIsPausedState(false);
                      } else {
                        setSelectedDestination(`${dest.id}-${index}`);
                        setIsPausedState(true);
                        resetAutoResumeTimer(7000); // 7-second countdown starts immediately
                      }
                    }}
                    className={`group bg-white rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 p-4 text-left shrink-0 cursor-pointer h-[340px] w-[250px] ${
                      isSelected 
                        ? "border-brand-yellow ring-4 ring-brand-yellow/15 shadow-lg scale-[0.98]" 
                        : "border-gray-150 shadow-sm hover:shadow-md hover:border-brand-yellow/25"
                    }`}
                  >
                    {/* Image Area with Pin overlay & tag */}
                    <div className="relative h-36 bg-gray-100 overflow-hidden rounded-xl">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                      
                      {/* Visual category tag */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-0.5 bg-brand-yellow/95 backdrop-blur-sm text-brand-dark font-display text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                          {dest.tag}
                        </span>
                      </div>

                      {/* Pin label */}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white">
                        <MapPin className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                        <span className="font-display font-black text-sm text-shadow-md">{dest.name}</span>
                      </div>
                    </div>

                    {/* Description & Distance */}
                    <div className="flex-1 flex flex-col justify-between py-2.5">
                      <p className="text-[11px] text-gray-500 leading-relaxed font-sans line-clamp-3">
                        {dest.description}
                      </p>
                      
                      {/* Distance info indicator */}
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 font-sans w-full">
                        <Clock className="w-3 h-3 text-brand-red shrink-0" />
                        <span className="truncate">{dest.distance}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToForm(dest.name);
                      }}
                      className="w-full py-1.5 bg-brand-red-light text-brand-red group-hover:bg-brand-red group-hover:text-white font-black text-[9px] uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Cotizar Viaje
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Elegant Left/Right side gradient fade to imply continuity */}
            <div className="absolute top-0 bottom-2 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 bottom-2 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>
        ) : (
          /* Desktop Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOUR_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-red/10 transition-all duration-300"
              >
                {/* Photo Area with Tag Overlay */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>
                  
                  {/* Visual category tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 bg-brand-yellow/95 backdrop-blur-sm text-brand-dark font-display text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      {dest.tag}
                    </span>
                  </div>

                  {/* Pin label */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                    <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span className="font-display font-extrabold text-lg text-shadow-md">{dest.name}</span>
                  </div>
                </div>

                {/* Description Body */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <p className="text-sm text-gray-600 font-sans leading-relaxed">
                      {dest.description}
                    </p>
                    
                    {/* Distance info indicator */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-semibold text-gray-500 font-sans w-full">
                      <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>{dest.distance}</span>
                    </div>
                  </div>

                  {/* Click action to scroll down to bottom Form */}
                  <button
                    onClick={() => scrollToForm(dest.name)}
                    className="w-full py-2.5 bg-brand-red-light hover:bg-brand-red text-brand-red hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Cotizar viaje a {dest.name.split(" ")[0]}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Carousel Control Bar at the bottom for Mobile */}
        {isMobile && (
          <div className="mt-2.5 border-t border-gray-100 pt-3.5 flex flex-col items-center gap-3">
            {/* Navigation Controls (Arrows) */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleManualScroll("left")}
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-red-dark shadow-sm hover:bg-gray-50 transition-all cursor-pointer active:scale-95 focus:outline-none"
                aria-label="Anterior"
              >
                <ChevronRight className="w-4.5 h-4.5 rotate-180" />
              </button>

              <button
                onClick={() => handleManualScroll("right")}
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-red-dark shadow-sm hover:bg-gray-50 transition-all cursor-pointer active:scale-95 focus:outline-none"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Detailed instruction message BELOW the arrows */}
            <p className="text-[10px] text-gray-400 font-sans italic text-center max-w-lg px-2 leading-snug">
              * Arrastra o toca una tarjeta para detenerla y ver detalles. Toca nuevamente para reanudar.
            </p>
          </div>
        )}

        {/* Notice of custom nationwide services */}
        <div className="mt-12 bg-brand-red-light/50 border border-brand-red/10 rounded-2xl p-6 text-center max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-brand-red text-brand-yellow flex items-center justify-center shrink-0 shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="text-sm font-bold text-brand-red font-display">¿Quieres ir a otro lugar en el Perú?</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Realizamos servicios de transporte turístico privado a <b>cualquier ciudad de la costa, sierra o selva del Perú</b>. Diseñamos el itinerario junto a ti.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
