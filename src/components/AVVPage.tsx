
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";

export function AVVPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-section-y">
        <div className="container-x max-w-3xl">
          <a
            href="/#about"
            className="inline-flex items-center gap-2 text-sm text-slate2 hover:text-ink transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {/* @ts-ignore */}
            {t.legal.back_home}
          </a>

          {/* @ts-ignore */}
          <h1 className="font-display font-normal text-5xl lg:text-6xl text-ink tracking-tight leading-[1.05] mb-6">
            {t.legal.avv_title}
          </h1>

          <p className="font-display italic text-xl text-navy mb-12">
            {/* @ts-ignore */}
            {t.legal.avv_intro}
          </p>

          <div className="space-y-10">
            <section className="pt-8 border-t border-line first:pt-0 first:border-t-0">
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                {/* @ts-ignore */}
                {t.legal.avv_preamble_title}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                {/* @ts-ignore */}
                {t.legal.avv_preamble_text}
              </p>
            </section>

            <section className="pt-8 border-t border-line">
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                {/* @ts-ignore */}
                {t.legal.avv_parties_title}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                {/* @ts-ignore */}
                {t.legal.avv_parties_text}
              </p>
            </section>

            {Array.from({ length: 14 }).map((_, i) => {
              const index = i + 1;
              return (
                <section key={index} className="pt-8 border-t border-line">
                  <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                    {/* @ts-ignore */}
                    {t.legal[`avv_${index}_title`]}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                    {/* @ts-ignore */}
                    {t.legal[`avv_${index}_text`]}
                  </p>
                </section>
              );
            })}

            <section className="pt-8 border-t border-line">
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                {/* @ts-ignore */}
                {t.legal.avv_annex1_title}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                {/* @ts-ignore */}
                {t.legal.avv_annex1_text}
              </p>
            </section>

            <section className="pt-8 border-t border-line">
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                {/* @ts-ignore */}
                {t.legal.avv_annex2_title}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                {/* @ts-ignore */}
                {t.legal.avv_annex2_text}
              </p>
            </section>

            <section className="pt-8 border-t border-line">
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                {/* @ts-ignore */}
                {t.legal.avv_acceptance_title}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                {/* @ts-ignore */}
                {t.legal.avv_acceptance_text}
              </p>
            </section>

            <p className="pt-8 border-t border-line text-xs text-slate2">
              {/* @ts-ignore */}
              {t.legal.avv_stand}
            </p>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
