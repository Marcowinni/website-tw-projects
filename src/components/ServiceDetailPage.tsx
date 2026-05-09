import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";

type Phase = {
  label: string;
  title: string;
  subtitle: string;
  intro: string;
  bullets: string[];
};

export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  // @ts-ignore
  const service = t.servicesDetail?.[id as string];

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="pt-40 pb-section-y container-x">
          <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-slate2 hover:text-ink mb-10">
            <ArrowLeft className="w-4 h-4" /> Zurück
          </Link>
          <h1 className="font-display text-4xl text-ink">Service nicht gefunden.</h1>
        </main>
        <FooterSection />
      </>
    );
  }

  const phases: Phase[] | undefined = service.phases;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-section-y">
        <div className="container-x max-w-content">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-sm text-slate2 hover:text-ink transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Zurück zu Services
          </Link>

          {/* hero */}
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-16 sm:mb-20">
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow"><span>Service</span></div>
              {service.tagline && (
                <p className="font-display italic text-base text-navy mt-3">
                  {service.tagline}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-9 mt-3 md:mt-0">
              <h1 className="font-display font-normal text-5xl lg:text-7xl text-ink leading-[1.0] tracking-tight text-balance mb-6">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate2 leading-relaxed max-w-prose-lg whitespace-pre-line">
                {service.subtitle}
              </p>
            </div>
          </div>

          {/* benefit + value */}
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-10 mb-16">
            <div className="col-span-12 lg:col-span-7 border border-line bg-cloud-warm p-8 sm:p-10">
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-5">
                {service.benefitTitle}
              </h2>
              <p className="font-display font-normal text-2xl sm:text-3xl text-ink leading-snug tracking-tight whitespace-pre-line">
                {service.benefitText}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 p-8 sm:p-10 border border-line">
              <h3 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-5">
                {service.valueTitle ?? "Mehrwert"}
              </h3>
              <p className="text-slate2 text-[15px] leading-relaxed whitespace-pre-line">
                {service.valueText}
              </p>
            </div>
          </div>

          {/* positioning + why */}
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-10 mb-16">
            <div className="col-span-12 lg:col-span-6">
              <h3 className="font-display font-normal text-2xl sm:text-3xl text-ink mb-5 tracking-tight">
                {service.positioningTitle}
              </h3>
              <p className="text-slate2 text-[15px] leading-relaxed whitespace-pre-line">
                {service.positioningText}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <h3 className="font-display font-normal text-2xl sm:text-3xl text-ink mb-6 tracking-tight">
                {service.whyTitle}
              </h3>
              <ul className="space-y-3">
                {service.whyBullets?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] uppercase tracking-eyebrow font-semibold text-ink">
                    <Check className="w-4 h-4 text-navy shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* phases (Time-to-Sell) OR includes+process (other services) */}
          {phases ? (
            <div className="mb-20">
              <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-12">
                <div className="col-span-12 md:col-span-4">
                  <div className="eyebrow"><span>So funktioniert das System</span></div>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-7 mt-3 md:mt-0">
                  <h2 className="font-display font-normal text-3xl sm:text-4xl text-ink leading-[1.1] tracking-tight text-balance">
                    Zwei Phasen.{" "}
                    <em className="not-italic font-display italic text-navy">
                      Setup und laufende Betreuung.
                    </em>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {phases.map((p, i) => (
                  <article
                    key={p.title}
                    className={`border border-line p-8 sm:p-10 ${i === 0 ? "bg-cloud-warm" : "bg-cloud"}`}
                  >
                    <div className="font-display italic text-sm text-navy mb-3">
                      {p.label}
                    </div>
                    <h3 className="font-display font-normal text-3xl text-ink leading-tight tracking-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs uppercase tracking-eyebrow font-semibold text-slate2 mb-6">
                      {p.subtitle}
                    </p>
                    <p className="text-[15px] text-slate2 leading-relaxed mb-8">
                      {p.intro}
                    </p>
                    <div className="pt-6 border-t border-line">
                      <h4 className="text-[10px] uppercase tracking-eyebrow font-semibold text-ink mb-4">
                        Leistungsumfang
                      </h4>
                      <ul className="space-y-3">
                        {p.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-[14px] text-ink leading-snug">
                            <Check className="w-4 h-4 text-navy shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-10 mb-20">
              <div className="col-span-12 lg:col-span-6 bg-cloud-warm border border-line p-8 sm:p-10">
                <h3 className="font-display font-normal text-2xl text-ink mb-6 tracking-tight">
                  {service.includesTitle}
                </h3>
                <ul className="space-y-3.5">
                  {service.includesBullets?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-[13px] uppercase tracking-eyebrow font-semibold text-ink">
                      <Check className="w-4 h-4 text-navy shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-12 lg:col-span-6 p-8 sm:p-10 border border-line">
                <h3 className="font-display font-normal text-2xl text-ink mb-6 tracking-tight">
                  {service.processTitle}
                </h3>
                <ol className="space-y-4">
                  {service.processSteps?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-[13px] uppercase tracking-eyebrow font-semibold text-ink">
                      <span className="font-display italic text-navy text-base shrink-0">
                        0{i + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="border-t border-line pt-12 flex flex-col sm:flex-row gap-4">
            <Link to={service.ctaPrimaryLink} className="btn btn-primary group">
              {service.ctaPrimary}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to={service.ctaSecondaryLink} className="btn btn-ghost group">
              {service.ctaSecondary}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
