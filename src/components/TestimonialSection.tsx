import { TestimonialCarousel } from "./ui/testimonial";
import { useLanguage } from "../context/LanguageContext";

export function TestimonialSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-transparent py-40 overflow-hidden text-white border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Feedback</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            {t.testimonials.title}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
            <TestimonialCarousel testimonials={t.testimonials.items} />
            <div className="text-center mt-12 text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                &larr; {t.testimonials.swipeHint} &rarr;
            </div>
        </div>
      </div>
    </section>
  );
}