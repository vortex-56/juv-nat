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
  imageUrl: string;
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
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/02-s1.webp",
    iconName: "Briefcase",
  },
  {
    id: "traslados-aeropuerto",
    title: "Traslados desde y hacia el aeropuerto",
    description: "Servicio programado para pasajeros, familias, empresas y visitantes con conexión directa al Aeropuerto Internacional Jorge Chávez.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/02-s2.webp",
    iconName: "Plane",
  },
  {
    id: "paseos-familiares",
    title: "Paseos familiares",
    description: "Movilidad privada para salidas, reuniones y paseos de familias o grupos.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/02-s3.webp",
    iconName: "Compass",
  },
  {
    id: "eventos-sociales",
    title: "Eventos sociales",
    description: "Transporte para matrimonios, cumpleaños, reuniones y celebraciones.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/02-s4.webp",
    iconName: "Sparkles",
  },
  {
    id: "viajes-privados-destinos",
    title: "Viajes privados a destinos seleccionados",
    description: "Movilidad privada desde Lima hacia destinos disponibles, previa coordinación.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/02-s5.webp",
    iconName: "MapPin",
  },
  {
    id: "transporte-grupos-delegaciones",
    title: "Transporte para grupos y delegaciones",
    description: "Traslados para instituciones, universidades, grupos deportivos, delegaciones y organizaciones.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/02-s6.webp",
    iconName: "Users",
  },
];

// Flota oficial JUVASA con 4 unidades exactas
export const FLEET: FleetItem[] = [
  {
    id: "camioneta",
    name: "CAMIONETA",
    capacity: "4–6 pasajeros",
    description: "Una opción cómoda y versátil para traslados ejecutivos y grupos pequeños.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/01-auto1.webp",
  },
  {
    id: "van",
    name: "VAN",
    capacity: "6–10 pasajeros",
    description: "Ideal para familias, empresas y grupos que buscan mayor espacio durante el traslado.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/01-auto2.webp",
  },
  {
    id: "sprinter-corta",
    name: "SPRINTER CORTA",
    capacity: "11–15 pasajeros",
    description: "Una alternativa amplia y confortable para grupos, delegaciones y viajes programados.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/01-auto3.webp",
  },
  {
    id: "sprinter-larga",
    name: "SPRINTER LARGA",
    capacity: "16–20 pasajeros",
    description: "Mayor capacidad para grupos numerosos, eventos y traslados de larga distancia.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/01-auto4.webp",
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
    id: "t1",
    author: "Ing. Jorge Benavides",
    role: "Jefe de Logística Corporativa",
    comment: "Excelente servicio para el traslado de nuestro equipo de trabajo. Siempre puntuales, unidades impecablemente limpias y choferes altamente calificados.",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "t2",
    author: "Carlos Morales",
    role: "Cliente Particular — Traslado Aeropuerto",
    comment: "Puntualidad absoluta en el recojo hacia el aeropuerto Jorge Chávez. Conducción prudente y van muy amplia para todo nuestro equipaje.",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    id: "t3",
    author: "Claudia Palacios",
    role: "Coordinadora de Eventos",
    comment: "Contratamos los servicios de Juvasa para una conferencia corporativa de varios días. La coordinación y el monitoreo permanente fueron impecables.",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
];
