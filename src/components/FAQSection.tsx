import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
  ];

  return (
    <section id="faq" className="py-32 md:py-40 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">{t.faq.label}</span>
          <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-6">
            {t.faq.title} <span className="text-gradient font-bold">{t.faq.titleHighlight}</span>
          </h2>
          <div className="h-[3px] w-20 bg-gradient-teal mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:glow-teal"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-start group"
              >
                <span className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors pr-4">{faq.q}</span>
                <div className={`p-2 rounded-full bg-primary/10 text-primary shrink-0 transition-all duration-300 ${
                  openIndex === i ? "rotate-180 bg-primary text-primary-foreground" : "group-hover:bg-primary/20"
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === i ? "max-h-60 pb-8 px-8" : "max-h-0"
                }`}
              >
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
