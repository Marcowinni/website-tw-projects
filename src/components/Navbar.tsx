import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const navItems = [
    { name: t.header.nav.services, href: "/#services" },
    { name: t.header.nav.references, href: "/#references" },
    { name: t.header.nav.about, href: "/#about" },
    { name: t.header.nav.contact, href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-quart ${
        scrolled
          ? "bg-cloud/85 backdrop-blur-md border-b border-line"
          : "bg-cloud/0 border-b border-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="TW Services Startseite">
          <img
            src="/logo.png"
            alt="TW Services"
            className="h-9 w-auto transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
          <span className="font-semibold text-ink tracking-tight text-[15px] hidden sm:inline-block">
            TW Services
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate2 hover:text-ink transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-ink text-cloud px-5 py-2.5 text-[13px] font-medium rounded-full hover:bg-navy transition-all duration-300 ease-out-quart"
          >
            {t.header.cta}
            <span aria-hidden>→</span>
          </a>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out-quart border-t ${
          open ? "max-h-96 opacity-100 border-line" : "max-h-0 opacity-0 border-transparent"
        } bg-cloud`}
      >
        <nav className="container-x py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium text-ink py-3 border-b border-line-soft hover:text-navy transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="/#contact"
            className="mt-3 inline-flex items-center justify-center gap-2 bg-ink text-cloud px-5 py-3.5 text-sm font-medium rounded-full"
          >
            {t.header.cta} <span aria-hidden>→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
