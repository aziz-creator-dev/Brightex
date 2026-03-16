import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    { value: "2007", label: t.about.statFounded },
    { value: "18+", label: t.about.statYears },
    { value: "15+", label: t.about.statCountries },
    { value: "100%", label: t.about.statQuality },
  ];

  return (
    <section id="about" className="py-32 md:py-40 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">{t.about.label}</span>
            <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-8 leading-tight">
              {t.about.titleLine1}<br />
              <span className="text-gradient font-bold">{t.about.titleLine2}</span>
            </h2>
            <div className="h-[3px] w-20 bg-gradient-teal mb-10 rounded-full" />
            <p className="text-muted-foreground font-light leading-relaxed mb-6 text-lg">{t.about.p1}</p>
            <p className="text-muted-foreground font-light leading-relaxed text-lg">{t.about.p2}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                animate={inView ? { opacity: 1, y: 0 } : {}} 
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} 
                className="glass-card p-10 rounded-2xl text-center hover:glow-teal transition-all duration-500 group hover:scale-105 hover:border-primary/40"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-3 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
