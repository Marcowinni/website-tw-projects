import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { MouseEvent, useRef } from "react";

// --- MAGNETIC CARD COMPONENT ---
function MagneticContactCard({ children, className = "", href = "" }: { children: React.ReactNode; className?: string; href?: string }) {
  // FIX: Ref als 'any' typisieren, damit es sowohl für div als auch für a (Link) akzeptiert wird
  const ref = useRef<any>(null);

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

  // Rotation
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  // Content Parallax (Inhalt bewegt sich gegenläufig zur Rotation -> Tiefe)
  const contentX = useTransform(mouseX, [-150, 150], [-10, 10]);
  const contentY = useTransform(mouseY, [-150, 150], [-10, 10]);

  // Glanz-Effekt
  const shineX = useTransform(mouseX, [-150, 150], ["150%", "-150%"]);

  // Wrapper: Link oder Div
  const Wrapper = href ? motion.a : motion.div;
  const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...wrapperProps}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative block h-full group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden"
      >
        
        {/* HOLOGRAPHIC SHINE */}
        <motion.div 
          style={{ x: shineX }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        />

        {/* INHALT (Schwebt vor der Karte) */}
        <motion.div
          style={{
            x: contentX,
            y: contentY,
            transform: "translateZ(30px)", // 3D Tiefe
          }}
          className="relative z-20 h-full p-8 flex flex-col items-center justify-center text-center"
        >
          {children}
        </motion.div>

      </motion.div>
    </Wrapper>
  );
}


export function ContactSection() {
  const { t } = useLanguage();

  const contactInfo = {
    email: "tillandwin@gmail.com",
    phone: "+41 79 943 26 30",
    whatsappLink: "https://wa.me/41799432630"
  };

  return (
    <section id="contact" className="relative w-full bg-transparent py-40 px-6 overflow-hidden border-t border-white/5">
      <div className="container mx-auto relative z-10">

        <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-16 block text-center">
            {t.kontakt.blue_title}
          </span>
        
        <div className="text-center mb-20 max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
            <VerticalCutReveal containerClassName="justify-center text-white pb-2">
              {t.kontakt.title}
            </VerticalCutReveal>
          </h2>
          <p className="text-xl text-slate-400 font-medium">
            {t.kontakt.subtitle}
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* WHATSAPP CARD */}
          <MagneticContactCard href={contactInfo.whatsappLink}>
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 group-hover:text-green-400 transition-colors">
              {t.kontakt.whatsapp_label}
            </h3>
            
            {/* QR Code Container mit extra Tiefe */}
            <div className="bg-white p-3 rounded-3xl mb-6 shadow-2xl transform transition-transform group-hover:scale-105">
              <img src="/whatsapp-qr.png" alt="WhatsApp QR" className="w-32 h-32 object-contain" />
            </div>
            
            <span className="text-slate-400 group-hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
              Chat <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticContactCard>


          {/* EMAIL CARD */}
          <MagneticContactCard href={`mailto:${contactInfo.email}`}>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4 group-hover:text-cyan-400 transition-colors">
              {t.kontakt.email_label}
            </h3>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tighter break-all">
              {contactInfo.email}
            </span>
          </MagneticContactCard>


          {/* PHONE CARD */}
          <MagneticContactCard href={`tel:${contactInfo.phone}`}>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4 group-hover:text-blue-400 transition-colors">
              {t.kontakt.phone_label}
            </h3>
            <span className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-300 transition-colors tracking-tighter">
              {contactInfo.phone}
            </span>
          </MagneticContactCard>

        </div>
      </div>
    </section>
  );
}