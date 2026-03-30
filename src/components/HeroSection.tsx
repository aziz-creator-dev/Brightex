import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Orbital polisher on car — directly matches Brightex's product activity */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6) saturate(1.15) contrast(1.05)" }}
        >
          <source
            src="https://videos.pexels.com/video-files/6870338/6870338-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          {/* Fallback: buffing car paint */}
          <source
            src="https://videos.pexels.com/video-files/4822920/4822920-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Heavy left scrim — guarantees white text over video in any theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

        {/* Bottom fade into page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Teal brand shimmer — ties into Brightex color */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, hsl(183 100% 40% / 0.12), transparent 70%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.05] mb-8 tracking-tight text-white">
            {t.hero.titleLine1}
            <br />
            <span className="text-gradient font-bold">{t.hero.titleLine2}</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl font-light text-white/75 max-w-2xl mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-5"
          >
            <a href="#products" className="group px-10 py-4 text-sm font-semibold tracking-wider uppercase bg-gradient-teal text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_-5px_hsl(183_100%_33%/0.6)] relative overflow-hidden">
              <span className="relative z-10">{t.hero.exploreProducts}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#about" className="px-10 py-4 text-sm font-semibold tracking-wider uppercase border-2 border-white/50 text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg">
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer group"
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
