import { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Sparkles, Navigation, Shield, UserCheck } from "lucide-react";

interface FleetVehicle {
  id: string;
  name: string;
  features: string[];
  imageUrl: string;
}

const vehiclesData: FleetVehicle[] = [
  {
    id: "camioneta",
    name: "CAMIONETA",
    features: [
      "Viaja con estilo y comodidad",
      "Capacidades de 4 y 6 pasajeros",
      "Aire acondicionado refrescante",
      "Modernidad y seguridad",
      "Conductores calificados"
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m01auto.webp"
  },
  {
    id: "van",
    name: "VAN",
    features: [
      "Experiencia confiable y relajante",
      "Capacidad de 10 pasajeros",
      "Ventana panorámica y ambiente climatizado",
      "Puntualidad y seguridad para todo destino",
      "Conductores profesionales"
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m02van-2.webp"
  },
  {
    id: "minibus",
    name: "MINIBÚS",
    features: [
      "Aire acondicionado",
      "Capacidades de 15 y 20 pasajeros",
      "Ventana panorámica y espacios para equipajes",
      "Asientos reclinables y música al gusto",
      "Conductores profesionales"
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m03minibus.webp"
  },
  {
    id: "bus",
    name: "BUS",
    features: [
      "Ambiente climatizado",
      "Capacidades de 30 y 50 pasajeros",
      "Bodega para equipajes",
      "Experiencia de viaje placentero",
      "Conductores profesionales"
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m04bus.webp"
  }
];

export default function Fleet() {
  const scrollToForm = (vehicleName: string) => {
    const element = document.getElementById("contacto");
    if (!element) return;
    
    const passengerInput = document.getElementById("num-pasajeros") as HTMLInputElement | null;
    if (passengerInput) {
      let value = "4";
      if (vehicleName.toLowerCase().includes("van")) {
        value = "10";
      } else if (vehicleName.toLowerCase().includes("minibús") || vehicleName.toLowerCase().includes("minibus")) {
        value = "15";
      } else if (vehicleName.toLowerCase().includes("bus")) {
        value = "30";
      }
      passengerInput.value = value;
      passengerInput.dispatchEvent(new Event("input", { bubbles: true }));
      passengerInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const headerOffset = 70;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5 text-brand-yellow shrink-0" />,
      title: "Unidades modernas y mantenidas"
    },
    {
      icon: <Navigation className="w-5 h-5 text-brand-yellow shrink-0" />,
      title: "GPS en todas nuestras unidades"
    },
    {
      icon: <Shield className="w-5 h-5 text-brand-yellow shrink-0" />,
      title: "Seguros y permisos al día"
    },
    {
      icon: <UserCheck className="w-5 h-5 text-brand-yellow shrink-0" />,
      title: "Conductores capacitados"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-brand-yellow shrink-0" />,
      title: "Limpieza y desinfección constante"
    }
  ];

  // Mobile Carousel repeated items: [last item, all items, first item]
  const carouselItems = [
    vehiclesData[3],
    ...vehiclesData,
    vehiclesData[0]
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
    if (mobileIndex >= 5) {
      setIsTransitioning(false);
      setMobileIndex(1);
    } else if (mobileIndex <= 0) {
      setIsTransitioning(false);
      setMobileIndex(4);
    }
  };

  // Autoplay loop for mobile carousel every 5 seconds
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
    <section id="flota" className="py-16 bg-brand-red-dark text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-yellow/5 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-red/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Nuestra Flota
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto rounded-full"></div>
          <p className="text-white font-sans text-sm md:text-base opacity-90">
            Unidades modernas, cómodas y seguras para cada tipo de viaje
          </p>
        </div>

        {/* Desktop View: Row of 4 cards side-by-side */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {vehiclesData.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 h-full"
            >
              {/* Image */}
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-3">
                  {/* Title in red */}
                  <h3 className="font-display text-sm font-black text-brand-red tracking-wide uppercase">
                    {vehicle.name}
                  </h3>

                  {/* Features checklist with red/yellow checks */}
                  <ul className="space-y-2 pt-1.5 border-t border-gray-100">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-700 font-sans leading-tight font-medium">
                        <Check className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5 stroke-[3]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => scrollToForm(vehicle.name)}
                  className="w-full py-2 bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Cotizar {vehicle.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Infinite Carousel showing 1 card at a time */}
        <div className="md:hidden relative px-8">
          <div className="overflow-hidden rounded-2xl">
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {carouselItems.map((vehicle, idx) => (
                <div key={idx} className="w-full shrink-0 px-1">
                  <div className="bg-white rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col justify-between h-full">
                    {/* Image */}
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-display text-base font-black text-brand-red tracking-wide uppercase">
                          {vehicle.name}
                        </h3>

                        <ul className="space-y-2 pt-2 border-t border-gray-100">
                          {vehicle.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-700 font-sans leading-tight font-medium">
                              <Check className="w-4 h-4 text-brand-red shrink-0 mt-0.5 stroke-[3]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => scrollToForm(vehicle.name)}
                        className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Cotizar {vehicle.name}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Left Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md hover:bg-white/25 active:scale-95 transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Carousel Right Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md hover:bg-white/25 active:scale-95 transition-all z-20 cursor-pointer focus:outline-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Indicators Dots */}
          <div className="flex justify-center gap-1.5 mt-5">
            {vehiclesData.map((_, idx) => {
              const isActive = (mobileIndex - 1 + 4) % 4 === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isTransitioning) return;
                    setMobileIndex(idx + 1);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "bg-brand-yellow w-4" : "bg-white/20 hover:bg-white/40 w-1.5"
                  }`}
                  aria-label={`Ir al elemento ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Fleet Benefits (Below the cards, vertical format) */}
        <div className="max-w-2xl mx-auto mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-left">
          <div className="text-center md:text-left">
            <h3 className="font-display text-base font-black text-brand-yellow tracking-wider uppercase">
              Beneficios de Flota
            </h3>
            <p className="text-[11px] sm:text-xs text-red-100 mt-1 font-sans">
              Garantizamos los mejores estándares para tu tranquilidad y confort en carretera.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                  {benefit.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-bold leading-tight font-sans tracking-wide text-white">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="p-3 bg-brand-red/35 border border-brand-yellow/20 rounded-xl text-center space-y-1">
              <span className="text-[9px] font-black text-brand-yellow uppercase tracking-widest block">PERMISOS MTC AL DÍA</span>
              <p className="text-[10px] text-red-100">Contamos con SOAT Turístico y revisiones periódicas completas.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
