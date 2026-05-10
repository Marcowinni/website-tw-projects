import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener("loadeddata", onCanPlay);
    return () => v.removeEventListener("loadeddata", onCanPlay);
  }, []);

  return (
    <section className="relative pt-[140px] sm:pt-[160px] pb-section-y overflow-hidden">
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,27,45,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,27,45,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-10 items-end">
          {/* LEFT — copy */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow mb-7"
            >
              <span>B2B · Real Estate · KI-Marketing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h-display text-balance mb-7"
            >
              {t.hero.title_main}{" "}
              <em className="font-display italic text-navy">{t.hero.title_highlight}</em>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-slate2 max-w-prose-lg leading-relaxed mb-9"
            >
              Premium-Werbefilme für Neubauprojekte und Überbauungen im DACH-Raum.
              KI-gestützte Visualisierung, klare Story, mehr qualifizierte Anfragen —
              {" "}<span className="text-ink font-medium">in 14 Tagen live.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              <a href="/#contact" className="btn btn-primary group">
                {t.header.cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="/projects" className="btn btn-ghost group">
                Projekte ansehen
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-slate2"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                <span className="uppercase tracking-eyebrow font-semibold">14 Tage Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                <span className="uppercase tracking-eyebrow font-semibold">Done-for-you</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                <span className="uppercase tracking-eyebrow font-semibold">DACH-Raum</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                <span className="uppercase tracking-eyebrow font-semibold">CH · DE · AT</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — video card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="relative aspect-[4/5] bg-cloud-deep border border-line overflow-hidden gpu group">
              {/* loading shimmer */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-navy-100 via-cloud-deep to-cloud-warm transition-opacity duration-700 ${
                  videoReady ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden
              />

              <video
                ref={videoRef}
                src="/demovideos/demo_bildstoeckli_goldig_wohnen.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Werbefilm-Beispiel: Goldig Wohnen Goldingen"
                className={`w-full h-full object-cover transition-opacity duration-1000 ease-out-expo ${
                  videoReady ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* overlay tag — top */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                <span className="inline-flex items-center gap-2 bg-cloud text-ink px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-eyebrow shadow-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
                  Live · Goldig Wohnen
                </span>
                <span className="bg-ink/80 backdrop-blur-sm text-cloud p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-3.5 h-3.5 fill-cloud" />
                </span>
              </div>

              {/* meta — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent z-10">
                <div className="flex items-end justify-between text-cloud">
                  <div>
                    <div className="text-[10px] uppercase tracking-eyebrow font-semibold opacity-75 mb-0.5">
                      Kunde
                    </div>
                    <div className="text-sm font-medium">Bildstöckli AG</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-eyebrow font-semibold opacity-75 mb-0.5">
                      Projekt
                    </div>
                    <div className="text-sm font-medium">Goldingen · 2026</div>
                  </div>
                </div>
              </div>
            </div>

            {/* caption under card */}
            <p className="mt-3 text-xs text-slate2 italic font-display">
              Aus unserer Produktion · Premium-Werbefilm im 4:5 Format für Meta &amp; YouTube.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
