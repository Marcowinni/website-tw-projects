import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";

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

        {/* GEÄNDERT: grid-cols-1 für Mobile/Tablet, lg:grid-cols-3 für Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* WHATSAPP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-[2.5rem] bg-transparent border border-white/5 backdrop-blur-md flex flex-col items-center text-center transition-all hover:border-cyan-500/40"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t.kontakt.whatsapp_label}</h3>
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-2xl">
              <img src="/public/whatsapp-qr.png" alt="WhatsApp QR" className="w-32 h-32 object-contain" />
            </div>
            <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
              Direkt-Chat <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* EMAIL - Schriftgröße verkleinert & Umbruch optimiert */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-[2.5rem] bg-transparent border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center transition-all hover:border-cyan-500/40 min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{t.kontakt.email_label}</h3>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="text-lg sm:text-xl md:text-2xl font-black text-white hover:text-cyan-400 transition-colors tracking-tighter"
            >
              {contactInfo.email}
            </a>
          </motion.div>

          {/* PHONE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 rounded-[2.5rem] bg-transparent border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center transition-all hover:border-cyan-500/40 min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{t.kontakt.phone_label}</h3>
            <a 
              href={`tel:${contactInfo.phone}`}
              className="text-2xl md:text-3xl font-black text-white hover:text-blue-400 transition-colors tracking-tighter"
            >
              {contactInfo.phone}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}