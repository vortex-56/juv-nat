import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { TRUST_COMPANIES } from "../types";

export default function TrustLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Lista multiplicada para ciclo continuo perpetuo sin saltos
  const displayLogos = [
    ...TRUST_COMPANIES,
    ...TRUST_COMPANIES,
    ...TRUST_COMPANIES,
    ...TRUST_COMPANIES,
    ...TRUST_COMPANIES,
    ...TRUST_COMPANIES,
  ];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let lastTime = performance.now();
    const speed = 1.8; // Movimiento perpetuo ágil y fluido de derecha a izquierda

    const step = (time: number) => {
      const delta = (time - lastTime) / 16.66;
      lastTime = time;

      if (!isDragging && el) {
        el.scrollLeft += speed * (delta || 1);

        // Reinicio transparente a mitad de scrollWidth
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-8 sm:py-10 bg-gray-50 border-b border-gray-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-1.5">
          <p className="text-xs sm:text-sm font-extrabold tracking-wider text-gray-500 uppercase">
            EMPRESAS QUE
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-[900] text-gray-900 tracking-tight leading-tight">
            CONFÍAN EN <span className="text-[#6c1323]">NOSOTROS</span>
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm">
            Empresas e instituciones que confían en nuestros traslados y servicios.
          </p>
        </div>

        {/* Vitrina interactiva de movimiento perpetuo lento de derecha a izquierda con soporte táctil y cursor drag */}
        <div className="relative group">
          {/* Sombras degradadas laterales para efecto elegante de vitrina */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10" />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              isHoveredRef.current = false;
            }}
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex items-center gap-4 sm:gap-6 overflow-x-hidden py-2 px-1 scrollbar-hide ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {displayLogos.map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                className="shrink-0 w-44 sm:w-52 h-24 sm:h-28 bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-6 flex items-center justify-center shadow-xs hover:shadow-md transition-all duration-300 hover:border-[#6c1323]/30 pointer-events-none"
              >
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  loading="lazy"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="max-h-12 sm:max-h-14 max-w-[85%] object-contain select-none"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
