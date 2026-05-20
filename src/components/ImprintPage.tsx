
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";

export function ImprintPage() {
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
          <h1 className="font-display font-normal text-5xl lg:text-6xl text-ink tracking-tight leading-[1.05] mb-12">
            {t.legal.imprint_title}
          </h1>

          <div className="space-y-10 text-slate2">
            <section>
              {/* @ts-ignore */}
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">Anbieter</h2>
              {/* @ts-ignore */}
              <p className="text-ink font-medium text-lg mb-1">{t.legal.company_name}</p>
              {/* @ts-ignore */}
              <p>{t.legal.address_line1}</p>
              {/* @ts-ignore */}
              <p>{t.legal.address_line2}</p>
            </section>

            <section className="pt-8 border-t border-line">
              {/* @ts-ignore */}
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">{t.legal.contact_title}</h2>
              {/* @ts-ignore */}
              <p>E-Mail: <a className="text-ink hover:underline" href={`mailto:${t.legal.email}`}>{t.legal.email}</a></p>
            </section>

            <section className="pt-8 border-t border-line">
              {/* @ts-ignore */}
              <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">{t.legal.disclaimer_title}</h2>
              {/* @ts-ignore */}
              <p className="text-[15px] leading-relaxed whitespace-pre-line">{t.legal.disclaimer_text}</p>
            </section>

            {/* @ts-ignore */}
            {t.legal.links_title && (
              <section className="pt-8 border-t border-line">
                {/* @ts-ignore */}
                <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">{t.legal.links_title}</h2>
                {/* @ts-ignore */}
                <p className="text-[15px] leading-relaxed">{t.legal.links_text}</p>
              </section>
            )}

            {/* @ts-ignore */}
            {t.legal.copyright_title && (
              <section className="pt-8 border-t border-line">
                {/* @ts-ignore */}
                <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">{t.legal.copyright_title}</h2>
                {/* @ts-ignore */}
                <p className="text-[15px] leading-relaxed">{t.legal.copyright_text}</p>
              </section>
            )}
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
