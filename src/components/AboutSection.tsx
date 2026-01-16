import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

// --- MAGNETIC AVATAR CARD ---
// Behält das Layout bei (kleines Bild), fügt aber 3D-Tiefe hinzu
function MagneticTeamCard({ 
  name, 
  role, 
  imageSrc, 
  linkTo 
}: { 
  name: string; 
  role: string; 
  imageSrc: string; 
  linkTo: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Maus-Physik
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXRel = e.clientX - rect.left - width / 2;
      const mouseYRel = e.clientY - rect.top - height / 2;
      x.set(mouseXRel);
      y.set(mouseYRel);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Rotation des gesamten Containers
  const rotateX = useTransform(mouseY, [-150, 150], [15, -15]); 
  const rotateY = useTransform(mouseX, [-150, 150], [-15, 15]);

  // Parallax-Verschiebungen (Unterschiedliche Ebenen für Bild und Text)
  const imageMoveX = useTransform(mouseX, [-100, 100], [-5, 5]);
  const imageMoveY = useTransform(mouseY, [-100, 100], [-5, 5]);
  
  const textMoveX = useTransform(mouseX, [-100, 100], [-15, 15]); // Text bewegt sich stärker -> wirkt näher
  const textMoveY = useTransform(mouseY, [-100, 100], [-15, 15]);

  // Glanz-Effekt auf dem Bild
  const shineX = useTransform(mouseX, [-150, 150], ["150%", "-150%"]);

  return (
    <Link to={linkTo} className="block group">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="cursor-pointer flex flex-col items-center"
      >
        {/* ROTIERENDER CONTAINER */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex flex-col items-center"
        >
          
          {/* 1. BILD CONTAINER (Klein & Rund, wie im Screenshot) */}
          <motion.div 
            style={{ 
                x: imageMoveX, 
                y: imageMoveY,
                transform: "translateZ(20px)" 
            }}
            className="w-56 h-56 rounded-[3rem] overflow-hidden mb-8 border border-white/10 p-2 bg-white/5 backdrop-blur-md shadow-2xl relative group-hover:border-cyan-500/50 transition-colors duration-500"
          >
            {/* Das eigentliche Bild */}
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                <img 
                  src={imageSrc} 
                  alt={name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Holografischer Glanz (Shine) */}
                <motion.div 
                  style={{ x: shineX }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
            </div>
          </motion.div>

          {/* 2. TEXT (Schwebt vor dem Bild) */}
          <motion.div
            style={{
              x: textMoveX,
              y: textMoveY,
              transform: "translateZ(60px)", // Text schwebt deutlich weiter vorne
            }}
            className="text-center"
          >
            <h4 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 drop-shadow-lg">
              {name}
            </h4>
            <p className="text-cyan-500 font-bold uppercase text-xs tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
              {role}
            </p>
          </motion.div>

        </motion.div>
      </motion.div>
    </Link>
  );
}


export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative w-full bg-transparent py-24 sm:py-32 md:py-40 border-t border-white/5 overflow-hidden">
      
      {/* Hintergrund-Deko: Dezenter Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            {t.about.title}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 md:mb-8">
            {t.about.mission_title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto italic mb-20 sm:mb-28 md:mb-32 font-light leading-relaxed">
            "{t.about.mission_text}"
          </p>
        </motion.div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-2 gap-12 sm:gap-16 md:gap-20 max-w-4xl mx-auto">
          
          {/* MARCO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MagneticTeamCard 
              name="Marco Winistörfer"
              role={t.about.marco_role}
              imageSrc="/about/wini.png"
              linkTo="/about/marco"
            />
          </motion.div>

          {/* TILL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <MagneticTeamCard 
              name="Till Schubiger"
              role={t.about.till_role}
              imageSrc="/about/till.jpg"
              linkTo="/about/till"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}