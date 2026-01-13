import { useLanguage } from "../context/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();

  const navItems = [
    { name: t.header.nav.services, href: "#services" },
    { name: t.header.nav.references, href: "#references" },
    { name: t.header.nav.contact, href: "#contact" },
    { name: t.header.nav.about, href: "#about" },
  ];

  return (
    // WICHTIG: z-[100] damit sie immer über dem schwarzen Loch liegt
    <nav className="fixed top-0 left-0 w-full z-[100] bg-transparent py-6">
      <div className="container mx-auto px-6 flex items-center justify-around">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            // Text ist weiß und gut lesbar auf dem schwarzen Start-Hintergrund
            className="text-white/90 hover:text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs transition-all hover:scale-110 drop-shadow-md"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}