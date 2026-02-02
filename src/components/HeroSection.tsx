import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- ZOOM & PORTAL LOGIK ---
  const holeSize = useTransform(scrollYProgress, [0.1, 0.7], ["0vmax", "250vmax"]);
  
  const logoOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.7, 0.9], [60, 0]);

  return (
    <div ref={containerRef} className="relative h-[170vh] md:h-[200vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* DAS PORTAL */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
           <motion.div 
             style={{ width: holeSize, height: holeSize }}
             className="rounded-full border-[200vmax] border-black box-content flex-shrink-0 bg-transparent shadow-[inset_0_0_150px_rgba(0,0,0,1)]"
           />
        </div>

        {/* PHASE 1: LOGO */}
        <motion.div 
          style={{ opacity: logoOpacity, scale: logoScale }}
          className="relative z-40 flex items-center justify-center pointer-events-none w-full px-6 sm:px-10"
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-auto h-40 sm:h-56 md:h-[500px] object-contain drop-shadow-[0_0_60px_rgba(6,182,212,0.4)]"
          />
        </motion.div>

        {/* PHASE 2: TEXT AUS SPRACHFILE */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="max-w-6xl">
            <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-white mb-8 md:mb-10 leading-[0.9] tracking-tighter uppercase">
              {t.hero.title_main} <br />
              <span className="text-cyan-500 italic">{t.hero.title_highlight}</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-3xl text-slate-300 font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
              {t.hero.subtitle_main} <br className="hidden md:block" />
              {t.hero.subtitle_sub} <span className="text-white font-medium">{t.hero.subtitle_highlight}</span>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}