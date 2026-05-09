import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ReferenceSection } from "./components/ReferenceSection";
import { ContactSection } from "./components/ContactSection";
import { AboutSection } from "./components/AboutSection";
import { FooterSection } from "./components/FooterSection";
import { LanguageProvider } from "./context/LanguageContext";
import { ProfileDetailPage } from "./components/ProfileDetailPage";
import { useEffect } from "react";
import AllProjectsPage from "./components/AllProjectsPage";
import { ImprintPage } from "./components/ImprintPage";
import { TermsPage } from "./components/TermsPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { Analytics } from "@vercel/analytics/react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToElement = () => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      const timeoutId = setTimeout(scrollToElement, 200);
      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ReferenceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Analytics />

        <div className="min-h-screen bg-cloud text-ink antialiased">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<AllProjectsPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/about/:id" element={<ProfileDetailPage />} />
            <Route path="/impressum" element={<ImprintPage />} />
            <Route path="/agb" element={<TermsPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
