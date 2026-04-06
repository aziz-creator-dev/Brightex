import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "fr" | "ar";

type Translations = {
  nav: {
    home: string;
    about: string;
    products: string;
    whereToBuy: string;
    use: string;
    download: string;
    faq: string;
    b2b: string;
    contact: string;
    getInTouch: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreProducts: string;
    ourStory: string;
    scroll: string;
  };
  about: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    p1: string;
    p2: string;
    statFounded: string;
    statYears: string;
    statCountries: string;
    statQuality: string;
  };
  products: {
    label: string;
    titleStart: string;
    titleHighlight: string;
    padsLabel: string;
    processLabel: string;
    heavyCut: string;
    mediumCut: string;
    softFoam: string;
    padVariants: string[];
    compounding: string;
    compoundingDesc: string;
    polishing: string;
    polishingDesc: string;
    finishing: string;
    finishingDesc: string;
  };
  why: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    manufacturing: string;
    manufacturingDesc: string;
    quality: string;
    qualityDesc: string;
    regional: string;
    regionalDesc: string;
    partnerships: string;
    partnershipsDesc: string;
  };
  whereToBuy: {
    label: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  use: {
    label: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  download: {
    label: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  faq: {
    label: string;
    title: string;
    titleHighlight: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  b2b: {
    label: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  contact: {
    label: string;
    titleStart: string;
    titleHighlight: string;
    location: string;
    locationVal: string;
    email: string;
    phone: string;
  };
  footer: {
    rights: string;
  };
};

const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      whereToBuy: "Where To Find Us",
      use: "Use",
      download: "Download",
      faq: "FAQ",
      b2b: "B2B",
      contact: "Contact",
      getInTouch: "Get in Touch",
    },
    hero: {
      titleLine1: "The Art of",
      titleLine2: "Automotive Shine",
      subtitle: "Nearly two decades of manufacturing excellence in high-performance polishing pads and surface finishing accessories.",
      exploreProducts: "Explore Products",
      ourStory: "Our Story",
      scroll: "Scroll",
    },
    about: {
      label: "About Brightex",
      titleLine1: "Manufacturing",
      titleLine2: "Excellence",
      p1: "Founded in 2007 and based in Tunisia, Brightex brings nearly two decades of manufacturing expertise in high-performance polishing pads and surface finishing accessories. Through controlled production processes and strict quality standards, we deliver durable, reliable solutions trusted by professionals across North Africa and the Middle East.",
      p2: "Our long-standing market presence reflects our commitment to consistency, technical excellence, and long-term partnerships.",
      statFounded: "Founded",
      statYears: "Years Experience",
      statCountries: "Countries Served",
      statQuality: "Quality Certified",
    },
    products: {
      label: "Our Products",
      titleStart: "Engineered for",
      titleHighlight: "Performance",
      padsLabel: "Polishing Pads",
      processLabel: "Application Process",
      heavyCut: "Heavy Cut Foam",
      mediumCut: "Medium Cut Foam",
      softFoam: "Soft Foam",
      padVariants: [
        "50 mm – Plastic Holder",
        "50 mm – Velcro",
        "30 mm – Plastic Holder",
        "30 mm – Velcro",
      ],
      compounding: "Compounding",
      compoundingDesc: "To grind the clearcoat and remove defects, heavy scratches, and swirl marks.\n• Pott 760k – 50 mm\n• Pott 760k – Wool\n• Pott 760k – 30 mm",
      polishing: "Polishing / Buffing",
      polishingDesc: "To restore surface gloss, remove minor scratches from the compound step, and prepare the surface for the final wax or sealant.\n• Pott 580 – 50 mm\n• Pott 580 – 30 mm",
      finishing: "Finishing / Glazing",
      finishingDesc: "Remove excess compound, obtain maximum gloss level (light reflection) and apply the wax, oil or other paint sealant.",
    },
    why: {
      label: "Why Brightex",
      titleLine1: "Built on",
      titleLine2: "Trust & Precision",
      subtitle: "Our commitment to excellence extends beyond products — it's woven into every relationship, every process, and every decision we make.",
      manufacturing: "Controlled Manufacturing",
      manufacturingDesc: "End-to-end production oversight ensures every product meets exacting specifications.",
      quality: "Quality Assurance",
      qualityDesc: "Strict quality control standards at every stage of the manufacturing process.",
      regional: "Regional Expertise",
      regionalDesc: "Deep market knowledge across North Africa and the Middle East since 2007.",
      partnerships: "Lasting Partnerships",
      partnershipsDesc: "Long-term relationships built on reliability, trust, and consistent delivery.",
    },
    whereToBuy: {
      label: "Where To Find Us",
      title: "Find Our",
      titleHighlight: "Distributors",
      subtitle: "Click on a country to discover our trusted distributors across North Africa and the Middle East.",
    },
    use: {
      label: "How To Use",
      title: "Application",
      titleHighlight: "Guide",
      subtitle: "Discover best practices and professional techniques for using Brightex polishing pads and finishing accessories to achieve optimal results.",
    },
    download: {
      label: "Download",
      title: "Resources &",
      titleHighlight: "Downloads",
      subtitle: "Access product catalogs, technical data sheets, and application guides for all Brightex products.",
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked",
      titleHighlight: "Questions",
      q1: "What types of polishing pads does Brightex offer?",
      a1: "We offer a comprehensive range including foam pads, wool pads, and microfiber pads designed for cutting, polishing, and finishing applications.",
      q2: "Where are Brightex products manufactured?",
      a2: "All Brightex products are manufactured in our facility in Tunisia, with strict quality control at every production stage.",
      q3: "Do you ship internationally?",
      a3: "Yes, we serve professionals across North Africa, the Middle East, and are expanding to new markets. Contact us for distribution inquiries.",
      q4: "Can I become a Brightex distributor?",
      a4: "We're always looking for reliable partners. Please reach out through our B2B section or contact form to discuss partnership opportunities.",
    },
    b2b: {
      label: "B2B",
      title: "Business",
      titleHighlight: "Partnerships",
      subtitle: "Partner with Brightex for bulk orders, private labeling, and distribution opportunities. We offer competitive pricing and dedicated support for business clients.",
    },
    contact: {
      label: "Contact",
      titleStart: "Let's",
      titleHighlight: "Connect",
      location: "Location",
      locationVal: "Tunisia",
      email: "Email",
      phone: "Phone",
    },
    footer: {
      rights: "The Art of Automotive Shine. All rights reserved.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      products: "Produits",
      whereToBuy: "Où Nous Trouver",
      use: "Utilisation",
      download: "Télécharger",
      faq: "FAQ",
      b2b: "B2B",
      contact: "Contact",
      getInTouch: "Contactez-nous",
    },
    hero: {
      titleLine1: "L'Art du",
      titleLine2: "Polissage Automobile",
      subtitle: "Près de deux décennies d'excellence dans la fabrication de tampons de polissage haute performance et d'accessoires de finition de surface.",
      exploreProducts: "Nos Produits",
      ourStory: "Notre Histoire",
      scroll: "Défiler",
    },
    about: {
      label: "À Propos de Brightex",
      titleLine1: "Excellence",
      titleLine2: "Industrielle",
      p1: "Fondée en 2007 et basée en Tunisie, Brightex apporte près de deux décennies d'expertise dans la fabrication de tampons de polissage haute performance et d'accessoires de finition de surface. Grâce à des processus de production contrôlés et des normes de qualité strictes, nous livrons des solutions durables et fiables, approuvées par les professionnels d'Afrique du Nord et du Moyen-Orient.",
      p2: "Notre présence durable sur le marché reflète notre engagement envers la constance, l'excellence technique et les partenariats à long terme.",
      statFounded: "Fondée",
      statYears: "Ans d'Expérience",
      statCountries: "Pays Desservis",
      statQuality: "Certifié Qualité",
    },
    products: {
      label: "Nos Produits",
      titleStart: "Conçus pour la",
      titleHighlight: "Performance",
      padsLabel: "Tampons de Polissage",
      processLabel: "Processus d'Application",
      heavyCut: "Mousse Coupe Forte",
      mediumCut: "Mousse Coupe Moyenne",
      softFoam: "Mousse Douce",
      padVariants: [
        "50 mm – Support Plastique",
        "50 mm – Velcro",
        "30 mm – Support Plastique",
        "30 mm – Velcro",
      ],
      compounding: "Compoundage",
      compoundingDesc: "Pour abraser le vernis et éliminer les défauts, rayures profondes et traces de spirale.\n• Pott 760k – 50 mm\n• Pott 760k – Laine\n• Pott 760k – 30 mm",
      polishing: "Polissage / Lustrage",
      polishingDesc: "Pour restaurer l'éclat de la surface, éliminer les micro-rayures de l'étape de compoundage et préparer la surface pour la cire ou le scellant final.\n• Pott 580 – 50 mm\n• Pott 580 – 30 mm",
      finishing: "Finition / Glaçage",
      finishingDesc: "Éliminer l'excès de compound, obtenir un niveau de brillance maximal (réflexion de la lumière) et appliquer la cire, l'huile ou tout autre scellant de peinture.",
    },
    why: {
      label: "Pourquoi Brightex",
      titleLine1: "Bâti sur la",
      titleLine2: "Confiance & Précision",
      subtitle: "Notre engagement envers l'excellence va au-delà des produits — il est tissé dans chaque relation, chaque processus et chaque décision que nous prenons.",
      manufacturing: "Fabrication Contrôlée",
      manufacturingDesc: "Un suivi de production de bout en bout garantit que chaque produit répond à des spécifications exigeantes.",
      quality: "Assurance Qualité",
      qualityDesc: "Des normes strictes de contrôle qualité à chaque étape du processus de fabrication.",
      regional: "Expertise Régionale",
      regionalDesc: "Une connaissance approfondie du marché en Afrique du Nord et au Moyen-Orient depuis 2007.",
      partnerships: "Partenariats Durables",
      partnershipsDesc: "Des relations à long terme fondées sur la fiabilité, la confiance et une livraison constante.",
    },
    whereToBuy: {
      label: "Où Nous Trouver",
      title: "Trouvez Nos",
      titleHighlight: "Distributeurs",
      subtitle: "Cliquez sur un pays pour découvrir nos distributeurs de confiance en Afrique du Nord et au Moyen-Orient.",
    },
    use: {
      label: "Utilisation",
      title: "Guide",
      titleHighlight: "d'Application",
      subtitle: "Découvrez les meilleures pratiques et techniques professionnelles pour utiliser les tampons de polissage et accessoires de finition Brightex.",
    },
    download: {
      label: "Télécharger",
      title: "Ressources &",
      titleHighlight: "Téléchargements",
      subtitle: "Accédez aux catalogues produits, fiches techniques et guides d'application pour tous les produits Brightex.",
    },
    faq: {
      label: "FAQ",
      title: "Questions",
      titleHighlight: "Fréquentes",
      q1: "Quels types de tampons de polissage Brightex propose-t-il ?",
      a1: "Nous proposons une gamme complète comprenant des tampons en mousse, en laine et en microfibre conçus pour le ponçage, le polissage et la finition.",
      q2: "Où sont fabriqués les produits Brightex ?",
      a2: "Tous les produits Brightex sont fabriqués dans notre usine en Tunisie, avec un contrôle qualité strict à chaque étape de production.",
      q3: "Livrez-vous à l'international ?",
      a3: "Oui, nous servons les professionnels en Afrique du Nord, au Moyen-Orient et nous nous développons vers de nouveaux marchés. Contactez-nous pour les demandes de distribution.",
      q4: "Puis-je devenir distributeur Brightex ?",
      a4: "Nous recherchons toujours des partenaires fiables. Contactez-nous via notre section B2B ou formulaire de contact pour discuter des opportunités de partenariat.",
    },
    b2b: {
      label: "B2B",
      title: "Partenariats",
      titleHighlight: "Professionnels",
      subtitle: "Associez-vous à Brightex pour les commandes en gros, la marque privée et les opportunités de distribution. Nous offrons des prix compétitifs et un support dédié aux clients professionnels.",
    },
    contact: {
      label: "Contact",
      titleStart: "Restons en",
      titleHighlight: "Contact",
      location: "Localisation",
      locationVal: "Tunisie",
      email: "Email",
      phone: "Téléphone",
    },
    footer: {
      rights: "L'Art du Polissage Automobile. Tous droits réservés.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      products: "المنتجات",
      whereToBuy: "أين تجدنا",
      use: "الاستخدام",
      download: "تحميل",
      faq: "الأسئلة الشائعة",
      b2b: "B2B",
      contact: "اتصل بنا",
      getInTouch: "تواصل معنا",
    },
    hero: {
      titleLine1: "فن",
      titleLine2: "لمعان السيارات",
      subtitle: "ما يقرب من عقدين من التميز في تصنيع أقراص التلميع عالية الأداء وملحقات تشطيب الأسطح.",
      exploreProducts: "اكتشف المنتجات",
      ourStory: "قصتنا",
      scroll: "مرر",
    },
    about: {
      label: "عن برايتكس",
      titleLine1: "التميز",
      titleLine2: "الصناعي",
      p1: "تأسست برايتكس عام 2007 ومقرها تونس، وتقدم ما يقرب من عقدين من الخبرة في تصنيع أقراص التلميع عالية الأداء وملحقات تشطيب الأسطح. من خلال عمليات إنتاج محكمة ومعايير جودة صارمة، نقدم حلولاً متينة وموثوقة يثق بها المحترفون في شمال أفريقيا والشرق الأوسط.",
      p2: "يعكس حضورنا المستمر في السوق التزامنا بالاتساق والتميز التقني والشراكات طويلة الأمد.",
      statFounded: "تأسست",
      statYears: "سنوات خبرة",
      statCountries: "دولة نخدمها",
      statQuality: "جودة معتمدة",
    },
    products: {
      label: "منتجاتنا",
      titleStart: "مصممة من أجل",
      titleHighlight: "الأداء",
      padsLabel: "أقراص التلميع",
      processLabel: "عملية التطبيق",
      heavyCut: "إسفنج قطع قوي",
      mediumCut: "إسفنج قطع متوسط",
      softFoam: "إسفنج ناعم",
      padVariants: [
        "50 mm – حامل بلاستيكي",
        "50 mm – فيلكرو",
        "30 mm – حامل بلاستيكي",
        "30 mm – فيلكرو",
      ],
      compounding: "الكمبوند",
      compoundingDesc: "لطحن طبقة الورنيش وإزالة العيوب والخدوش العميقة وآثار الدوامة.\n• Pott 760k – 50 mm\n• Pott 760k – صوف\n• Pott 760k – 30 mm",
      polishing: "التلميع / البافينج",
      polishingDesc: "لاستعادة لمعان السطح وإزالة الخدوش الطفيفة من مرحلة الكمبوند وتحضير السطح للشمع أو المانع النهائي.\n• Pott 580 – 50 mm\n• Pott 580 – 30 mm",
      finishing: "التشطيب / الجلاء",
      finishingDesc: "إزالة فائض الكمبوند، الحصول على أقصى مستوى من اللمعان (انعكاس الضوء) وتطبيق الشمع أو الزيت أو أي مانع طلاء آخر.",
    },
    why: {
      label: "لماذا برايتكس",
      titleLine1: "مبنية على",
      titleLine2: "الثقة والدقة",
      subtitle: "التزامنا بالتميز يتجاوز المنتجات — إنه منسوج في كل علاقة وكل عملية وكل قرار نتخذه.",
      manufacturing: "تصنيع محكم",
      manufacturingDesc: "إشراف شامل على الإنتاج يضمن أن كل منتج يلبي المواصفات الدقيقة.",
      quality: "ضمان الجودة",
      qualityDesc: "معايير صارمة لمراقبة الجودة في كل مرحلة من مراحل عملية التصنيع.",
      regional: "خبرة إقليمية",
      regionalDesc: "معرفة عميقة بالسوق في شمال أفريقيا والشرق الأوسط منذ 2007.",
      partnerships: "شراكات دائمة",
      partnershipsDesc: "علاقات طويلة الأمد مبنية على الموثوقية والثقة والتسليم المستمر.",
    },
    whereToBuy: {
      label: "أين تجدنا",
      title: "ابحث عن",
      titleHighlight: "موزعينا",
      subtitle: "انقر على دولة لاكتشاف موزعينا الموثوقين في شمال أفريقيا والشرق الأوسط.",
    },
    use: {
      label: "الاستخدام",
      title: "دليل",
      titleHighlight: "التطبيق",
      subtitle: "اكتشف أفضل الممارسات والتقنيات المهنية لاستخدام أقراص التلميع وملحقات التشطيب من برايتكس.",
    },
    download: {
      label: "تحميل",
      title: "الموارد",
      titleHighlight: "والتنزيلات",
      subtitle: "احصل على كتالوجات المنتجات والأوراق التقنية وأدلة التطبيق لجميع منتجات برايتكس.",
    },
    faq: {
      label: "الأسئلة الشائعة",
      title: "الأسئلة",
      titleHighlight: "الشائعة",
      q1: "ما أنواع أقراص التلميع التي تقدمها برايتكس؟",
      a1: "نقدم مجموعة شاملة تشمل أقراص إسفنجية وصوفية ومايكروفايبر مصممة للقطع والتلميع والتشطيب.",
      q2: "أين تُصنع منتجات برايتكس؟",
      a2: "جميع منتجات برايتكس تُصنع في مصنعنا في تونس، مع رقابة صارمة على الجودة في كل مرحلة إنتاج.",
      q3: "هل تشحنون دولياً؟",
      a3: "نعم، نخدم المحترفين في شمال أفريقيا والشرق الأوسط ونتوسع نحو أسواق جديدة. اتصل بنا للاستفسار عن التوزيع.",
      q4: "هل يمكنني أن أصبح موزعاً لبرايتكس؟",
      a4: "نبحث دائماً عن شركاء موثوقين. تواصل معنا عبر قسم B2B أو نموذج الاتصال لمناقشة فرص الشراكة.",
    },
    b2b: {
      label: "B2B",
      title: "شراكات",
      titleHighlight: "تجارية",
      subtitle: "تعاون مع برايتكس للطلبات بالجملة والعلامة الخاصة وفرص التوزيع. نقدم أسعاراً تنافسية ودعماً مخصصاً للعملاء التجاريين.",
    },
    contact: {
      label: "اتصل بنا",
      titleStart: "لنبقى على",
      titleHighlight: "تواصل",
      location: "الموقع",
      locationVal: "تونس",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
    },
    footer: {
      rights: "فن لمعان السيارات. جميع الحقوق محفوظة.",
    },
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  isRtl: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        isRtl: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
