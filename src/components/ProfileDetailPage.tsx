import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ArrowLeft, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";

export function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState(0);

  // @ts-ignore
  const person = t.about.team_details[id as string];

  if (!person) {
    return (
      <>
        <Navbar />
        <main className="container-x pt-40 pb-section-y">
          <h1 className="font-display text-4xl text-ink">Profil nicht gefunden.</h1>
        </main>
        <FooterSection />
      </>
    );
  }

  const nextImg = () => setImgIndex((prev) => (prev + 1) % person.images.length);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-section-y">
        <div className="container-x max-w-5xl">
          <Link
            to="/#about"
            className="inline-flex items-center gap-2 text-sm text-slate2 hover:text-ink transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t.about.back_button}
          </Link>

          <div className="grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-12">
            {/* image swiper */}
            <div className="col-span-12 md:col-span-6">
              <button
                type="button"
                onClick={nextImg}
                aria-label="Nächstes Bild"
                className="block w-full group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-cloud-deep border border-line">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={person.images[imgIndex]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover gpu"
                      alt={person.name}
                    />
                  </AnimatePresence>
                  {/* indicator pills */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-cloud/95 backdrop-blur px-2.5 py-1.5">
                    {person.images.map((_: any, i: number) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === imgIndex ? "bg-ink w-6" : "bg-slate2/40 w-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-center text-xs text-slate2 mt-3 italic font-display opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t.about.bild_weiter}
                </p>
              </button>
            </div>

            {/* content */}
            <div className="col-span-12 md:col-span-6 space-y-8">
              <div>
                <span className="eyebrow mb-3"><span>Team</span></span>
                <h1 className="font-display font-normal text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight mt-4">
                  {person.name}
                </h1>
                <p className="text-xs uppercase tracking-eyebrow font-semibold text-navy mt-3">
                  {id === "marco" ? t.about.marco_role : t.about.till_role}
                </p>
              </div>

              <p className="text-lg text-slate2 leading-relaxed text-pretty">
                {person.description}
              </p>

              <div className="pt-8 border-t border-line">
                <h3 className="text-[10px] uppercase tracking-eyebrow font-semibold text-ink mb-5 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-navy" /> {t.about.hobbys_title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {person.hobbies.map((hobby: string) => (
                    <span
                      key={hobby}
                      className="px-4 py-1.5 border border-line text-sm text-slate2 hover:border-ink hover:text-ink transition-colors duration-300"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
