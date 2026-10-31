import { Clock, ShieldCheck, HeartHandshake, Radio, UserCheck, FileCheck } from "lucide-react";

export default function WhyChooseUs() {
  // 6 beneficios oficiales en fondo guinda corporativo (#6c1323)
  // Únicamente ícono + título, sin párrafos descriptivos debajo
  const benefits = [
    { icon: <Clock className="w-14 h-14 sm:w-16 sm:h-16 text-[#fab511] stroke-[2]" />, title: "Puntualidad" },
    { icon: <ShieldCheck className="w-14 h-14 sm:w-16 sm:h-16 text-[#fab511] stroke-[2]" />, title: "Seguridad y respaldo" },
    { icon: <HeartHandshake className="w-14 h-14 sm:w-16 sm:h-16 text-[#fab511] stroke-[2]" />, title: "Experiencia y confianza" },
    { icon: <Radio className="w-14 h-14 sm:w-16 sm:h-16 text-[#fab511] stroke-[2]" />, title: "Monitoreo GPS en tiempo real" },
    { icon: <UserCheck className="w-14 h-14 sm:w-16 sm:h-16 text-[#fab511] stroke-[2]" />, title: "Atención personalizada" },
    { icon: <FileCheck className="w-14 h-14 sm:w-16 sm:h-16 text-[#fab511] stroke-[2]" />, title: "Empresa formal" },
  ];

  return (
    <section id="nosotros" className="py-8 sm:py-10 bg-[#6c1323] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            ¿POR QUÉ ELEGIR JUVASA?
          </h2>
          <div className="w-16 h-1 bg-[#fab511] mx-auto rounded-full" />
          <p className="text-red-100 font-sans text-sm sm:text-base">
            Un servicio pensado para que viajes con confianza y tranquilidad.
          </p>
        </div>

        {/* Distribución 6 elementos: Ícono amarillo grande arriba, texto blanco abajo, fondo directo de la sección sin cajas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-start text-center">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start gap-3 group text-center cursor-default"
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
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
