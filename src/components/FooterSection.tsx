import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function FooterSection() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cloud border-t border-line">
      <div className="container-x py-16 sm:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-10">
          {/* brand */}
          <div className="col-span-12 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group" aria-label="TW Services Startseite">
              <img src="/logo.png" alt="" className="h-9 w-auto" />
              <span className="font-semibold text-ink tracking-tight">TW Services</span>
            </Link>
            <p className="text-slate2 text-[15px] leading-relaxed max-w-md mb-8">
              {t.footer.description}
            </p>
            <a
              href="/#contact"
              className="btn btn-primary group"
            >
              {t.header.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            {/* sister company cross-link */}
            <a
              href="https://www.tw-p.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block group border-t border-line pt-6 hover:border-ink transition-colors duration-300"
            >
              <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-navy mb-2">
                TW Projects · Schwesterunternehmen
              </div>
              <div className="flex items-start gap-4">
                <p className="font-display italic text-lg text-ink leading-snug max-w-md flex-1">
                  Möchten Sie Ihre Geschäftsprozesse mit KI effizienter gestalten?
                </p>
                <ArrowUpRight className="w-5 h-5 text-ink shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate2 group-hover:text-ink transition-colors">
                <span>Automation &amp; KI-Workflows entdecken auf</span>
                <span className="font-medium text-ink underline underline-offset-2 decoration-line group-hover:decoration-ink">
                  tw-p.ch
                </span>
              </div>
            </a>
          </div>

          {/* nav */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-eyebrow font-semibold text-ink mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-sm text-slate2 hover:text-ink transition-colors">{t.header.nav.services}</a></li>
              <li><a href="/#references" className="text-sm text-slate2 hover:text-ink transition-colors">{t.header.nav.references}</a></li>
              <li><a href="/#about" className="text-sm text-slate2 hover:text-ink transition-colors">{t.header.nav.about}</a></li>
              <li><a href="/#contact" className="text-sm text-slate2 hover:text-ink transition-colors">{t.header.nav.contact}</a></li>
            </ul>
          </div>

          {/* contact */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-eyebrow font-semibold text-ink mb-5">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-slate2">
              <li>
                <a href="mailto:info@tw-services.ch" className="hover:text-ink transition-colors inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> info@tw-services.ch
                </a>
              </li>
              <li>
                <a href="tel:+41799432630" className="hover:text-ink transition-colors inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> +41 79 943 26 30
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-slate2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Dürnten, Schweiz</span>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-eyebrow font-semibold text-ink mb-5">
              {t.footer.company}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/impressum" className="text-slate2 hover:text-ink transition-colors">{t.footer.links.imprint}</Link></li>
              <li><Link to="/agb" className="text-slate2 hover:text-ink transition-colors">{t.footer.links.terms}</Link></li>
            </ul>
          </div>
        </div>

        <div className="rule my-12" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate2">
          <p>© {year} TW Projects GmbH. {t.footer.rights}</p>
          <p className="flex items-center gap-1.5">
            <span className="font-display italic">Handmade in Switzerland</span>
            <span aria-hidden>·</span>
            <span>Dürnten ZH</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
