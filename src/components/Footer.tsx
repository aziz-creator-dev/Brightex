import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 py-16 bg-gradient-dark">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logo} alt="Brightex" className="h-10 opacity-80 hover:opacity-100 transition-opacity" />
            <p className="text-xs text-muted-foreground font-light">
              {t.footer.rights}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground font-light tracking-wider mb-2">
              © {new Date().getFullYear()} Brightex
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">
              The Art of Automotive Shine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
