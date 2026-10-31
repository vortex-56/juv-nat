import { useState, useEffect, useRef, TouchEvent } from "react";
import { Wind, Armchair, Radio, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { FLEET, FleetItem } from "../types";

export default function Fleet() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FLEET.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FLEET.length) % FLEET.length);
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
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleReserve = (vehicle: FleetItem) => {
    const targetPhone = "51981370909";
    const text = `Hola Transporte JUVASA, deseo reservar la unidad: *${vehicle.name}* (Capacidad: ${vehicle.capacity}). ¿Podrían brindarme información y disponibilidad?`;
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    const link = document.createElement("a");
    link.href = waUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Íconos generales: Ícono azul oscuro a la izquierda (el doble de grande) y nombre a la derecha, sin caja negra
  const generalFeatures = [
    { icon: <Wind className="w-11 h-11 sm:w-12 sm:h-12 text-[#0f2e5a] shrink-0" />, label: "Aire acondicionado" },
    { icon: <Armchair className="w-11 h-11 sm:w-12 sm:h-12 text-[#0f2e5a] shrink-0" />, label: "Asientos confortables" },
    { icon: <Radio className="w-11 h-11 sm:w-12 sm:h-12 text-[#0f2e5a] shrink-0" />, label: "Monitoreo GPS" },
    { icon: <ShieldCheck className="w-11 h-11 sm:w-12 sm:h-12 text-[#0f2e5a] shrink-0" />, label: "Unidades autorizadas y aseguradas" },
  ];

  // Render individual de tarjeta de vehículo
  const renderVehicleCard = (vehicle: FleetItem) => {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left">
        {/* Fotografía de la unidad */}
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            {/* Título en letras bien gruesas de color rojo de la marca */}
            <h3 className="font-display text-lg sm:text-xl font-black text-[#6c1323] tracking-wide uppercase">
              {vehicle.name}
            </h3>
            {/* Capacidad: Más gruesa y transparente para diferenciarse de los textos de descripción */}
            <div className="text-xs sm:text-sm font-extrabold text-black/60 tracking-normal">
              Capacidad: {vehicle.capacity}
            </div>
            {/* Descripción en peso normal y color gris suave */}
            <p className="text-xs sm:text-sm text-gray-600 font-sans font-medium leading-relaxed pt-1">
              {vehicle.description}
            </p>
          </div>

          {/* Botón: RESERVA (Rojo con letras blancas) - genera mensaje a WhatsApp con vehículo seleccionado */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleReserve(vehicle)}
              className="w-full py-2.5 sm:py-3 bg-[#6c1323] hover:bg-[#520e1a] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer text-center"
            >
              RESERVA
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Duplicado para carrusel móvil
  const mobileDisplayList = [...FLEET, ...FLEET];

  return (
    <section id="flota" className="py-8 sm:py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado: NUESTRA en negro y FLOTA en rojo de la marca con letras gruesas */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight">
            <span className="text-gray-950 font-black">NUESTRA </span>
            <span className="text-[#6c1323] font-black">FLOTA</span>
          </h2>
          <p className="text-gray-600 font-sans text-sm sm:text-base mt-2">
            Movilidades modernas, con diferentes capacidades y el confort que cada traslado necesita.
          </p>
        </div>

        {/* 1. VISTA ESCRITORIO (lg: en adelante): Los 4 tipos de vehículos visibles en cuadrícula */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5 xl:gap-6 max-w-7xl mx-auto">
          {FLEET.map((vehicle) => (
            <div key={`desktop-${vehicle.id}`} className="h-full">
              {renderVehicleCard(vehicle)}
            </div>
          ))}
        </div>

        {/* 2. VISTA MÓVIL Y TABLETA (< lg): Carrusel interactivo */}
        <div className="block lg:hidden relative max-w-2xl mx-auto px-4 sm:px-8">
          <div
            className="overflow-hidden py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)`,
              }}
            >
              {mobileDisplayList.map((vehicle, idx) => (
                <div
                  key={`${vehicle.id}-${idx}`}
                  className="w-full sm:w-1/2 shrink-0 px-2.5 sm:px-3"
                >
                  {renderVehicleCard(vehicle)}
                </div>
              ))}
            </div>
          </div>

          {/* Flecha anterior */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Vehículo anterior"
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Flecha siguiente */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente vehículo"
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-900 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#6c1323] hover:text-white transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Indicadores de posición (puntos) */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {FLEET.map((vehicle, index) => (
              <button
                key={`dot-${vehicle.id}`}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ver ${vehicle.name}`}
                className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === index
                    ? "w-8 bg-[#6c1323]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Franja de características generales: Ícono azul oscuro a la izquierda y a la derecha el nombre, sin caja negra */}
        <div className="mt-6 sm:mt-8 max-w-5xl mx-auto bg-gray-50/90 border border-gray-200/90 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
            {generalFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-left">
                <div className="shrink-0">{feat.icon}</div>
                <span className="text-xs sm:text-sm font-extrabold text-[#0f2e5a] font-sans leading-snug">
                  {feat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
