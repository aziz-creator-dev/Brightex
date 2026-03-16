import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const products = [
    { title: t.products.polishingPads, description: t.products.polishingPadsDesc, icon: "◉" },
    { title: t.products.cuttingCompounds, description: t.products.cuttingCompoundsDesc, icon: "◈" },
    { title: t.products.finishingAccessories, description: t.products.finishingAccessoriesDesc, icon: "◇" },
    { title: t.products.surfaceProtection, description: t.products.surfaceProtectionDesc, icon: "◆" },
  ];

  return (
    <section id="products" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">{t.products.label}</span>
          <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-6">
            {t.products.titleStart} <span className="text-gradient font-bold">{t.products.titleHighlight}</span>
          </h2>
          <div className="h-[3px] w-20 bg-gradient-teal mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }} 
              className="group glass-card p-10 rounded-2xl hover:glow-teal transition-all duration-500 hover:border-primary/40 hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="text-5xl text-primary mb-8 group-hover:scale-125 transition-transform duration-500">{product.icon}</div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{product.description}</p>
                <div className="mt-8 h-[2px] w-0 group-hover:w-full bg-gradient-teal transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
