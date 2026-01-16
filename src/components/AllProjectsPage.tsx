import HeroScrollVideo from "../components/ui/scroll-animated-video";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AllProjectsPage() {
  const { t } = useLanguage();

  const showcaseNames = ["DigitalSens", "Memora-Moments", "PS-Schubiger"];
  const projects = t.references.items.filter((p: any) => showcaseNames.includes(p.name));

  const getId = (project: any) => project.slug ?? project.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <main className="bg-[#0b0c10] relative">
      
      {/* Schwebender Back-Button */}
      <Link 
        to="/#references" 
        className="fixed top-4 sm:top-8 left-4 sm:left-8 z-[100] flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 p-3 sm:p-4 sm:px-6 rounded-full text-white font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-[11px] md:text-xs hover:bg-cyan-600 hover:border-cyan-400 transition-all hover:scale-110 group shadow-2xl"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
        Zurück
      </Link>

      {projects.map((project: any) => (
        <div key={getId(project)} id={getId(project)}>
          <HeroScrollVideo
            title={project.name}
            subtitle={project.tags?.join(" • ") ?? ""}
            meta={project.meta ?? `2025`}
            media={project.video}
            orientation={project.orientation ?? "landscape"}
            overlay={{
              caption: project.name.toUpperCase(),
              heading: project.heading ?? project.name,
              paragraphs: [project.description],
              extra: project.link ? (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105"
                >
                  {project.ctaLabel ?? "Webseite besuchen"}
                </a>
              ) : null
            }}
            scrollHeightVh={300}
          />
        </div>
      ))}
    </main>
  );
}