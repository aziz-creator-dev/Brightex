import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Factory, Globe, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const reasons = [
    { icon: Factory, title: t.why.manufacturing, description: t.why.manufacturingDesc },
    { icon: Shield, title: t.why.quality, description: t.why.qualityDesc },
    { icon: Globe, title: t.why.regional, description: t.why.regionalDesc },
    { icon: Handshake, title: t.why.partnerships, description: t.why.partnershipsDesc },
  ];

  return (
    <section id="why" className="py-32 md:py-40 bg-gradient-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="lg:sticky lg:top-32">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">{t.why.label}</span>
            <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-8 leading-tight">
              {t.why.titleLine1}<br />
              <span className="text-gradient font-bold">{t.why.titleLine2}</span>
            </h2>
            <div className="h-[3px] w-20 bg-gradient-teal mb-10 rounded-full" />
            <p className="text-muted-foreground font-light leading-relaxed max-w-md text-lg">{t.why.subtitle}</p>
          </motion.div>

          <div className="space-y-8">
            {reasons.map((reason, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 40 }} 
                animate={inView ? { opacity: 1, x: 0 } : {}} 
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }} 
                className="group glass-card p-10 rounded-2xl flex gap-8 items-start hover:glow-teal transition-all duration-500 hover:border-primary/40 hover:scale-[1.02] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10 p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <reason.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
