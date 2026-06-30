import Header from "./components/Header";
import Hero from "./components/Hero";
import IntroVideo from "./components/IntroVideo";
import Services from "./components/Services";
import Fleet from "./components/Fleet";
import Destinations from "./components/Destinations";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import TrustLogos from "./components/TrustLogos";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import FloatingWsp from "./components/FloatingWsp";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-brand-yellow selection:text-brand-dark overflow-x-hidden antialiased">
      {/* 1. Elegant Sticky Header Navigation */}
      <Header />

      {/* 2. Hero Header Block (Title, Pillars, and 1:1 Stock Travel Video) */}
      <Hero />

      {/* 3. Intro Video Section */}
      <IntroVideo />

      {/* 4. Strategic Services Section (Including Paseos familiares turísticos) */}
      <Services />

      {/* 5. Custom Fleet Options (Camioneta, Van, Sprinter Corta, Sprinter Larga) */}
      <Fleet />

      {/* 6. Cobertura (Tourist Destinations Recurrents: Ica, Chancay, Cieneguilla, Chosica, Churín, Lunahuaná) */}
      <Destinations />

      {/* 7. Underneath Brand Trust Reasons (¿Por qué elegir Juvasa?) */}
      <WhyChooseUs />

      {/* 8. Glowing Client Testimonial Endorsements */}
      <Testimonials />

      {/* 3. Client Authority/Social Trust Section */}
      <TrustLogos />

      {/* 9.5 Final Call to Action Segment */}
      <FinalCTA />

      {/* 10. Multi-column Brand Footer Bar (RUC, SOAT policies, MTC approvals, office details) */}
      <Footer />

      {/* 11. Pulse Green Wsp widget & Mobile sticky bottom footer CTA scroll navigator */}
      <FloatingWsp />
    </div>
  );
}
