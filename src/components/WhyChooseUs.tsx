import { Clock, ShieldCheck, HeartHandshake, Radio, UserCheck, FileCheck } from "lucide-react";

export default function WhyChooseUs() {
  // 6 beneficios oficiales en fondo guinda corporativo (#6c1323)
  // Únicamente ícono + título, sin párrafos descriptivos debajo
  const benefits = [
    { icon: <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-[#fab511]" />, title: "Puntualidad" },
    { icon: <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#fab511]" />, title: "Seguridad y respaldo" },
    { icon: <HeartHandshake className="w-7 h-7 sm:w-8 sm:h-8 text-[#fab511]" />, title: "Experiencia y confianza" },
    { icon: <Radio className="w-7 h-7 sm:w-8 sm:h-8 text-[#fab511]" />, title: "Monitoreo GPS en tiempo real" },
    { icon: <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#fab511]" />, title: "Atención personalizada" },
    { icon: <FileCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#fab511]" />, title: "Empresa formal" },
  ];

  return (
    <section id="nosotros" className="py-16 sm:py-20 bg-[#6c1323] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            ¿POR QUÉ ELEGIR JUVASA?
          </h2>
          <div className="w-16 h-1 bg-[#fab511] mx-auto rounded-full" />
          <p className="text-red-100 font-sans text-sm sm:text-base">
            Un servicio pensado para que viajes con confianza y tranquilidad.
          </p>
        </div>

        {/* Distribución 6 elementos en línea o 3x2 en pantallas medianas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="font-display text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
