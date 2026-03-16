import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage, Lang } from "@/contexts/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const langLabels: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.whereToBuy, href: "#where-to-buy" },
    { label: t.nav.use, href: "#use" },
    { label: t.nav.download, href: "#download" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.b2b, href: "#b2b" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/98 backdrop-blur-2xl border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6 lg:px-8">
        <a href="#hero" className="flex items-center group">
          <img src={logo} alt="Brightex" className="h-8 md:h-10 group-hover:scale-105 transition-transform duration-300" />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-teal group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop right: theme + lang + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors px-3 py-2 border border-border/50 rounded-sm"
            >
              {langLabels[lang]}
              <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full mt-1 right-0 bg-card border border-border rounded-sm overflow-hidden min-w-[60px]"
                >
                  {(["en", "fr", "ar"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`block w-full px-4 py-2 text-xs tracking-wider uppercase text-start hover:bg-primary/10 transition-colors ${
                        lang === l ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            className="px-6 py-2.5 text-[11px] font-semibold tracking-wider uppercase bg-gradient-teal text-primary-foreground rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(183_100%_33%/0.5)]"
          >
            {t.nav.getInTouch}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile lang */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-xs text-muted-foreground px-2 py-1 border border-border/50 rounded-sm"
            >
              {langLabels[lang]}
              <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full mt-1 right-0 bg-card border border-border rounded-sm overflow-hidden min-w-[50px] z-50"
                >
                  {(["en", "fr", "ar"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`block w-full px-3 py-2 text-xs text-start hover:bg-primary/10 ${
                        lang === l ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="flex flex-col items-center gap-5 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-light tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
