import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent, useRef } from "react";

// --- SPACE CARD: Kombiniert 3D-Reveal, Floating und Spotlight ---
function SpaceCard({ children, className = "", index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 1. SCROLL INTERACTION: Karte reagiert auf Position im Viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.5 0.5"], // Startet wenn Oberkante im Viewport, endet in der Mitte
  });

  // "Deploy"-Effekt: Kippt von hinten nach vorne und wird sichtbar
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]); 
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // 2. SPOTLIGHT LOGIK
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div ref={cardRef} style={{ perspective: "1000px" }} className={className}>
      <motion.div
        style={{ 
          rotateX, 
          scale, 
          opacity,
          transformStyle: "preserve-3d"
        }}
        // 3. FLOATING ANIMATION: Endlos-Schweben (versetzt je nach Index)
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2 // Jede Karte schwebt leicht versetzt
          },
          // Für die Scroll-Transform nutzen wir die scrollYProgress direkt, keine transition
        }}
        className="group relative border border-white/10 bg-white/5 overflow-hidden rounded-[3rem] h-full flex flex-col backdrop-blur-md transition-colors duration-500 hover:border-cyan-500/30"
        onMouseMove={handleMouseMove}
      >
        {/* Der Spotlight-Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(6, 182, 212, 0.1),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Inhalt */}
        <div className="relative z-20 flex flex-col h-full">{children}</div>
      </motion.div>
    </div>
  );
}


export function ServicesSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Render-Funktion
  const renderCards = (
    items: any[], 
    containerClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto"
  ) => {
    // Wenn nur ein Item, zentrieren
    const gridClassName = items.length === 1 
      ? "flex justify-center items-start w-full max-w-5xl mx-auto"
      : containerClassName;

    return (
    <div className={gridClassName}>
      {items.map((service: any, index: number) => {
        const primaryLabel = service.ctaPrimary;
        const primaryLink = service.ctaPrimaryLink;
        const secondaryLabel = service.ctaSecondary;
        const secondaryLink = service.ctaSecondaryLink;

        const isExternal = (link?: string) => !!link && link.startsWith("http");

        return (
          // Wir übergeben den Index für das versetzte Schweben
          <SpaceCard key={service.id} index={index} className={`${items.length === 1 ? 'w-full max-w-2xl' : 'h-full'}`}> 
            <div
              className="p-6 sm:p-8 xl:p-10 flex flex-col h-full cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => service.detailLink && navigate(service.detailLink)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && service.detailLink) {
                  e.preventDefault();
                  navigate(service.detailLink);
                }
              }}
            >
              
              {/* BEST BADGE (Optional, falls gewünscht - aktuell ausgeblendet im Design) */}
              {/* {service.isBest && (...)} */}

              <div className="text-center space-y-4 mb-10">
                <h3 className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-400 uppercase tracking-[0.2em] min-h-[3rem] flex flex-wrap items-center justify-center text-center whitespace-normal break-words leading-tight group-hover:text-white transition-colors duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {service.title}
                </h3>
                
                <p className="text-cyan-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                  {service.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base font-medium text-center mb-8 leading-relaxed">
                {service.benefit}
              </p>

              <div className="pt-6 border-t border-white/10 mb-10 flex-grow">
                <ul className="space-y-4">
                  {service.bullets && service.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[12px] font-bold uppercase tracking-wider text-slate-300 leading-tight group-hover:text-slate-100 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> 
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-auto flex flex-col gap-3">
                {primaryLabel && primaryLink && (
                  isExternal(primaryLink) ? (
                    <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="block w-full" onClick={(e) => e.stopPropagation()}>
                      <Button className="w-full bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/50 text-[13px] py-6 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/20">
                        {primaryLabel} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={primaryLink} className="block w-full" onClick={(e) => e.stopPropagation()}>
                      <Button className="w-full bg-white/5 hover:bg-cyan-500/20 text-white border border-white/10 hover:border-cyan-500/50 text-[13px] py-6 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/20">
                        {primaryLabel} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )
                )}

                {secondaryLabel && secondaryLink && (
                  isExternal(secondaryLink) ? (
                    <a href={secondaryLink} target="_blank" rel="noopener noreferrer" className="block w-full" onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-cyan-500/50 text-[12px] py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/10">
                        {secondaryLabel} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={secondaryLink} className="block w-full" onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-cyan-500/50 text-[12px] py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/10">
                        {secondaryLabel} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )
                )}
              </div>
            </div>
          </SpaceCard>
        );
      })}
    </div>
    );
  };

  if (!t.services?.overview) return null;

  return (
    <section id="services" className="w-full bg-transparent py-24 sm:py-32 md:py-40 px-4 sm:px-6 relative border-t border-white/5">
      <div className="container mx-auto">
        <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-16 block text-center">
          {t.services.blue_title}
        </span>
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6">
              {t.services.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light italic">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
        
        {renderCards(t.services.overview.items)}
      </div>
    </section>
  );
}