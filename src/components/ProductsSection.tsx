import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Unsplash free-to-use images (Unsplash License)
// Sources: unsplash.com — wTW51lUpC6k, yeMjSP7UGlo, 3xMh75vtYtc, 8Cxroj1LoaA
const IMG = {
  padsHero: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&q=80",
  compounding: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
  polishing: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80",
  finishing: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
};

const ProductsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"pads" | "process">("pads");
  const [activeFoam, setActiveFoam] = useState(0);

  const foamTypes = [
    { label: t.products.heavyCut },
    { label: t.products.mediumCut },
    { label: t.products.softFoam },
  ];

  const categories = [
    {
      title: t.products.compounding,
      description: t.products.compoundingDesc,
      step: "01",
      img: IMG.compounding,
    },
    {
      title: t.products.polishing,
      description: t.products.polishingDesc,
      step: "02",
      img: IMG.polishing,
    },
    {
      title: t.products.finishing,
      description: t.products.finishingDesc,
      step: "03",
      img: IMG.finishing,
    },
  ];

  return (
    <section id="products" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full">
            {t.products.label}
          </span>
          <h2 className="text-4xl md:text-6xl font-extralight mt-6 mb-6">
            {t.products.titleStart}{" "}
            <span className="text-gradient font-bold">{t.products.titleHighlight}</span>
          </h2>
          <div className="h-[3px] w-20 bg-gradient-teal mx-auto rounded-full" />
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="glass-card inline-flex rounded-2xl p-1.5 gap-1">
            {(["pads", "process"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-teal text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "pads" ? t.products.padsLabel : t.products.processLabel}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── POLISHING PADS ── */}
          {activeTab === "pads" && (
            <motion.div
              key="pads"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              {/* Left: image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src={IMG.padsHero}
                  alt="Polishing pads"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs tracking-[0.3em] uppercase text-primary font-semibold px-3 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                    {t.products.padsLabel}
                  </span>
                </div>
              </div>

              {/* Right: foam selector + variants */}
              <div>
                {/* Foam type tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                  {foamTypes.map((foam, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFoam(i)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                        activeFoam === i
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {foam.label}
                    </button>
                  ))}
                </div>

                {/* Active foam variants */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFoam}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="glass-card rounded-2xl overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-border/50">
                      <h4 className="font-semibold text-foreground">{foamTypes[activeFoam].label}</h4>
                    </div>
                    <ul className="divide-y divide-border/40">
                      {t.products.padVariants.map((variant, j) => (
                        <li key={j} className="flex items-center justify-between px-6 py-4 group hover:bg-primary/5 transition-colors">
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{variant}</span>
                          <span className="text-xs font-mono text-primary opacity-60">✓</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── APPLICATION PROCESS ── */}
          {activeTab === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden grid md:grid-cols-[280px_1fr] hover:border-primary/30 hover:glow-teal transition-all duration-500 group"
                >
                  {/* Image */}
                  <div className="relative h-48 md:h-auto overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:hidden" />
                    {/* Step badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                      <span className="text-sm font-black text-primary">{cat.step}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <div className="space-y-2">
                      {cat.description.split("\n").map((line, j) =>
                        line.startsWith("•") ? (
                          <div key={j} className="flex items-center gap-2.5 text-sm font-semibold text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {line.replace("• ", "")}
                          </div>
                        ) : (
                          <p key={j} className="text-sm text-muted-foreground font-light leading-relaxed">{line}</p>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductsSection;
