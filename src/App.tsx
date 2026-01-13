import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ReferenceSection } from "./components/ReferenceSection";
import { ContactSection } from "./components/ContactSection";
import { AboutSection } from "./components/AboutSection";
import { FooterSection } from "./components/FooterSection";
import { LanguageProvider } from "./context/LanguageContext";
import { Sparkles } from "./components/ui/sparkles";
import { ProfileDetailPage } from "./components/ProfileDetailPage";
import { useEffect } from "react";
import { ParallaxPlanets } from "./components//ui/ParallaxPlanets";
import AllProjectsPage from "./components/AllProjectsPage";
import { ImprintPage } from "./components/ImprintPage";
import { TermsPage } from "./components/TermsPage";
import { Analytics } from "@vercel/analytics/react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wenn ein Hash da ist (#services), warten wir kurz, bis die LandingPage geladen ist
      const scrollToElement = () => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      // 200ms Timeout gibt React genug Zeit, die Sektionen nach dem Seitenwechsel zu mounten
      const timeoutId = setTimeout(scrollToElement, 200);
      return () => clearTimeout(timeoutId);
    } else {
      // Wenn kein Hash da ist, immer ganz nach oben
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}


function LandingPage() {
  return (
    // Die gesamte Landingpage ist transparent
    <div className="relative bg-transparent">
      <Navbar />
      <HeroSection />
      
      {/* Alle Inhalts-Sektionen sind transparent gelayert */}
      <div className="relative z-10 bg-transparent">
        <ServicesSection />
        <ReferenceSection />
        <ContactSection />
        <AboutSection />
        <FooterSection />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />

        {/* Vercel Analytics Komponente*/}
        <Analytics />
        
        {/* FIXIERTER HINTERGRUND: Das schwarze Universum */}
        <div className="fixed inset-0 z-0 bg-black pointer-events-none">
          {/* 1. Die Sterne */}
          <Sparkles 
            density={1200} 
            size={1.4} 
            color="#06b6d4" 
            className="opacity-40 h-full w-full" 
          />
          
          {/* 2. NEU: Die beweglichen Planeten */}
          <ParallaxPlanets />
          
          {/* 3. Der Glow-Effekt */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
        </div>

        <main className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<AllProjectsPage />} />
            <Route path="/about/:id" element={<ProfileDetailPage />} />
            <Route path="/impressum" element={<ImprintPage />} />
            <Route path="/agb" element={<TermsPage />} />
            
          </Routes>
        </main>
      </Router>
    </LanguageProvider>
  );
}

export default App;