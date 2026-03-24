import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhySection from "@/components/WhySection";
import GenericSection from "@/components/GenericSection";
import WhereToBuySection from "@/components/WhereToBuySection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <WhereToBuySection />
      <GenericSection
        id="use"
        label={t.use.label}
        title={t.use.title}
        titleHighlight={t.use.titleHighlight}
        subtitle={t.use.subtitle}
      />
      <GenericSection
        id="download"
        label={t.download.label}
        title={t.download.title}
        titleHighlight={t.download.titleHighlight}
        subtitle={t.download.subtitle}
        dark
      />
      <FAQSection />
      <GenericSection
        id="b2b"
        label={t.b2b.label}
        title={t.b2b.title}
        titleHighlight={t.b2b.titleHighlight}
        subtitle={t.b2b.subtitle}
      />
      <WhySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
