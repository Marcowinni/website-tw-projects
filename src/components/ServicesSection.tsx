import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";

type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
};

export function ServicesSection() {
  const { t } = useLanguage();

  // pull all configured detail services in declared order
  const detailKeys = Object.keys(t.servicesDetail || {});
  const items: ServiceItem[] = detailKeys.map((id) => {
    // @ts-ignore — dynamic locale key access
    const d = t.servicesDetail[id];
    return {
      id,
      title: d.title,
      tagline: d.tagline ?? d.subtitle?.split("\n")[0] ?? "",
    };
  });

  return (
    <section id="services" className="py-section-y border-t border-line">
      <div className="container-x">
        {/* head */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-16 sm:mb-20">
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <div className="eyebrow mb-4">
              <span>— 01 / Leistungen</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight text-balance"
            >
              {t.services.title}.{" "}
              <em className="not-italic font-display italic text-navy">
                Drei Disziplinen
              </em>
              , ein messbares Resultat.
            </motion.h2>
          </div>
        </div>

        {/* list */}
        <div className="border-t border-ink">
          {items.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className="border-b border-line group"
            >
              <a
                href={`/services/${svc.id}`}
                className="grid grid-cols-12 gap-x-6 lg:gap-x-10 py-8 lg:py-10 items-start transition-all duration-500 ease-out-quart hover:bg-cloud-warm hover:px-3 -mx-0 hover:-mx-3"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-display italic text-sm text-slate2">
                    N° 0{i + 1}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-xl sm:text-2xl font-medium text-ink tracking-tight leading-snug">
                    {svc.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-5 mt-3 md:mt-1.5">
                  <p className="text-slate2 text-[15px] leading-relaxed text-pretty">
                    {svc.tagline}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 mt-4 md:mt-1.5 flex md:justify-end">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink border-b border-ink pb-0.5 transition-all duration-300 group-hover:gap-2.5">
                    Details
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
