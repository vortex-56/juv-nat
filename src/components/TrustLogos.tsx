import { TRUST_COMPANIES } from "../types";

export default function TrustLogos() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2">
          <p className="text-xs sm:text-sm font-bold tracking-wider text-gray-500 uppercase">
            EMPRESAS QUE
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            CONFÍAN EN <span className="text-[#6c1323]">NOSOTROS</span>
          </h2>
          <p className="text-gray-600 font-sans text-sm sm:text-base pt-1">
            Empresas e instituciones que han confiado en nuestros servicios de transporte.
          </p>
        </div>

        {/* Composición 3 × 3 limpia con logos oficiales (solo imagen) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {TRUST_COMPANIES.map((company) => (
            <div
              key={company.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 flex items-center justify-center text-center shadow-xs hover:shadow-md transition-all duration-300 hover:border-[#6c1323]/30 group h-24 sm:h-28"
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="max-h-12 sm:max-h-14 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
