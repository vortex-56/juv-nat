export interface FleetItem {
  id: string;
  name: string;
  capacity: string;
  description: string;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  distance: string;
  tag: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  comment: string;
  stars: number;
  imageUrl?: string;
  initials: string;
  avatarBg: string;
  timeAgo: string;
  ownerReply?: string;
}

export interface QuoteFormData {
  fullName: string;
  contact: string;
  serviceType?: string;
  serviceDate?: string;
  passengers: string;
}

// 6 Servicios estructurados según requerimientos oficiales de Transporte JUVASA
export const SERVICES: ServiceItem[] = [
  {
    id: "transporte-corporativo",
    title: "Transporte corporativo y ejecutivo",
    description: "Traslados para empresas, ejecutivos, colaboradores y actividades corporativas.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-s1.webp",
    iconName: "Briefcase",
  },
  {
    id: "traslados-aeropuerto",
    title: "Traslados desde y hacia el aeropuerto",
    description: "Servicio programado para pasajeros, familias, empresas y visitantes con conexión directa al Aeropuerto Internacional Jorge Chávez.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-s2.webp",
    iconName: "Plane",
  },
  {
    id: "paseos-familiares",
    title: "Paseos familiares",
    description: "Movilidad privada para salidas, reuniones y paseos de familias o grupos.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-s3.webp",
    iconName: "Compass",
  },
  {
    id: "eventos-sociales",
    title: "Eventos sociales",
    description: "Transporte para matrimonios, cumpleaños, reuniones y celebraciones.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-s4.webp",
    iconName: "Sparkles",
  },
  {
    id: "viajes-privados-destinos",
    title: "Viajes privados a destinos seleccionados",
    description: "Movilidad privada desde Lima hacia destinos disponibles, previa coordinación.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-s5.webp",
    iconName: "MapPin",
  },
  {
    id: "transporte-grupos-delegaciones",
    title: "Transporte para grupos y delegaciones",
    description: "Traslados para instituciones, universidades, grupos deportivos, delegaciones y organizaciones.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-s6.webp",
    iconName: "Users",
  },
];

// Flota oficial JUVASA con 4 unidades exactas
export const FLEET: FleetItem[] = [
  {
    id: "camioneta",
    name: "CAMIONETA",
    capacity: "1–6 pasajeros",
    description: "Una opción cómoda y versátil para traslados ejecutivos y grupos pequeños.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-a1.webp",
  },
  {
    id: "van",
    name: "VAN",
    capacity: "6–10 pasajeros",
    description: "Ideal para familias, empresas y grupos que buscan mayor espacio durante el traslado.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-a2.webp",
  },
  {
    id: "sprinter-corta",
    name: "SPRINTER CORTA",
    capacity: "11–15 pasajeros",
    description: "Una alternativa amplia y confortable para grupos, delegaciones y viajes programados.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-a3.webp",
  },
  {
    id: "sprinter-larga",
    name: "SPRINTER LARGA",
    capacity: "16–20 pasajeros",
    description: "Mayor capacidad para grupos numerosos, eventos y traslados de larga distancia.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/x1-a4.webp",
  },
];

export interface TrustCompany {
  id: string;
  name: string;
  label: string;
  desc: string;
  logoUrl: string;
}

// 9 Empresas e instituciones oficiales con sus logos
export const TRUST_COMPANIES: TrustCompany[] = [
  { id: "mtc", name: "MTC", label: "MTC", desc: "Ministerio de Transportes y Comunicaciones", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo1.webp" },
  { id: "dgac", name: "DGAC", label: "DGAC", desc: "Dirección General de Aeronáutica Civil", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo2.webp" },
  { id: "forbis", name: "Forbis Logistics", label: "FORBIS LOGISTICS", desc: "Logística y carga internacional", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo3.webp" },
  { id: "real-plaza", name: "Real Plaza", label: "REAL PLAZA", desc: "Cadena de centros comerciales", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo4.webp" },
  { id: "queirolo", name: "Santiago Queirolo", label: "SANTIAGO QUEIROLO", desc: "Tradición vitivinícola", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo5.webp" },
  { id: "tacama", name: "Tacama", label: "TACAMA", desc: "Viñedo histórico del Perú", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo6.webp" },
  { id: "vanderlande", name: "Vanderlande", label: "VANDERLANDE", desc: "Sistemas logísticos y aeropuertos", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo7.webp" },
  { id: "kimberly-clark", name: "Kimberly-Clark", label: "KIMBERLY-CLARK", desc: "Multinacional de consumo", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo8.webp" },
  { id: "fovipol", name: "FOVIPOL", label: "FOVIPOL", desc: "Fondo de Vivienda Policial", logoUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-logo9.webp" },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "stephany-orozco",
    author: "Stephany Orozco",
    role: "2 opiniones · Google Maps",
    timeAgo: "Hace 3 meses",
    comment: "Excelente experiencia. Necesitaba un traslado temprano al aeropuerto y llegaron incluso unos minutos antes. El chofer fue muy amable y el viaje fue tranquilo.",
    stars: 5,
    initials: "SO",
    avatarBg: "bg-purple-600",
    ownerReply: "¡Muchas gracias, Stephany! Nos alegra que tu traslado temprano al aeropuerto haya sido tranquilo y que destaques la puntualidad y amabilidad de nuestro conductor. ¡Será un gusto acompañarte en tu próximo viaje!",
  },
  {
    id: "alexander-chicoma",
    author: "Alexander Chicoma",
    role: "1 opinión · Google Maps",
    timeAgo: "Hace 3 meses",
    comment: "Lo que más me gustó fue la puntualidad. A veces uno se preocupa por los tiempos, pero en este caso todo estuvo bien organizado. Recomendado.",
    stars: 5,
    initials: "AC",
    avatarBg: "bg-blue-600",
    ownerReply: "¡Gracias por recomendarnos, Alexander! Sabemos lo importante que es cumplir los horarios y nos alegra que hayas valorado la puntualidad y la organización del servicio. ¡Gracias por confiar en Transporte Juvasa!",
  },
  {
    id: "valeria-peche",
    author: "Valeria Peche",
    role: "2 opiniones · Google Maps",
    timeAgo: "Hace 3 meses",
    comment: "Muy buena comunicación desde el inicio. Me confirmaron la reserva y el conductor estuvo pendiente de mi ubicación para facilitar el recojo. Todo excelente",
    stars: 5,
    initials: "VP",
    avatarBg: "bg-teal-600",
    ownerReply: "¡Gracias, Valeria! Nos alegra saber que la comunicación y la coordinación del recojo facilitaron tu traslado. Gracias por compartir tu experiencia y elegir Transporte Juvasa. ¡Esperamos volver a atenderte pronto!",
  },
  {
    id: "diego-gc",
    author: "Diego Gc",
    role: "1 opinión · Google Maps",
    timeAgo: "Hace 4 meses",
    comment: "Excelente servicio de transporte. Muy amable, puntual y profesional en todo momento. Las unidades estaban limpias, cómodas y en muy buenas condiciones. El viaje fue seguro y agradable, superando mis expectativas. Sin duda, recomendaría Juvasa a cualquier persona que busque un servicio de calidad y confianza.",
    stars: 5,
    initials: "DG",
    avatarBg: "bg-amber-600",
  },
  {
    id: "magda-cuica",
    author: "Magda Cuica",
    role: "2 opiniones · Google Maps",
    timeAgo: "Hace 3 meses",
    comment: "Muy buen servicio. El conductor llegó puntual y durante todo el recorrido manejó con mucho cuidado. El vehículo estaba limpio y cómodo. Sin duda volvería a contratar esta empresa!",
    stars: 5,
    initials: "MC",
    avatarBg: "bg-rose-600",
    ownerReply: "¡Muchas gracias, Magda! Nos alegra que hayas disfrutado de un viaje cómodo y que destaques la puntualidad y el cuidado de nuestro conductor. Gracias por elegir Transporte Juvasa. ¡Con gusto te atenderemos en tu próximo viaje!",
  },
];
