import { useLanguage } from "../context/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";

export default function AllProjectsPage() {
  const { t } = useLanguage();
  const { hash } = useLocation();

  const projects: any[] = t.references.items;

  const getId = (project: any) => project.slug ?? project.name.toLowerCase().replace(/\s+/g, "-");
  const isExternal = (link?: string) => !!link && link.startsWith("http");

  const [mutedById, setMutedById] = useState<Record<string, boolean>>({});

  const sortedProjects = useMemo(() => {
    const bildstoeckli = projects.filter((p) => p.groupId === "bildstoeckli");
    const rest = projects.filter((p) => p.groupId !== "bildstoeckli");
    return [...bildstoeckli, ...rest];
  }, [projects]);

  // scroll to anchor after mount
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-section-y">
        <div className="container-x max-w-content">
          <Link
            to="/#references"
            className="inline-flex items-center gap-2 text-sm text-slate2 hover:text-ink transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Zurück
          </Link>

          {/* head */}
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-16 sm:mb-20">
            <div className="col-span-12 md:col-span-4">
              <div className="eyebrow mb-4">
                <span>{t.references.blue_title}</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-7">
              <h1 className="font-display font-normal text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.05] tracking-tight text-balance mb-5">
                {t.references.title}
              </h1>
              <p className="text-lg text-slate2 leading-relaxed max-w-prose-lg">
                {t.references.subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {sortedProjects.map((project, i) => {
              const pid = getId(project);
              const muted = mutedById[pid] ?? true;
              return (
                <article
                  key={pid}
                  id={project.id}
                  className="grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-10 items-start"
                >
                  {/* video */}
                  <div className="col-span-12 lg:col-span-7">
                    <div className="relative bg-ink overflow-hidden border border-line">
                      <div
                        className={`relative w-full overflow-hidden ${
                          project.orientation === "portrait" ? "aspect-[9/16] max-w-md mx-auto" : "aspect-[16/9]"
                        }`}
                      >
                        <video
                          key={project.video}
                          muted={muted}
                          loop
                          playsInline
                          autoPlay
                          preload="metadata"
                          className="w-full h-full object-cover"
                        >
                          <source src={project.video} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                        {project.logo && (
                          <div className="absolute top-4 left-4 z-10 bg-cloud px-3 py-2 shadow-soft">
                            <img src={project.logo} alt="" className="h-7 w-auto object-contain" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setMutedById((p) => ({ ...p, [pid]: !muted }))}
                          aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
                          className="absolute top-4 right-4 z-10 bg-cloud/90 backdrop-blur-sm text-ink p-2.5 rounded-full hover:bg-cloud transition-all duration-300"
                        >
                          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* meta */}
                  <div className="col-span-12 lg:col-span-5 lg:pl-2">
                    <div className="font-display italic text-sm text-slate2 mb-3">
                      N° 0{i + 1} · {project.groupLabel}
                    </div>
                    <h2 className="font-display font-normal text-3xl sm:text-4xl text-ink leading-tight tracking-tight mb-3">
                      {project.name}
                    </h2>
                    <p className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-8">
                      {project.tags?.join(" · ")}
                    </p>

                    <div className="space-y-6 text-[15px] mb-10">
                      <div>
                        <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-slate2 mb-1.5">
                          Für wen
                        </div>
                        <p className="text-ink leading-relaxed">{project.forWhom ?? project.description}</p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-slate2 mb-1.5">
                          Was gemacht wurde
                        </div>
                        <p className="text-ink leading-relaxed">{project.deliverable ?? project.description}</p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-slate2 mb-1.5">
                          Ergebnis
                        </div>
                        <p className="text-ink leading-relaxed">{project.result ?? project.description}</p>
                      </div>
                    </div>

                    {project.link && (
                      isExternal(project.link) ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                          {project.ctaLabel ?? "Referenz ansehen"}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      ) : (
                        <Link to={project.link} className="btn btn-primary group">
                          {project.ctaLabel ?? "Referenz ansehen"}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      )
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
