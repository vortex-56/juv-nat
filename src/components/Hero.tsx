import React, { useState, useEffect, useRef } from "react";
import { Clock, ShieldCheck, UserCheck, Headphones, Play, PhoneCall, User, Phone, Users, Calendar, ChevronDown, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    serviceType: "",
    serviceDate: "",
    passengers: ""
  });
  const [countryCode, setCountryCode] = useState("+51");
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScrollToVideo = () => {
    const videoSection = document.getElementById("video");
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Carrusel de imágenes de la portada
  const heroSlides = [
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p1.1.webp",
      alt: "Transporte JUVASA - Portada 1",
      label: "Unidad 1",
    },
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p2.webp",
      alt: "Transporte JUVASA - Portada 2",
      label: "Unidad 2",
    },
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p3.webp",
      alt: "Transporte JUVASA - Portada 3",
      label: "Unidad 3",
    },
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p4.webp",
      alt: "Transporte JUVASA - Portada 4",
      label: "Unidad 4",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const countries = [
    { code: "+51", emoji: "🇵🇪", name: "Perú" },
    { code: "+56", emoji: "🇨🇱", name: "Chile" },
    { code: "+57", emoji: "🇨🇴", name: "Colombia" },
    { code: "+52", emoji: "🇲🇽", name: "México" },
    { code: "+593", emoji: "🇪🇨", name: "Ecuador" },
    { code: "+591", emoji: "🇧🇴", name: "Bolivia" },
    { code: "+54", emoji: "🇦🇷", name: "Argentina" },
    { code: "+1", emoji: "🇺🇸", name: "Estados Unidos" },
    { code: "+34", emoji: "🇪🇸", name: "España" },
    { code: "+58", emoji: "🇻🇪", name: "Venezuela" },
    { code: "+55", emoji: "🇧🇷", name: "Brasil" },
    { code: "+507", emoji: "🇵🇦", name: "Panamá" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCodeDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ajuste en mobile para que el carrusel se extienda solo hasta donde comienza el formulario
  useEffect(() => {
    const updateCarouselHeight = () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        if (formCardRef.current && heroSectionRef.current) {
          const formRect = formCardRef.current.getBoundingClientRect();
          const heroRect = heroSectionRef.current.getBoundingClientRect();
          const height = formRect.top - heroRect.top;
          if (height > 50) {
            setCarouselHeight(Math.round(height));
          }
        }
      } else {
        setCarouselHeight(null);
      }
    };

    updateCarouselHeight();

    const timer = setTimeout(updateCarouselHeight, 150);
    window.addEventListener("resize", updateCarouselHeight);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && heroSectionRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateCarouselHeight();
      });
      resizeObserver.observe(heroSectionRef.current);
      if (formCardRef.current) {
        resizeObserver.observe(formCardRef.current);
      }
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCarouselHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  const getCountryEmoji = (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return "🌐";
    const normalized = trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
    const found = countries.find(c => c.code === normalized);
    return found ? found.emoji : "🌐";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppDirect = () => {
    const targetPhone = "51981370909";
    const rawText = "Hola, deseo cotizar un servicio de transporte privado con Transporte JUVASA.";
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(rawText)}`;
    const link = document.createElement("a");
    link.href = waUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetPhone = "51981370909";
    const fullContact = `${countryCode} ${formData.contact}`;
    
    let message = `Hola Transporte JUVASA, deseo realizar una consulta de servicio:%0A%0A`;
    message += `👤 *Nombre:* ${formData.fullName}%0A`;
    message += `📱 *Teléfono/WhatsApp:* ${fullContact}%0A`;
    if (formData.serviceType) message += `🚐 *Tipo de servicio:* ${formData.serviceType}%0A`;
    if (formData.serviceDate) message += `📅 *Fecha del servicio:* ${formData.serviceDate}%0A`;
    if (formData.passengers) message += `👥 *Número de pasajeros:* ${formData.passengers}%0A`;

    const waUrl = `https://wa.me/${targetPhone}?text=${message}`;

    setIsSuccess(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = waUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsSuccess(false);
    }, 1200);
  };

  const benefits = [
    { icon: <Clock className="w-4 h-4 text-[#fab511]" />, label: "Puntualidad" },
    { icon: <ShieldCheck className="w-4 h-4 text-[#fab511]" />, label: "Seguridad" },
    { icon: <UserCheck className="w-4 h-4 text-[#fab511]" />, label: "Conductores profesionales" },
    { icon: <Headphones className="w-4 h-4 text-[#fab511]" />, label: "Operaciones 24/7" },
  ];

  return (
    <section
      id="inicio"
      ref={heroSectionRef}
      className="relative pt-[70px] pb-6 lg:pt-[82px] lg:pb-8 flex items-center bg-black text-white overflow-hidden"
    >
      {/* Carrusel de imágenes de la portada */}
      <div
        style={{
          height: carouselHeight ? `${carouselHeight}px` : undefined,
        }}
        className="absolute top-0 left-0 right-0 z-0 overflow-hidden lg:inset-0 lg:!h-full"
      >
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-[1]" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-[center_30%]"
            />
          </div>
        ))}
        {/* Capa de degradado: en mobile tiene un degradado a negro puro (#000000) antes del formulario para fundirse de forma perfecta con el fondo negro del formulario, y en desktop degradado lateral */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 via-50% to-[#000000] lg:bg-gradient-to-r lg:from-black/75 lg:via-black/45 lg:to-black/25 z-[2]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Lado Izquierdo: Información del Hero */}
          <div className="lg:col-span-7 text-left space-y-3.5 md:space-y-4">
            
            {/* H1 Principal Único con letras extra gruesas y sólidas */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-[900] text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              Transporte privado y turístico para{" "}
              <span className="text-[#fab511] font-[900]">empresas, familias y grupos</span>
            </h1>

            {/* Subtítulo delgado */}
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-sans drop-shadow-sm font-light">
              Servicio de transporte privado con movilidades modernas, conductores profesionales y atención personalizada en cada traslado.
            </p>

            {/* Beneficios con íconos - sin cajas negras, solo íconos con sus nombres en negrita */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 max-w-2xl">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-white"
                >
                  <div className="shrink-0 drop-shadow-md">{b.icon}</div>
                  <span className="text-xs sm:text-sm font-[800] text-white drop-shadow-md leading-tight">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Botón Ver video con scroll suave al centro de la sección de video */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToVideo}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#fab511] hover:bg-[#e2a20b] text-[#6c1323] font-[900] text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_6px_20px_rgba(250,181,17,0.4)] hover:shadow-[0_8px_25px_rgba(250,181,17,0.6)] active:scale-95 transition-all cursor-pointer w-full sm:w-auto group"
              >
                <Play className="w-4 h-4 fill-[#6c1323] text-[#6c1323] transition-transform group-hover:scale-110" />
                Ver video
              </button>
            </div>
          </div>

          {/* Lado Derecho: Formulario Hero "CONSULTA TU SERVICIO" - bajado para separarse del menú y con altura más compacta */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto pt-3 sm:pt-4 lg:pt-6">
            <div ref={formCardRef} className="bg-white text-gray-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-gray-150 relative overflow-hidden">
              
              {isSuccess && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-5 text-center">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-500 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-900">¡Consulta Generada!</h3>
                  <p className="text-xs text-gray-600 mt-1 max-w-xs leading-relaxed">
                    Conectando con WhatsApp para enviarle la información directa a nuestro equipo.
                  </p>
                </div>
              )}

              <div className="text-left mb-2.5">
                <h3 className="font-display text-base font-black text-[#6c1323] tracking-wide uppercase">
                  CONSULTA TU SERVICIO
                </h3>
                <p className="text-[11px] font-sans text-gray-500 mt-0.5">
                  Completa tus datos y cuéntanos qué servicio necesitas
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-2.5 text-left">
                {/* Nombre completo */}
                <div>
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider block mb-0.5">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#6c1323] bg-gray-50 focus:bg-white transition-all font-sans font-medium"
                    />
                    <User className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Teléfono o WhatsApp con selector de prefijo internacional */}
                <div>
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider block mb-0.5">
                    Teléfono o WhatsApp *
                  </label>
                  <div className="flex gap-1.5 font-sans">
                    <div className="relative w-[36%] shrink-0" ref={dropdownRef}>
                      <div className="flex items-center gap-1 w-full px-2 py-1.5 text-xs text-gray-950 border border-gray-200 rounded-lg bg-gray-50 focus-within:bg-white focus-within:border-[#6c1323] transition-all">
                        <span className="text-sm">{getCountryEmoji(countryCode)}</span>
                        <input
                          type="text"
                          value={countryCode}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || val === "+" || /^\+?[0-9]*$/.test(val)) {
                              setCountryCode(val);
                            }
                          }}
                          placeholder="+51"
                          className="w-full bg-transparent border-none outline-none p-0 text-xs font-bold text-gray-900"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCodeDropdown(!showCodeDropdown)}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          aria-label="Prefijo país"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>

                      {showCodeDropdown && (
                        <div className="absolute left-0 mt-1 max-h-48 w-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 text-xs">
                          {countries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(c.code);
                                setShowCodeDropdown(false);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-left hover:bg-gray-100 text-gray-800"
                            >
                              <span>{c.emoji}</span>
                              <span className="font-bold">{c.code}</span>
                              <span className="text-gray-500 text-[10px] truncate">({c.name})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative flex-1">
                      <input
                        type="tel"
                        name="contact"
                        required
                        placeholder="Ej. 981 370 909"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#6c1323] bg-gray-50 focus:bg-white transition-all font-sans font-medium"
                      />
                      <Phone className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Tipo de servicio (opcional) */}
                <div>
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider block mb-0.5">
                    Tipo de servicio (Opcional)
                  </label>
                  <div className="relative">
                    <select
                      id="tipo-servicio"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#6c1323] bg-gray-50 focus:bg-white transition-all font-sans cursor-pointer appearance-none font-medium"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Transporte corporativo y ejecutivo">Transporte corporativo y ejecutivo</option>
                      <option value="Traslados desde y hacia el aeropuerto">Traslados desde y hacia el aeropuerto</option>
                      <option value="Paseos familiares">Paseos familiares</option>
                      <option value="Eventos sociales">Eventos sociales</option>
                      <option value="Viajes privados a destinos seleccionados">Viajes privados a destinos seleccionados</option>
                      <option value="Transporte para grupos y delegaciones">Transporte para grupos y delegaciones</option>
                      <option value="Otros servicios">Otros servicios</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Fecha del servicio (opcional) */}
                <div>
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider block mb-0.5">
                    Fecha del servicio (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#6c1323] bg-gray-50 focus:bg-white transition-all font-sans font-medium"
                    />
                    <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Número de pasajeros */}
                <div>
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-wider block mb-0.5">
                    Número de pasajeros *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="num-pasajeros"
                      name="passengers"
                      min="1"
                      required
                      placeholder="Ej. 8"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#6c1323] bg-gray-50 focus:bg-white transition-all font-sans font-medium"
                    />
                    <Users className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Botón ENVIAR CONSULTA */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#6c1323] hover:bg-[#85182c] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    ENVIAR CONSULTA
                  </button>
                  <p className="text-[10px] text-gray-500 font-sans text-center mt-1.5">
                    Te contactaremos directamente por WhatsApp · Reservas Lun–Sáb 8:00–18:00
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Controles e indicadores del carrusel de la portada */}
        <div className="mt-4 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Botones flechas previo y siguiente */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Movilidad anterior"
                className="w-7 h-7 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Siguiente movilidad"
                className="w-7 h-7 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Puntos de paginación e indicador de unidad activa */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ver ${slide.label}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentSlide
                      ? "bg-[#fab511] w-6 h-2 shadow-[0_0_10px_rgba(250,181,17,0.8)]"
                      : "bg-white/40 hover:bg-white/80 w-2 h-2"
                  }`}
                />
              ))}
              <span className="text-[11px] font-bold text-white/90 pl-1.5 hidden sm:inline-block">
                {heroSlides[currentSlide].label}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-[#fab511] bg-black/30 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#fab511]/20">
            <span className="w-2 h-2 rounded-full bg-[#fab511] animate-pulse" />
            <span>Flota moderna JUVASA</span>
          </div>
        </div>

      </div>
    </section>
  );
}
