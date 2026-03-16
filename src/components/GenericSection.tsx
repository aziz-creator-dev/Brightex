import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GenericSectionProps {
  id: string;
  label: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  dark?: boolean;
}

const GenericSection = ({ id, label, title, titleHighlight, subtitle, dark }: GenericSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} className={`py-32 md:py-40 ${dark ? "bg-gradient-dark" : ""} relative overflow-hidden`}>
      {!dark && <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />}
      <div className="container mx-auto px-4 md:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">
            {label}
          </span>
          <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-6">
            {title} <span className="text-gradient font-bold">{titleHighlight}</span>
          </h2>
          <div className="h-[3px] w-20 bg-gradient-teal mx-auto mb-10 rounded-full" />
          <p className="text-muted-foreground font-light leading-relaxed text-lg">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GenericSection;
