import { useLanguage } from "../context/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function AllProjectsPage() {
  const { t } = useLanguage();

  const projects = t.references.items;

  const getId = (project: any) => project.slug ?? project.name.toLowerCase().replace(/\s+/g, "-");
  const isExternal = (link?: string) => !!link && link.startsWith("http");
  const categories = t.references.categories ?? [];

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project: any) => project.serviceCategory === activeCategory);
  }, [projects, activeCategory]);

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    const first = projects[0];
    return first ? getId(first) : "";
  });

  const [mutedById, setMutedById] = useState<Record<string, boolean>>({});

  const groupedProjects = useMemo(() => {
    const map = new Map<string, any[]>();
    filteredProjects.forEach((project: any) => {
      const key = project.groupId ?? getId(project);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(project);
    });
    return Array.from(map.entries()).map(([groupId, items]) => ({
      groupId,
      label: items[0]?.groupLabel ?? items[0]?.name ?? groupId,
      logo: items[0]?.logo,
      items,
    }));
  }, [filteredProjects]);

  const [activeGroupId, setActiveGroupId] = useState<string>(() => {
    const first = projects[0];
    return first?.groupId ?? (first ? getId(first) : "");
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (!category) return;
    const validCategories = categories.map((c: any) => c.id);
    if (!validCategories.includes(category)) return;
    setActiveCategory(category);
    const first = (category === "all" ? projects : projects.filter((p: any) => p.serviceCategory === category))[0];
    if (first) {
      setActiveProjectId(getId(first));
      setActiveGroupId(first.groupId ?? getId(first));
    }
  }, [location.search, categories, projects]);

  useEffect(() => {
    if (!location.hash) return;
    const idFromHash = location.hash.replace("#", "");
    const match = projects.find((p: any) => getId(p) === idFromHash);
    if (match) {
      setActiveProjectId(getId(match));
      setActiveGroupId(match.groupId ?? getId(match));
    }
  }, [location.hash, projects]);

  const activeProject = useMemo(() => {
    const fromFiltered = filteredProjects.find((p: any) => getId(p) === activeProjectId);
    if (fromFiltered) return fromFiltered;
    return filteredProjects[0] ?? projects[0];
  }, [filteredProjects, projects, activeProjectId]);

  const activeGroup = useMemo(() => {
    const match = groupedProjects.find((g) => g.groupId === activeGroupId);
    if (match) return match;
    return groupedProjects[0];
  }, [groupedProjects, activeGroupId]);

  return (
    <main className="bg-transparent relative min-h-screen">
      
      {/* Schwebender Back-Button */}
      <Link 
        to="/#references" 
        className="fixed top-4 sm:top-8 left-4 sm:left-8 z-[100] flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 p-3 sm:p-4 sm:px-6 rounded-full text-white font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-[11px] md:text-xs hover:bg-cyan-600 hover:border-cyan-400 transition-all hover:scale-110 group shadow-2xl"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
        Zurück
      </Link>

      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            {t.references.blue_title}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            {t.references.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto font-light">
            {t.references.subtitle}
          </p>
        </div>

        {/* Kategorien */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  const first = (category.id === "all" ? projects : projects.filter((p: any) => p.serviceCategory === category.id))[0];
                  if (first) setActiveProjectId(getId(first));
                }}
                className={`px-5 py-2 rounded-full border text-[11px] font-black uppercase tracking-[0.25em] transition-all ${
                  activeCategory === category.id
                    ? "bg-cyan-500/20 text-white border-cyan-500/50"
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Logo-Reiter */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {groupedProjects.map((group) => (
            <button
              key={group.groupId}
              onClick={() => {
                setActiveGroupId(group.groupId);
                const first = group.items[0];
                if (first) setActiveProjectId(getId(first));
              }}
              className={`flex items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-md transition-all ${
                group.groupId === activeGroup?.groupId
                  ? "bg-white/10 border-cyan-500/50 text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30"
              }`}
            >
              {group.logo && (
                <img src={group.logo} alt={`${group.label} Logo`} className="h-6 sm:h-7 w-auto object-contain" />
              )}
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                {group.label}
              </span>
            </button>
          ))}
        </div>

        {activeProject && (
          <div className="space-y-10">
            {(activeGroup?.items?.length ? activeGroup.items : [activeProject]).map((project: any) => (
              <div key={getId(project)} className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className={"relative w-full overflow-hidden " + (project.orientation === "portrait" ? "aspect-[9/16]" : "aspect-[16/9]")}>
                    <video
                      key={project.video}
                      muted={mutedById[getId(project)] ?? true}
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    {project.logo && (
                      <div className="absolute top-6 left-6 z-10 rounded-full bg-black/60 border border-white/10 px-5 py-3 backdrop-blur-md">
                        <img
                          src={project.logo}
                          alt={`${project.name} Logo`}
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setMutedById((prev) => ({
                          ...prev,
                          [getId(project)]: !(prev[getId(project)] ?? true),
                        }))
                      }
                      aria-label={(mutedById[getId(project)] ?? true) ? "Ton einschalten" : "Ton ausschalten"}
                      className="absolute top-5 right-5 z-10 rounded-full bg-black/60 border border-white/10 p-4 text-white backdrop-blur-md hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                    >
                      {(mutedById[getId(project)] ?? true) ? (
                        <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="border border-white/10 bg-white/5 rounded-[2.5rem] p-8 sm:p-10 backdrop-blur-md">
                  <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {project.name}
                    </h2>
                    <p className="text-cyan-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                      {project.tags?.join(" • ") ?? ""}
                    </p>
                  </div>

                  <div className="mt-8 space-y-6 text-sm text-slate-300">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-2">Für wen</p>
                      <p className="leading-relaxed">{project.forWhom ?? project.description}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-2">Was gemacht wurde</p>
                      <p className="leading-relaxed">{project.deliverable ?? project.description}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-2">Ergebnis</p>
                      <p className="leading-relaxed">{project.result ?? project.description}</p>
                    </div>
                  </div>

                  {project.link && (
                    <div className="mt-10">
                      {isExternal(project.link) ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <button className="w-full bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/50 text-[12px] py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/20">
                            {project.ctaLabel ?? "Referenz ansehen"} <ArrowRight className="w-4 h-4" />
                          </button>
                        </a>
                      ) : (
                        <Link to={project.link} className="block">
                          <button className="w-full bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/50 text-[12px] py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/20">
                            {project.ctaLabel ?? "Referenz ansehen"} <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}