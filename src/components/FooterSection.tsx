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

            {/* sister site cross-link */}
            <a
              href="https://www.tw-p.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-start gap-3 max-w-md group border-t border-line pt-6 hover:border-ink transition-colors duration-300"
            >
              <span className="text-[10px] uppercase tracking-eyebrow font-semibold text-navy mt-1 shrink-0">
                Schwesterseite
              </span>
              <span className="flex-1">
                <span className="block font-display italic text-base text-ink leading-snug">
                  TW Projects — Automation &amp; KI-Prozesse
                </span>
                <span className="block text-xs text-slate2 mt-0.5">
                  www.tw-p.ch
                </span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-ink shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                <a href="mailto:tillandwin@gmail.com" className="hover:text-ink transition-colors inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> tillandwin@gmail.com
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
