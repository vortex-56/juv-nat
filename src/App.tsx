import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import IntroVideo from "./components/IntroVideo";
import Fleet from "./components/Fleet";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import TrustLogos from "./components/TrustLogos";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import FloatingWsp from "./components/FloatingWsp";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#fab511] selection:text-[#6c1323] overflow-x-hidden antialiased">
      {/* Salto accesible al contenido principal */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#fab511] focus:text-[#5c0d12] focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5c0d12]"
      >
        Saltar al contenido principal
      </a>

      {/* 1. HEADER / MENÚ PRINCIPAL */}
      <Header />

      {/* CONTENIDO PRINCIPAL */}
      <main id="main" role="main">
        {/* 2. HERO PRINCIPAL + 3. FORMULARIO DENTRO DEL HERO */}
        <Hero />

        {/* 4. NUESTROS SERVICIOS (Formato 3x2) */}
        <Services />

        {/* 5. VIDEO PROMOCIONAL (Conoce más de Transporte JUVASA) */}
        <IntroVideo />

        {/* 6. NUESTRA FLOTA (Camioneta, Van, Sprinter Corta, Sprinter Larga + Franja con íconos) */}
        <Fleet />

        {/* 7. ¿POR QUÉ ELEGIR JUVASA? (Fondo guinda, 6 elementos visuales ícono + título) */}
        <WhyChooseUs />

        {/* 8. EXPERIENCIAS DE NUESTROS CLIENTES (3 testimonios reales) */}
        <Testimonials />

        {/* 9. EMPRESAS QUE CONFÍAN EN NOSOTROS (Composición 3x3 de logos oficiales) */}
        <TrustLogos />

        {/* 10. CTA FINAL (¿Listo para reservar tu movilidad?) */}
        <FinalCTA />
      </main>

      {/* 11. FOOTER (Fondo guinda oscuro, formalidad, redes, contactos) */}
      <Footer />

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <FloatingWsp />
    </div>
  );
}
