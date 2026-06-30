export default function TrustLogos() {
  const companies = [
    { name: "Confipetrol", label: "CONFIPETROL" },
    { name: "Graña y Montero", label: "GRAÑA Y MONTERO" },
    { name: "BCP", label: "BCP" },
    { name: "Cerro Verde", label: "CERRO VERDE" },
    { name: "Rímac", label: "RÍMAC" },
    { name: "Sodexo", label: "SODEXO" }
  ];

  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-6 text-center">
          <h2 className="text-[11px] font-black font-display uppercase tracking-[0.2em] text-gray-500 block">
            Empresas que confían en nosotros
          </h2>

          {/* Grayscale inline labels */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
            {companies.map((company, index) => (
              <div
                key={index}
                className="font-display text-sm md:text-base font-black tracking-widest text-gray-400 select-none cursor-default py-1 uppercase opacity-65"
              >
                {company.label}
              </div>
            ))}
          </div>
          
          <p className="text-[10px] text-gray-400 font-sans italic pt-2">
            Y muchas más...
          </p>
        </div>

      </div>
    </section>
  );
}
