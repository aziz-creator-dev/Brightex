import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const items = [
    { icon: MapPin, title: t.contact.location, info: t.contact.locationVal },
    { icon: Mail, title: t.contact.email, info: "contact@brightex.tn" },
    { icon: Phone, title: t.contact.phone, info: "+216 XX XXX XXX" },
  ];

  return (
    <section id="contact" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">{t.contact.label}</span>
          <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-6">
            {t.contact.titleStart} <span className="text-gradient font-bold">{t.contact.titleHighlight}</span>
          </h2>
          <div className="h-[3px] w-20 bg-gradient-teal mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }} 
              className="glass-card p-10 rounded-2xl text-center hover:glow-teal transition-all duration-500 group hover:scale-105 hover:border-primary/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="inline-flex p-5 bg-primary/10 rounded-2xl text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.info}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
