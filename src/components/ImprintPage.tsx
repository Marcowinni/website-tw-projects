import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import { FooterSection } from "./FooterSection";

export function ImprintPage() {
  const { t } = useLanguage();

  return (
    <>
    {/* HINTERGRUND: Transparent, damit das Universum sichtbar bleibt */}
    <div className="min-h-screen bg-transparent py-32 font-sans relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/#about">
          <Button variant="ghost" className="mb-8 pl-0 text-slate-400 hover:bg-transparent hover:text-cyan-500 transition-colors">
             {/* @ts-ignore */}
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.legal.back_home}
          </Button>
        </Link>
        
        {/* CONTAINER: Glassmorphism statt weisser Box */}
        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl border border-white/10">
          {/* @ts-ignore */}
          <h1 className="text-3xl font-black text-white mb-8 tracking-tight">{t.legal.imprint_title}</h1>
          
          <div className="space-y-8 text-slate-300">
            
            {/* ADRESSE */}
            <div>
              {/* @ts-ignore */}
              <h3 className="font-bold text-lg mb-2 text-white">{t.legal.company_name}</h3>
              {/* @ts-ignore */}
              <p>{t.legal.address_line1}</p>
              {/* @ts-ignore */}
              <p>{t.legal.address_line2}</p>
            </div>

            {/* KONTAKT */}
            <div>
              {/* @ts-ignore */}
              <h3 className="font-bold text-lg mb-2 text-white">{t.legal.contact_title}</h3>
              {/* @ts-ignore */}
              <p>E-Mail: {t.legal.email}</p>
            </div>

            {/* HAFTUNGSAUSSCHLUSS */}
            <div className="pt-6 border-t border-white/10">
              {/* @ts-ignore */}
              <h3 className="font-bold text-lg mb-2 text-white">{t.legal.disclaimer_title}</h3>
              {/* @ts-ignore */}
              <p className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
                {t.legal.disclaimer_text}
              </p>
            </div>

            {/* HAFTUNG FÜR LINKS */}
            {/* @ts-ignore */}
            {t.legal.links_title && (
              <div className="pt-6 border-t border-white/10">
                {/* @ts-ignore */}
                <h3 className="font-bold text-lg mb-2 text-white">{t.legal.links_title}</h3>
                {/* @ts-ignore */}
                <p className="text-sm leading-relaxed text-slate-400">
                  {t.legal.links_text}
                </p>
              </div>
            )}

            {/* URHEBERRECHTE */}
            {/* @ts-ignore */}
            {t.legal.copyright_title && (
              <div className="pt-6 border-t border-white/10">
                {/* @ts-ignore */}
                <h3 className="font-bold text-lg mb-2 text-white">{t.legal.copyright_title}</h3>
                {/* @ts-ignore */}
                <p className="text-sm leading-relaxed text-slate-400">
                  {t.legal.copyright_text}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    <FooterSection />
    </>
  );
}