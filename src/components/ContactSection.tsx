import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const contact = {
  email: "info@tw-services.ch",
  phone: "+41 79 943 26 30",
  whatsappLink: "https://wa.me/41799432630",
};

type Channel = {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  meta: string;
};

export function ContactSection() {
  const { t } = useLanguage();

  const channels: Channel[] = [
    {
      icon: Mail,
      label: t.kontakt.email_label,
      value: contact.email,
      href: `mailto:${contact.email}`,
      meta: "Antwort innert 24 Stunden",
    },
    {
      icon: Phone,
      label: t.kontakt.phone_label,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      meta: "Mo–Fr · 09–18 Uhr",
    },
    {
      icon: MessageCircle,
      label: t.kontakt.whatsapp_label,
      value: "WhatsApp Chat starten",
      href: contact.whatsappLink,
      meta: "Schnellster Weg",
    },
  ];

  return (
    <section id="contact" className="py-section-y bg-ink text-cloud">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-12">
          {/* head */}
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow text-cloud/70 mb-6">
              <span className="text-cloud/70">— 04 / Kontakt</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance mb-6"
            >
              {t.kontakt.title.replace("?", "")}
              {" "}<em className="not-italic font-display italic text-navy-300">
                Sprechen wir.
              </em>
            </motion.h2>
            <p className="text-cloud/70 text-lg leading-relaxed max-w-prose-lg mb-10">
              {t.kontakt.subtitle}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-cloud/10">
                <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-cloud/60 shrink-0 w-24 pt-1">
                  Erstgespräch
                </div>
                <p className="text-cloud/90 text-[15px] leading-relaxed">
                  15–30 Minuten, kostenfrei. Wir analysieren Ihren Vermarktungs-Status und zeigen, was mit KI-Bewegtbild realistisch erreichbar ist.
                </p>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-cloud/10">
                <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-cloud/60 shrink-0 w-24 pt-1">
                  Ablauf
                </div>
                <p className="text-cloud/90 text-[15px] leading-relaxed">
                  Briefing → Story &amp; Skript → Produktion → Übergabe. 14 Tage von Kick-off zur Auslieferung.
                </p>
              </div>
              <div className="flex items-start gap-4 pb-4">
                <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-cloud/60 shrink-0 w-24 pt-1">
                  Standort
                </div>
                <p className="text-cloud/90 text-[15px] leading-relaxed">
                  Dürnten, Schweiz · Produktion DACH-weit.
                </p>
              </div>
            </div>
          </div>

          {/* channels */}
          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <div className="space-y-3">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="group block border border-cloud/15 hover:border-cloud transition-all duration-500 ease-out-quart relative overflow-hidden"
                >
                  <div className="grid grid-cols-12 gap-x-4 items-center px-5 sm:px-7 py-6 sm:py-8 relative z-10">
                    <div className="col-span-2 sm:col-span-1">
                      <c.icon className="w-5 h-5 text-cloud/80 group-hover:text-cloud transition-colors" />
                    </div>
                    <div className="col-span-10 sm:col-span-4">
                      <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-cloud/60 mb-1.5">
                        {c.label}
                      </div>
                      <div className="text-cloud font-medium text-base sm:text-lg break-all">
                        {c.value}
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-5 mt-2 sm:mt-0 text-cloud/60 text-sm">
                      {c.meta}
                    </div>
                    <div className="col-span-12 sm:col-span-2 flex sm:justify-end mt-3 sm:mt-0">
                      <ArrowUpRight className="w-5 h-5 text-cloud transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  {/* hover fill */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-cloud/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.a>
              ))}
            </div>

            {/* WhatsApp QR */}
            <div className="mt-8 flex items-center gap-5 p-5 border border-cloud/15 bg-cloud/[0.03]">
              <img
                src="/whatsapp-qr.png"
                alt="WhatsApp QR-Code"
                className="w-20 h-20 sm:w-24 sm:h-24 bg-cloud p-1.5 shrink-0 object-contain"
              />
              <div>
                <div className="text-[10px] uppercase tracking-eyebrow font-semibold text-cloud/60 mb-1">
                  {t.kontakt.whatsapp_label}
                </div>
                <p className="text-cloud/90 text-sm leading-relaxed">
                  Code mit Ihrer Smartphone-Kamera scannen — Chat öffnet sich direkt in WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
