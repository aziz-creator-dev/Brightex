import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactModal } from "@/contexts/ContactModalContext";

const Footer = () => {
  const { t } = useLanguage();
  const { openModal } = useContactModal();

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.whereToBuy, href: "#where-to-buy" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.b2b, href: "#b2b" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const socials = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/21600000000",
      icon: (
        <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.782 6.86L2 30l7.338-1.742A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.34 19.36c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.104 1.364-.204.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.936-2.408-.204-.348-.022-.536.154-.71.158-.156.348-.406.522-.61.174-.204.232-.348.348-.58.116-.232.058-.436-.028-.61-.086-.174-.784-1.89-1.074-2.588-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.61.086-.928.434-.32.348-1.218 1.19-1.218 2.902s1.246 3.366 1.42 3.598c.174.232 2.452 3.742 5.942 5.248.83.358 1.478.572 1.982.732.832.264 1.59.226 2.188.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.32-.232-.668-.406z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-border/40">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <a href="#hero">
              <img src={logo} alt="Brightex" className="h-12 opacity-90 hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-[220px]">
              {t.hero.subtitle.split(".")[0]}.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg glass-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:glow-teal transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 rounded-full" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground mb-6">
              {t.contact.label}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground font-light">{t.contact.locationVal}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-primary mt-0.5 shrink-0" />
                <a href="mailto:contact@brightex.tn" className="text-sm text-muted-foreground font-light hover:text-primary transition-colors">
                  contact@brightex.tn
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-primary mt-0.5 shrink-0" />
                <a href="tel:+21600000000" className="text-sm text-muted-foreground font-light hover:text-primary transition-colors">
                  +216 XX XXX XXX
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground mb-6">
              {t.nav.b2b}
            </h4>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
              {t.b2b.subtitle.split(".")[0]}.
            </p>
            <button
              onClick={openModal}
              className="inline-block px-6 py-2.5 text-xs font-semibold tracking-widest uppercase bg-gradient-teal text-white rounded-lg hover:scale-105 hover:shadow-[0_0_25px_-5px_hsl(183_100%_33%/0.5)] transition-all duration-300"
            >
              {t.nav.getInTouch}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-muted-foreground/60 font-light">
          <span>© {new Date().getFullYear()} Brightex. {t.footer.rights}</span>
          <a
            href="https://develop-mark.tn/"
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-wide hover:text-primary transition-colors duration-200"
          >
            Developed by <span className="text-primary font-semibold">Develop Mark</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
