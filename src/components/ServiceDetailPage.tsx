import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { FooterSection } from "./FooterSection";

export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  // @ts-ignore
  const service = t.servicesDetail?.[id as string];

  if (!service) {
    return (
      <div className="min-h-screen bg-transparent text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link to="/#services">
            <Button variant="ghost" className="mb-12 text-slate-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black">Service nicht gefunden.</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-transparent text-white pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/#services">
            <Button variant="ghost" className="mb-12 text-slate-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zu Services
            </Button>
          </Link>

          <div className="text-center mb-16">
            <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              Service
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
              {service.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
              <h2 className="text-2xl md:text-3xl font-black mb-4">{service.benefitTitle}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">{service.benefitText}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-sm uppercase tracking-[0.3em] text-cyan-500 font-black mb-4">
                {service.valueTitle ?? "Mehrwert"}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {service.valueText}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-6">{service.positioningTitle}</h3>
              <p className="text-slate-300 leading-relaxed">{service.positioningText}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-6">{service.whyTitle}</h3>
              <ul className="space-y-3">
                {service.whyBullets?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold uppercase tracking-wider text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-6">{service.includesTitle}</h3>
              <ul className="space-y-3">
                {service.includesBullets?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold uppercase tracking-wider text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-6">{service.processTitle}</h3>
              <ol className="space-y-3">
                {service.processSteps?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold uppercase tracking-wider text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={service.ctaPrimaryLink}>
              <Button className="bg-white text-black hover:bg-cyan-500 hover:text-white text-base px-10 py-6 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105">
                {service.ctaPrimary} <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <Link to={service.ctaSecondaryLink}>
              <Button variant="outline" className="bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-cyan-500/50 text-base px-10 py-6 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105">
                {service.ctaSecondary} <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
