
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import { Navbar } from "./Navbar";
import { FooterSection } from "./FooterSection";

export function PrivacyPage() {
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
            {t.legal.privacy_title}
          </h1>

          <p className="font-display italic text-xl text-navy mb-12">
            {/* @ts-ignore */}
            {t.legal.privacy_intro}
          </p>

          <div className="space-y-10">
            {Array.from({ length: 17 }).map((_, i) => {
              const index = i + 1;
              return (
                <section key={index} className="pt-8 border-t border-line first:pt-0 first:border-t-0">
                  <h2 className="text-xs uppercase tracking-eyebrow font-semibold text-navy mb-3">
                    {/* @ts-ignore */}
                    {t.legal[`privacy_${index}_title`]}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-slate2 whitespace-pre-line">
                    {/* @ts-ignore */}
                    {t.legal[`privacy_${index}_text`]}
                  </p>
                </section>
              );
            })}
          </div>

          <p className="mt-12 pt-8 border-t border-line text-xs text-slate2">
            {/* @ts-ignore */}
            {t.legal.privacy_stand}
          </p>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
