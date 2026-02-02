import { useLanguage } from "../context/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InfiniteSlider } from "./ui/infinite-slider";
import { Button } from "./ui/button";

export function ReferenceSection() {
  const { t } = useLanguage();

  // Mapping der Logos zu den IDs in der AllProjectsPage
  const logos = [
    { src: "/references/logo_digitalsens.png", alt: "DigitalSens", id: "digitalsens", category: "web" },
    { src: "/references/logo_memora.png", alt: "Memora Moments", id: "memora-moments", category: "web" },
    { src: "/references/logo_psschubiger.png", alt: "P.S. Schubiger", id: "psschubiger", category: "video" },
  ];

  return (
    <section id="references" className="w-full bg-transparent py-24 sm:py-32 md:py-40 px-4 sm:px-6 relative border-t border-white/5">
      <div className="container mx-auto">
        
        {/* LOGO SLIDER - Jetzt klickbar */}
        <div className="mb-20 sm:mb-28 md:mb-32">
          <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-16 block text-center">
            {t.references.blue_title}
          </span>

          
          <InfiniteSlider gap={100} duration={20} className="py-12">
            {logos.map((logo, i) => (
              // Jeder Logo-Eintrag linkt jetzt direkt zum Projekt-Anker
              <Link 
                key={i} 
                to={`/projects?category=${logo.category}#${logo.id}`} 
                className="mx-12 block transition-all hover:scale-110 active:scale-95 group"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 drop-shadow-[0_0_20px_rgba(6,182,212,0)] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                />
              </Link>
            ))}
          </InfiniteSlider>
        </div>

        {/* BUTTON ZU ALLEN PROJEKTEN */}
        <div className="flex flex-col items-center gap-8">
          <p className="text-xl sm:text-2xl text-slate-400 font-light italic text-center max-w-2xl">
            {t.references.subtitle}
          </p>
          <Link to="/projects">
            <Button className="bg-white text-black hover:bg-cyan-500 hover:text-white text-lg sm:text-xl px-10 sm:px-16 py-6 sm:py-10 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-110 group">
              {t.references.projekte_title} <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}