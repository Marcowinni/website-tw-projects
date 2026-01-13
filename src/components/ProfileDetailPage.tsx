import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState(0);

  // @ts-ignore - Sicherstellen, dass die Daten existieren
  const person = t.about.team_details[id as string];

  if (!person) return <div className="text-white p-20">Profil nicht gefunden.</div>;

  const nextImg = () => setImgIndex((prev) => (prev + 1) % person.images.length);

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        <Link to="/#about">
          <Button variant="ghost" className="mb-12 text-slate-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.about.back_button}
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* IMAGE SWIPER */}
          <div className="relative group cursor-pointer" onClick={nextImg}>
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 p-2 bg-white/5 backdrop-blur-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={person.images[imgIndex]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
              </AnimatePresence>
            </div>
            {/* Indikator-Punkte */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm">
              {person.images.map((_: any, i: number) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? 'bg-cyan-500 w-4' : 'bg-white/40'}`} />
              ))}
            </div>
            <p className="text-center text-slate-500 text-xs mt-4 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {t.about.bild_weiter}
            </p>
          </div>

          {/* CONTENT */}
          <div className="space-y-8">
            <div>
              <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-2 block"></span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">{person.name}</h1>
            </div>

            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {person.description}
            </p>

            <div className="pt-8 border-t border-white/5">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <Heart className="w-4 h-4 text-cyan-500" /> {t.about.hobbys_title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {person.hobbies.map((hobby: string) => (
                  <span key={hobby} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-slate-300">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}