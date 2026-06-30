export interface FleetItem {
  id: string;
  name: string;
  capacity: string;
  maxPassengers: number;
  features: string[];
  imageUrl: string;
  tagline: string;
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
  avatarUrl?: string;
  initials: string;
}

export interface QuoteFormData {
  fullName: string;
  contact: string; // WhatsApp o correo
  passengers: string;
  query: string;
  destination?: string;
  serviceType?: string;
  serviceDate?: string;
}

// Structured data matching JUVA's official services and the user's requirements
export const SERVICES: ServiceItem[] = [
  {
    id: "paseos-familiares",
    title: "Paseos familiares turísticos",
    description: "Viajes cómodos, seguros y a tu medida para familias y grupos que desean explorar los mejores destinos locales.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s6-paseofamiliar.webp",
    iconName: "Compass",
  },
  {
    id: "transporte-empresas",
    title: "Transporte para Empresas",
    description: "Movilidad corporativa de primer nivel para ejecutivos, colaboradores y personal con máxima puntualidad.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s3-transporteparaempresas.webp",
    iconName: "Briefcase",
  },
  {
    id: "transporte-personal",
    title: "Transporte de Personal",
    description: "Servicio diario de traslado seguro y eficiente de trabajadores para optimizar la productividad de tu organización.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s4-transportedepersonal.webp",
    iconName: "Users",
  },
  {
    id: "traslados-aeropuerto",
    title: "Traslados al Aeropuerto",
    description: "Recojos y traslados puntuales 24/7 desde y hacia el Aeropuerto Internacional Jorge Chávez sin preocupaciones.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s5-aeropuertos.webp",
    iconName: "Plane",
  },
  {
    id: "eventos-sociales",
    title: "Eventos Sociales",
    description: "Transporte seguro para matrimonios, cumpleaños, reencuentros y fiestas familiares para que todos disfruten al máximo.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s01-eventossociales.webp",
    iconName: "Sparkles",
  },
  {
    id: "eventos-corporativos",
    title: "Eventos Corporativos",
    description: "Soluciones de traslado masivo y coordinado para conferencias, activaciones, ferias y reuniones de negocios.",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/s2-eventoscorporativos.webp",
    iconName: "Award",
  },
];

// Modernized Fleet configurations precisely matching user requested types:
// camioneta, van, sprinter corta y sprinter larga
export const FLEET: FleetItem[] = [
  {
    id: "camioneta",
    name: "Camioneta Familiar y Ejecutiva",
    capacity: "4 a 6 pasajeros",
    maxPassengers: 6,
    tagline: "SUV premium de alta gama para grupos pequeños o ejecutivos",
    features: [
      "Aire acondicionado climatizado",
      "Asientos de cuero confortables",
      "Excelente estabilidad y seguridad vial",
      "Asientos reclinables y ergonómicos",
      "Ideal para viajes familiares cortos o ejecutivos",
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m01auto.webp",
  },
  {
    id: "van",
    name: "Van Ejecutiva",
    capacity: "7 a 10 pasajeros",
    maxPassengers: 10,
    tagline: "Van moderna con óptimo espacio y comodidad",
    features: [
      "Aire acondicionado multizona",
      "Asientos reclinables de alta gama",
      "Doble sistema de airbags y seguridad activa",
      "Espacio amplio para maletas y equipaje",
      "Ideal para paseos familiares y traslados",
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m02van-2.webp",
  },
  {
    id: "sprinter-corta",
    name: "Sprinter Corta",
    capacity: "11 a 15 pasajeros",
    maxPassengers: 15,
    tagline: "Minibús mediano de alto rendimiento y máximo confort viajero",
    features: [
      "Aire acondicionado de alta potencia",
      "Butacas reclinables con apoyacabezas",
      "Sistema de entretenimiento y audio premium",
      "Mayor altura interior para mejor movilidad",
      "Ideal para paseos turísticos medianos y traslados de personal",
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m03minibus.webp",
  },
  {
    id: "sprinter-larga",
    name: "Sprinter Larga",
    capacity: "16 a 20 pasajeros",
    maxPassengers: 20,
    tagline: "Mega-furgoneta espaciosa para grandes delegaciones y viajes largos",
    features: [
      "Aire acondicionado independiente por fila",
      "Butacas reclinables superconfortables",
      "Amplísimo compartimento maletero posterior",
      "Suspensión reforzada anti-vibraciones",
      "Ideal para largos destinos turísticos y delegaciones masivas",
    ],
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/m04bus.webp",
  },
];

// The tourist destinations required by the user: Ica, Chancay, Cieneguilla, Chosica, Churín, Lunahuaná
export const TOUR_DESTINATIONS: DestinationItem[] = [
  {
    id: "ica",
    name: "Ica & Huacachina",
    description: "Visita el oasis de América, pasea en tubulares, degusta los mejores vinos y pisco en viñedos tradicionales.",
    distance: "Aprox. 4 horas desde Lima (250 km)",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/p1-ica.webp",
    tag: "Aventura y Vinos",
  },
  {
    id: "chancay",
    name: "Chancay",
    description: "Recorre el histórico Castillo de Chancay frente al mar, museos de sitio y disfruta de su gastronomía marina.",
    distance: "Aprox. 1.5 horas desde Lima (80 km)",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/p2-chancay.webp",
    tag: "Cultura e Historia",
  },
  {
    id: "cieneguilla",
    name: "Cieneguilla",
    description: "Desconéctate en un clima templado permanente con hermosas casas de campo, centros campestres y gastronomía andina.",
    distance: "Aprox. 45 minutos desde Lima (30 km)",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/p3-cieneguilla.webp",
    tag: "Naturaleza y Relax",
  },
  {
    id: "chosica",
    name: "Chosica",
    description: "La eterna primavera te espera. Ideal para escapar de la garúa de Lima y disfrutar del sol, clubes y caminatas.",
    distance: "Aprox. 1 hora desde Lima (40 km)",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/p4-chosica.webp",
    tag: "Sol y Clubes Campestres",
  },
  {
    id: "churin",
    name: "Churín",
    description: "Relájate en sus famosas pozas termomedicinales de azufre, hierro y litio conocidas por sus propiedades curativas.",
    distance: "Aprox. 4.5 horas desde Lima (210 km)",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/p5-churin.webp",
    tag: "Termalismo y Bienestar",
  },
  {
    id: "lunahuana",
    name: "Lunahuaná",
    description: "El paraíso de los deportes de aventura: canotaje en el río Cañete, cuatrimotos, canopy, vinos y excelente pisco.",
    distance: "Aprox. 3 horas desde Lima (175 km)",
    imageUrl: "https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/p6-lunahuana.webp",
    tag: "Canotaje y Deportes de Aventura",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    author: "Ing. Jorge Benavides",
    role: "Jefe de Logística — Constructora Alfa",
    comment: "Excelente servicio para el traslado de nuestro personal de manera continua. Siempre puntuales, unidades impecablemente limpias y choferes profesionales.",
    stars: 5,
    initials: "JB",
  },
  {
    id: "t2",
    author: "Rosa María Cárdenas",
    role: "Cliente Particular — Paseo Familiar",
    comment: "Alquilamos una Sprinter Larga para ir a Lunahuaná por el fin de semana. El conductor fue sumamente amable y muy prudente al manejar. Repetiremos sin duda.",
    stars: 5,
    initials: "RC",
  },
  {
    id: "t3",
    author: "Claudia Palacios",
    role: "Organizadora de Eventos Corporativos",
    comment: "Contratamos 3 vans para coordinar el recojo de expositores internacionales desde el aeropuerto. Salió perfecto, el monitoreo por WhatsApp fue en tiempo real.",
    stars: 5,
    initials: "CP",
  },
];

export const TRUST_COMPANIES = [
  { name: "Confipetrol", logoText: "CONFIPETROL" },
  { name: "Graña y Montero", logoText: "G&M S.A." },
  { name: "BCP", logoText: "BCP >" },
  { name: "Cerro Verde", logoText: "Cerro Verde" },
  { name: "Rímac", logoText: "RÍMAC" },
  { name: "Sodexo", logoText: "sodexo" },
];
