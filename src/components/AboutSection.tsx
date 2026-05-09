import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Person = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

export function AboutSection() {
  const { t } = useLanguage();

  const people: Person[] = [
    {
      id: "marco",
      name: "Marco Winistörfer",
      role: t.about.marco_role,
      image: "/about/wini.png",
      bio: t.about.team_details.marco.description,
    },
    {
      id: "till",
      name: "Till Schubiger",
      role: t.about.till_role,
      image: "/about/till.jpg",
      bio: t.about.team_details.till.description,
    },
  ];

  return (
    <section id="about" className="py-section-y border-t border-line">
      <div className="container-x">
        {/* head */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-16 sm:mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow mb-4">
              <span>— 03 / {t.about.title}</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight text-balance mb-7"
            >
              {t.about.mission_title}.{" "}
              <em className="not-italic font-display italic text-navy">
                {t.about.mission_text.replace(/\.$/, "")}.
              </em>
            </motion.h2>
          </div>
        </div>

        {/* team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {people.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <Link
                to={`/about/${p.id}`}
                className="group block bg-cloud-warm border border-line transition-all duration-500 ease-out-quart hover:border-ink overflow-hidden"
              >
                <div className="aspect-[5/4] overflow-hidden bg-cloud-deep relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.04] gpu"
                  />
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-normal text-2xl sm:text-3xl text-ink leading-tight tracking-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs uppercase tracking-eyebrow font-semibold text-navy mt-2">
                        {p.role}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-ink shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="text-slate2 text-[15px] leading-relaxed text-pretty">
                    {p.bio}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
