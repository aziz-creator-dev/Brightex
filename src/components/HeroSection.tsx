import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90">
          <source src="https://videos.pexels.com/video-files/5538223/5538223-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[3px] bg-gradient-teal mb-8 rounded-full"
          />
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.05] mb-8 tracking-tight">
            {t.hero.titleLine1}
            <br />
            <span className="text-gradient font-bold">{t.hero.titleLine2}</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl font-light text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-5"
          >
            <a href="#products" className="group px-10 py-4 text-sm font-semibold tracking-wider uppercase bg-gradient-teal text-primary-foreground rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(183_100%_33%/0.6)] relative overflow-hidden">
              <span className="relative z-10">{t.hero.exploreProducts}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#about" className="px-10 py-4 text-sm font-semibold tracking-wider uppercase border-2 border-primary/50 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {t.hero.ourStory}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-medium">{t.hero.scroll}</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 border-2 border-current rounded-full group-hover:border-primary"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
