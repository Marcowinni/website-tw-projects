import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxPlanets() {
  const { scrollY } = useScroll();

  // Unterschiedliche Geschwindigkeiten für den Parallax-Effekt
  // Planeten "tiefer" im Raum bewegen sich langsamer
  const y1 = useTransform(scrollY, [0, 5000], [0, -1000]); // Schneller Planet
  const y2 = useTransform(scrollY, [0, 5000], [0, -500]);  // Mittlerer Planet
  const y3 = useTransform(scrollY, [0, 5000], [0, -200]);  // Langsamer, ferner Planet

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Großer Planet - Vorne rechts */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[10%] -right-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-sm border border-cyan-500/10 shadow-[0_0_50px_rgba(6,182,212,0.1)]"
      />

      {/* Mittlerer Planet - Mitte links */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[40%] -left-10 w-40 h-40 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-blue-600/10 to-transparent blur-[2px] border border-blue-500/5 shadow-[0_0_40px_rgba(37,99,235,0.1)]"
      />

      {/* Kleiner, ferner Planet - Unten rechts */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-[80%] right-[15%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-slate-700/20 to-transparent border border-slate-500/10"
      />
    </div>
  );
}