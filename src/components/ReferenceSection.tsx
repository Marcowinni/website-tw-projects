import { motion } from "framer-motion";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { useEffect, useRef, useState } from "react";

type Reference = {
  id: string;
  name: string;
  groupLabel: string;
  description: string;
  forWhom?: string;
  result?: string;
  video: string;
  logo?: string;
  tags?: string[];
  orientation?: "portrait" | "landscape";
};

function ProjectCard({ project, featured = false }: { project: Reference; featured?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) v.play().catch(() => {});
  }, [hovered]);

  // unify aspect across cards — landscape 16:10 keeps drone-style framing readable
  const aspect = project.orientation === "portrait" ? "aspect-[5/6]" : "aspect-[16/10]";

  return (
    <a
      href={`/projects#${project.id}`}
      className={`group block ${featured ? "lg:col-span-7" : "lg:col-span-5"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* media — pure video, no overlay */}
      <div className={`relative w-full overflow-hidden bg-cloud-deep border border-line ${aspect}`}>
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03] gpu"
        />
        {project.logo && (
          <div className="absolute top-4 left-4 z-10 bg-cloud px-3 py-1.5 shadow-soft">
            <img
              src={project.logo}
              alt={project.groupLabel}
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* caption — clean editorial line under card */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-slate2 mb-1">
            {project.tags?.join(" · ")}
          </div>
          <h3 className="font-display font-normal text-xl sm:text-2xl text-ink leading-tight tracking-tight">
            {project.name}
          </h3>
          <p className="text-sm text-slate2 mt-1">{project.groupLabel}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-ink shrink-0 mt-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </a>
  );
}

export function ReferenceSection() {
  const { t } = useLanguage();

  const projects: Reference[] = t.references.items as Reference[];
  const featured = [
    projects.find((p) => p.id === "bildstoeckli-goldig-wohnen"),
    projects.find((p) => p.id === "psschubiger-projekt-schmerikon"),
    projects.find((p) => p.id === "rieder-garbenweg"),
    projects.find((p) => p.id === "psschubiger-herrengasse"),
  ].filter(Boolean) as Reference[];

  return (
    <section id="references" className="py-section-y border-t border-line">
      <div className="container-x">
        {/* head */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow mb-4">
              <span>— 02 / {t.references.blue_title}</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight text-balance"
            >
              Ausgewählte{" "}
              <em className="not-italic font-display italic text-navy">Projekte</em>{" "}
              aus der DACH-Region.
            </motion.h2>
          </div>
        </div>

        {/* asymmetric grid — Goldig Wohnen featured + Schmerikon partner row 1; Garbenweg partner + Herrengasse featured row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12 mb-16 sm:mb-20">
          {featured.slice(0, 2).map((p, i) => (
            <ProjectCard project={p} featured={i === 0} key={p.id} />
          ))}
          {featured.slice(2, 4).map((p, i) => (
            <ProjectCard project={p} featured={i === 1} key={p.id} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-line">
          <p className="text-slate2 text-base sm:text-lg max-w-xl">
            {t.references.subtitle}
          </p>
          <a href="/projects" className="btn btn-primary group whitespace-nowrap">
            {t.references.projekte_title}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
