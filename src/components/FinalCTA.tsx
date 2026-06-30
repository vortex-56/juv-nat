import { PhoneCall, Check } from "lucide-react";

export default function FinalCTA() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto");
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

  const handleWhatsAppRedirect = () => {
    const targetPhone = "51981370909";
    const rawText = "Hola, estoy listo para mi próximo viaje. Deseo realizar una cotización para un servicio de transporte privado.";
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(rawText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const bullets = [
    { text: "Atención 24/7" },
    { text: "Respuesta rápida" },
    { text: "Sin compromiso" }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-brand-dark">
      {/* Background Image of a dark Van/highway at sunset */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_85%] bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/bg04bus.webp')" 
        }}
      />
      {/* Dark layer overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left alignment text block as requested */}
          <div className="space-y-6 max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              ¿Listo para tu{" "}
              <span className="text-brand-yellow font-black">próximo viaje?</span>
            </h2>
            
            <p className="text-sm sm:text-base text-gray-200 font-sans font-medium leading-relaxed">
              Cotiza ahora tu servicio de transporte privado y recibe atención inmediata por WhatsApp.
            </p>

            {/* Compact button align with content */}
            <div className="pt-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-red-dark font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_20px_rgba(250,191,18,0.35)] hover:shadow-[0_6px_24px_rgba(250,191,18,0.50)] active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 fill-brand-red-dark text-brand-red-dark" />
                Cotizar por WhatsApp
              </button>
            </div>

            {/* Bottom badges aligned horizontally with yellow icon and white text */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-white/10">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-yellow flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-brand-red-dark stroke-[3.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-sans">
                    {bullet.text}
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
