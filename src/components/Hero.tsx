import React, { useState, useEffect, useRef } from "react";
import { Clock, Shield, UserCheck, CalendarDays, PhoneCall, Compass, User, Phone, Users, Calendar, Mail } from "lucide-react";

export default function Hero() {
  // Slider Background State
  const [currentBg, setCurrentBg] = useState(0);
  const bgImages = [
    "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/bg01auto.webp",
    "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/bg02minibus.webp",
    "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/bg03van.webp",
    "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/bg04bus.webp"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  // Floating Form State (Including email as requested)
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    passengers: "",
    email: "",
    serviceType: "",
    serviceDate: ""
  });
  const [countryCode, setCountryCode] = useState("+51");
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    { code: "+506", emoji: "🇨🇷", name: "Costa Rica" },
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

  const getCountryEmoji = (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return "🌐";
    const normalized = trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
    const found = countries.find(c => c.code === normalized);
    return found ? found.emoji : "🌐";
  };
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger conversion event for Google & Meta Ads tracking
    console.log("⚡ [CONVERSION EVENT] Evento de Cotización disparado para Google Ads & Meta Pixel.");
    if (window.hasOwnProperty("gtag")) {
      try {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/LABEL",
          value: 1.0,
          currency: "PEN"
        });
      } catch (err) {
        console.error("Gtag conversion error:", err);
      }
    }

    const targetPhone = "51981370909";
    const fullContact = `${countryCode} ${formData.contact}`;
    const nameLine = `👤 *Nombre:* ${formData.fullName}%0A`;
    const contactLine = `📞 *WhatsApp:* ${fullContact}%0A`;
    const paxLine = `👥 *N° pasajeros:* ${formData.passengers}%0A`;
    const emailLine = formData.email ? `✉️ *Correo:* ${formData.email}%0A` : "";
    const serviceLine = `🚐 *Servicio:* ${formData.serviceType || "No especificado"}%0A`;
    const dateLine = `📅 *Fecha del servicio:* ${formData.serviceDate || "Por coordinarse"}%0A`;

    const rawText = `Hola, soy ${formData.fullName}. Mi WhatsApp es ${fullContact}.${formData.email ? ` Mi correo es ${formData.email}.` : ""} Necesito un servicio de transporte para ${formData.passengers}${formData.serviceDate ? ` para la fecha ${formData.serviceDate}` : ""}.${formData.serviceType ? ` Mi tipo de servicio de interés es: ${formData.serviceType}.` : ""}`;

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formData.fullName ? rawText : "Hola, deseo realizar una cotización rápida para un servicio de transporte privado.")}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsSuccess(false);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const pillars = [
    {
      icon: <Clock className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-brand-yellow shrink-0" />,
      title: "Puntualidad",
      desc: "Garantizada todo el año"
    },
    {
      icon: <Shield className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-brand-yellow shrink-0" />,
      title: "Seguridad",
      desc: "Y absoluta confianza"
    },
    {
      icon: <UserCheck className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-brand-yellow shrink-0" />,
      title: "Conductores",
      desc: "Profesionales capacitados"
    },
    {
      icon: <CalendarDays className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-brand-yellow shrink-0" />,
      title: "Atención 24/7",
      desc: "Monitoreo constante rápido"
    }
  ];

  return (
    <section
      id="inicio"
      className="relative pt-[70px] pb-8 lg:pt-[80px] lg:pb-10 min-h-screen lg:h-[max(580px,calc(100vh-64px))] lg:max-h-[720px] xl:max-h-[820px] flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Anchor for contact scrolls */}
      <div id="contacto" className="absolute top-0 left-0 w-full h-0 pointer-events-none" />

      {/* Slider of 4 Vehicles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgImages.map((imgUrl, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              i === currentBg ? "opacity-80" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${imgUrl}')` }}
          />
        ))}
        {/* Layer of rich gradient to read text perfectly and show background cover photos */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/95 via-neutral-950/50 to-black/35 z-1" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:14px_24px] z-2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 xl:gap-8 items-center">
          
          {/* Left Column: Brand Typography & Pillars */}
          <div className="flex flex-col text-left space-y-3 lg:space-y-2 xl:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-red/45 border border-brand-red/60 text-white text-[9px] md:text-xs font-bold font-sans uppercase tracking-[0.1em] rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
              Servicio Turístico y Ejecutivo 100% Formal
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-[23px] lg:leading-[1.15] xl:text-[38px] xl:leading-[1.1] font-black text-white tracking-tight">
              Transporte Ejecutivo <span className="block my-0.5">y Turístico para</span>
              <span className="text-brand-yellow block mt-0.5 font-black">
                Empresas, Familias y Grupos
              </span>
            </h1>

            <p className="text-red-100 text-[11px] sm:text-xs xl:text-sm leading-relaxed max-w-lg">
              Soluciones de transporte privado con puntualidad, seguridad y comodidad en Lima y todo el Perú.
            </p>

            {/* Confidence Pillars */}
            <div className="grid grid-cols-2 gap-2 max-w-md pt-1">
              {pillars.map((pillar, i) => (
                <div key={i} className="flex gap-2 items-start p-1.5 lg:p-1 xl:p-2 border border-white/5 bg-white/5 rounded-lg">
                  <div className="p-1 rounded bg-brand-red/35 flex items-center justify-center border border-brand-red/50 shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] lg:text-[9.5px] xl:text-[11px] font-bold text-white font-display uppercase tracking-wider leading-tight">{pillar.title}</span>
                    <span className="text-[8.5px] lg:text-[8px] xl:text-[9px] text-red-200 font-sans leading-none mt-0.5">{pillar.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1 lg:pt-0">
              <button
                onClick={() => scrollToSection("contacto")}
                className="px-4 py-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-red-dark font-black text-[10px] xl:text-xs uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Cotizar por WhatsApp
              </button>
              
              <button
                onClick={() => scrollToSection("servicios")}
                className="px-4 py-2 bg-transparent hover:bg-white/5 text-white font-bold text-[10px] xl:text-xs uppercase tracking-wider rounded-lg border border-white/30 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
              >
                <Compass className="w-3.5 h-3.5" />
                Conocer Servicios
              </button>
            </div>
          </div>

          {/* Right Column: Floating Form */}
          <div className="w-full max-w-sm lg:max-w-[340px] xl:max-w-[380px] lg:ml-auto">
            <div className="bg-white text-brand-dark rounded-2xl p-4 sm:p-5 lg:p-4 xl:p-6 shadow-2xl border border-gray-100 relative overflow-hidden">
              
              {isSuccess && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-500 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-900">¡Cotización Lista!</h3>
                  <p className="text-[10px] text-gray-500 mt-1 max-w-xs leading-tight">
                    Abriendo WhatsApp para comunicarte directamente con nuestro asesor disponible.
                  </p>
                </div>
              )}

              <div className="text-left mb-3.5">
                <h3 className="font-display text-xs font-bold text-red-950 uppercase tracking-widest block text-brand-red">
                  COTIZA TU SERVICIO RÁPIDAMENTE
                </h3>
                <p className="text-[10px] font-sans text-gray-500 font-medium">
                  Te respondemos en minutos
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-2.5 text-left">
                {/* Nombre de Contacto */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-wider block">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-brand-red bg-gray-50 focus:bg-white transition-all placeholder:text-gray-400 font-sans font-medium"
                    />
                    <User className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-wider block">
                    WhatsApp *
                  </label>
                  <div className="flex gap-1.5 font-sans">
                    {/* Country Code Selector */}
                    <div className="relative w-[34%] shrink-0" ref={dropdownRef}>
                      <div className="flex items-center gap-1 w-full px-2 py-1.5 text-xs text-gray-950 border border-gray-200 rounded-lg outline-none focus-within:ring-1 focus-within:ring-brand-red focus-within:border-brand-red bg-gray-50 focus-within:bg-white transition-all select-none">
                        {/* Emoji based on current code prefix */}
                        <span className="text-[13px]">{getCountryEmoji(countryCode)}</span>
                        
                        {/* Editable Country Code Input */}
                        <input
                          type="text"
                          value={countryCode}
                          onChange={(e) => {
                            let val = e.target.value;
                            // Ensure only valid characters (+ and digits) can be typed
                            if (val === "" || val === "+" || /^\+?[0-9]*$/.test(val)) {
                              setCountryCode(val);
                            }
                          }}
                          placeholder="+51"
                          className="w-full bg-transparent border-none outline-none p-0 text-xs font-bold text-gray-950 block"
                        />
                        
                        {/* Trigger button for menu */}
                        <button
                          type="button"
                          onClick={() => setShowCodeDropdown(!showCodeDropdown)}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none text-[8px] px-0.5"
                          aria-label="Seleccionar País"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Dropdown overlay list */}
                      {showCodeDropdown && (
                        <div className="absolute left-0 mt-1 max-h-48 w-44 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 text-xs divide-y divide-gray-50">
                          <div className="px-2 py-1 text-[8px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/55">
                            Seleccionar País
                          </div>
                          {countries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(c.code);
                                setShowCodeDropdown(false);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-1.5 text-left hover:bg-gray-100 transition-colors text-gray-850"
                            >
                              <span className="text-sm">{c.emoji}</span>
                              <span className="font-bold">{c.code}</span>
                              <span className="text-gray-400 text-[10px] truncate">({c.name})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        name="contact"
                        required
                        placeholder="Ej. 981370909"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-brand-red bg-gray-50 focus:bg-white transition-all placeholder:text-gray-400 font-sans font-medium"
                      />
                      <Phone className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Número de Pasajeros - Moved under WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-wider block">
                    Número de pasajeros *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="num-pasajeros"
                      name="passengers"
                      min="1"
                      required
                      placeholder="Ej. 4"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-brand-red bg-gray-50 focus:bg-white transition-all placeholder:text-gray-400 font-sans font-medium"
                    />
                    <Users className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Correo Electrónico (Opcional) */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-wider block">
                    Correo electrónico (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Ej. juan@correo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-brand-red bg-gray-50 focus:bg-white transition-all placeholder:text-gray-400 font-sans font-medium"
                    />
                    <Mail className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Tipo de Servicio */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-wider block">
                    Tipo de servicio (Opcional)
                  </label>
                  <div className="relative">
                    <select
                      id="tipo-servicio"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full pr-8 pl-2.5 py-1.5 text-xs text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-brand-red bg-gray-50 focus:bg-white transition-all font-sans cursor-pointer appearance-none font-medium"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Transporte para Empresas">Transporte para Empresas</option>
                      <option value="Transporte de Personal">Transporte de Personal</option>
                      <option value="Traslados al Aeropuerto">Traslados al Aeropuerto</option>
                      <option value="Paseos Familiares">Paseos Familiares</option>
                      <option value="Eventos Sociales">Eventos Sociales</option>
                      <option value="Eventos Corporativos">Eventos Corporativos</option>
                    </select>
                    <Compass className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Fecha del Servicio */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-wider block">
                    Fecha del servicio (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleChange}
                      className="w-full pr-8 pl-3 py-1.5 text-xs text-gray-950 border border-gray-200 rounded-lg outline-none focus:border-brand-red bg-gray-50 focus:bg-white transition-all font-sans font-medium"
                    />
                    <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full py-2 bg-brand-red hover:bg-brand-red-hover text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Solicitar Cotización
                  </button>
                  <p className="text-[9px] text-gray-400 font-sans text-center mt-1.5 font-semibold">
                    Respuesta inmediata por WhatsApp
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
