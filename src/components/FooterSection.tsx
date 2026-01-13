import { Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer className="relative text-slate-400 font-sans bg-transparent py-24 border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
               <img src="/logo.png" className="h-10 w-auto" alt="Logo" />
               <span className="text-2xl font-black text-white tracking-tighter">TW PROJECTS</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">{t.footer.company}</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/impressum" className="hover:text-cyan-500 transition-colors">{t.footer.links.imprint}</Link></li>
              <li><Link to="/agb" className="hover:text-cyan-500 transition-colors">{t.footer.links.terms}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Kontakt</h4>
            <div className="flex gap-3 items-center text-sm font-bold uppercase tracking-widest">
              <Mail className="w-4 h-4 text-cyan-500" />
              <a href="mailto:info@twprojects.ch" className="hover:text-white transition-colors">tillandwin@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          <p>&copy; {new Date().getFullYear()} TW Projects GmbH. {t.footer.rights}</p>
          <p>Handmade in Switzerland</p>
        </div>
      </div>
    </footer>
  );
}