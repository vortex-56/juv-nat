import { useState, useEffect } from "react";
import { PhoneCall, Clock, UserCheck, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  const handleWhatsAppRedirect = () => {
    const targetPhone = "51981370909";
    const rawText = "Hola, deseo consultar un servicio de transporte privado con Transporte JUVASA.";
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(rawText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Carrusel automático con las mismas imágenes de la portada
  const slides = [
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p1.1.webp",
      alt: "Transporte JUVASA - Portada 1",
    },
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p2.webp",
      alt: "Transporte JUVASA - Portada 2",
    },
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p3.webp",
      alt: "Transporte JUVASA - Portada 3",
    },
    {
      url: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-p4.webp",
      alt: "Transporte JUVASA - Portada 4",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Transición automática sin controles manuales
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const benefits = [
    { icon: <Clock className="w-4 h-4 text-[#fab511]" />, text: "Atención 24/7" },
    { icon: <UserCheck className="w-4 h-4 text-[#fab511]" />, text: "Atención personalizada" },
    { icon: <ShieldCheck className="w-4 h-4 text-[#fab511]" />, text: "Sin compromiso" },
  ];

  return (
    <section className="relative py-10 lg:py-14 overflow-hidden bg-black text-white">
      {/* Mitad derecha (solo escritorio): Carrusel automático de altura completa desde la mitad hasta el borde derecho */}
      <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none select-none z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Degradado angosto únicamente en el borde izquierdo para no tapar ni oscurecer las imágenes */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Textos y acción:
              - En móvil: centrado, sin imagen, ocupando el ancho completo en fondo negro puro.
              - En escritorio: en la mitad izquierda, alineado a la izquierda. */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              ¿Listo para reservar{" "}
              <span className="text-[#fab511]">tu movilidad?</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-xl">
              Consulta tu servicio de transporte privado y recibe atención inmediata por WhatsApp.
            </p>

            {/* Botón amarillo corporativo */}
            <div className="pt-2">
              <a
                href="https://wa.me/51981370909?text=Hola%2C%20deseo%20consultar%20un%20servicio%20de%20transporte%20privado%20con%20Transporte%20JUVASA."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#fab511] hover:bg-[#e2a20b] text-[#6c1323] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_6px_24px_rgba(250,181,17,0.3)] hover:shadow-[0_8px_30px_rgba(250,181,17,0.5)] active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 fill-[#6c1323]" />
                Cotiza por WhatsApp
              </a>
            </div>

            {/* Beneficios inferiores */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6 border-t border-white/15 w-full">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 border border-white/10">
                    {b.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-200 tracking-wide font-sans">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
