import HeroScrollVideo from "../components/ui/scroll-animated-video";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AllProjectsPage() {
  const { t } = useLanguage();

  // Nur DigitalSens und Memora Moments verwenden
  const filteredProjects = t.references.items.filter(
    (p: any) => p.name === "DigitalSens" || p.name === "Memora-Moments"
  );

  return (
    <main className="bg-[#0b0c10] relative">
      
      {/* Schwebender Back-Button */}
      <Link 
        to="/#references" 
        className="fixed top-10 left-10 z-[100] flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 p-4 px-6 rounded-full text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-cyan-600 hover:border-cyan-400 transition-all hover:scale-110 group shadow-2xl"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
        Zurück
      </Link>

      {filteredProjects.map((project: any, index: number) => (
        // WICHTIG: Die ID wird hier aus dem Namen generiert (z.B. "digitalsens")
        <div key={index} id={project.name.toLowerCase()}>
          <HeroScrollVideo
            title={project.name}
            subtitle={project.tags.join(" • ")}
            meta={`2025`}
            media={project.video}
            overlay={{
              caption: project.name.toUpperCase(),
              heading: project.name === "DigitalSens" ? "KI-Bildung & Kompetenz" : "Emotionale Erinnerungen",
              paragraphs: [project.description],
              extra: (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105"
                >
                  Webseite besuchen
                </a>
              )
            }}
            scrollHeightVh={300}
          />
        </div>
      ))}
    </main>
  );
}