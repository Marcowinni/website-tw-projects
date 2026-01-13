import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../context/LanguageContext";
import { FooterSection } from "./FooterSection";

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <>
    {/* HINTERGRUND: Transparent */}
    <div className="min-h-screen bg-transparent py-32 font-sans relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/#about">
          <Button variant="ghost" className="mb-8 pl-0 text-slate-400 hover:bg-transparent hover:text-cyan-500 transition-colors">
             {/* @ts-ignore */}
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.legal.back_home}
          </Button>
        </Link>
        
        {/* CONTAINER: Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl border border-white/10">
          {/* @ts-ignore */}
          <h1 className="text-3xl font-black text-white mb-8 tracking-tight">{t.legal.terms_title}</h1>
          
          <div className="space-y-10 text-slate-300 leading-relaxed">
            
            <p className="font-bold text-white text-lg">
               {/* @ts-ignore */}
               {t.legal.terms_intro}
            </p>

            {/* Wir iterieren durch 12 Sektionen */}
            {Array.from({ length: 12 }).map((_, i) => {
              const index = i + 1;
              return (
                <div key={index}>
                  {/* @ts-ignore */}
                  <h3 className="font-bold text-lg mb-3 text-cyan-400 uppercase tracking-wider text-xs">
                    {/* @ts-ignore */}
                    {t.legal[`terms_${index}_title`]}
                  </h3>
                  {/* @ts-ignore */}
                  <p className="whitespace-pre-line text-sm md:text-base text-slate-300">
                    {/* @ts-ignore */}
                    {t.legal[`terms_${index}_text`]}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
    <FooterSection />
    </>
  );
}