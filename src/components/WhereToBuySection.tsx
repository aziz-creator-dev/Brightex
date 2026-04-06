import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { X, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryMeta = {
  name: string;
  nameAr: string;
  nameFr: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
};

const ACTIVE_COUNTRIES: Record<string, CountryMeta> = {
  "788": { name: "Tunisia",       nameAr: "تونس",                      nameFr: "Tunisie",              center: [9.5,  33.9],  zoom: 12 },
  "012": { name: "Algeria",       nameAr: "الجزائر",                   nameFr: "Algérie",              center: [2.6,  28.0],  zoom: 7 },
  "504": { name: "Morocco",       nameAr: "المغرب",                    nameFr: "Maroc",                center: [-7.1, 31.8],  zoom: 8 },
  "434": { name: "Libya",         nameAr: "ليبيا",                     nameFr: "Libye",                center: [17.2, 27.0],  zoom: 7 },
  "818": { name: "Egypt",         nameAr: "مصر",                       nameFr: "Égypte",               center: [30.1, 26.8],  zoom: 7 },
  "682": { name: "Saudi Arabia",  nameAr: "المملكة العربية السعودية",  nameFr: "Arabie Saoudite",      center: [45.1, 24.0],  zoom: 6 },
  "784": { name: "UAE",           nameAr: "الإمارات",                  nameFr: "Émirats Arabes Unis",  center: [54.4, 24.0],  zoom: 14 },
  "634": { name: "Qatar",         nameAr: "قطر",                       nameFr: "Qatar",                center: [51.2, 25.3],  zoom: 18 },
  "414": { name: "Kuwait",        nameAr: "الكويت",                    nameFr: "Koweït",               center: [47.5, 29.3],  zoom: 16 },
  "400": { name: "Jordan",        nameAr: "الأردن",                    nameFr: "Jordanie",             center: [36.2, 31.2],  zoom: 12 },
};

const DEFAULT_CENTER: [number, number] = [25, 25];
const DEFAULT_ZOOM = 1.8;

// Dynamically compute the best center + zoom to fit all active countries
const computeInitialView = (): { center: [number, number]; zoom: number } => {
  const centers = Object.values(ACTIVE_COUNTRIES).map((c) => c.center);
  const lngs = centers.map((c) => c[0]);
  const lats = centers.map((c) => c[1]);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const centerLng = (minLng + maxLng) / 2;
  const centerLat = (minLat + maxLat) / 2;
  // Fit zoom: map viewport is ~800px wide, geoMercator scale=140 → 1 zoom unit ≈ 140px/360°
  const lngSpan = (maxLng - minLng) * 1.4; // 1.4 padding factor
  const latSpan = (maxLat - minLat) * 1.4;
  const zoomLng = 360 / lngSpan;
  const zoomLat = 180 / latSpan;
  const zoom = Math.min(zoomLng, zoomLat, 6);
  return { center: [centerLng, centerLat], zoom: Math.max(zoom, 2) };
};

const INITIAL_VIEW = computeInitialView();

type Distributor = { name: string; city: string; phone: string; email: string };

const DISTRIBUTORS: Record<string, Distributor[]> = {
  "788": [
    { name: "Brightex Tunisia HQ", city: "Tunis",   phone: "+216 XX XXX XXX", email: "contact@brightex.tn" },
    { name: "AutoPro Sfax",        city: "Sfax",    phone: "+216 XX XXX XXX", email: "sfax@brightex.tn" },
  ],
  "012": [{ name: "AlgéroShine",        city: "Alger",       phone: "+213 XX XXX XXX", email: "algerie@brightex.tn" }],
  "504": [{ name: "MarocAuto Detail",   city: "Casablanca",  phone: "+212 XX XXX XXX", email: "maroc@brightex.tn" }],
  "434": [{ name: "Libya Auto Care",    city: "Tripoli",     phone: "+218 XX XXX XXX", email: "libya@brightex.tn" }],
  "818": [{ name: "Cairo Detailing Pro",city: "Cairo",       phone: "+20 XX XXX XXX",  email: "egypt@brightex.tn" }],
  "682": [{ name: "Saudi Auto Finish",  city: "Riyadh",      phone: "+966 XX XXX XXX", email: "ksa@brightex.tn" }],
  "784": [{ name: "UAE Detailing Hub",  city: "Dubai",       phone: "+971 XX XXX XXX", email: "uae@brightex.tn" }],
  "634": [{ name: "Qatar Auto Shine",   city: "Doha",        phone: "+974 XX XXX XXX", email: "qatar@brightex.tn" }],
  "414": [{ name: "Kuwait Detail Center",city:"Kuwait City", phone: "+965 XX XXX XXX", email: "kuwait@brightex.tn" }],
  "400": [{ name: "Jordan Auto Pro",    city: "Amman",       phone: "+962 XX XXX XXX", email: "jordan@brightex.tn" }],
};

const WhereToBuySection = () => {
  const { t, lang } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mapPosition, setMapPosition] = useState<{ center: [number, number]; zoom: number }>(INITIAL_VIEW);

  const getCountryName = (id: string) => {
    const c = ACTIVE_COUNTRIES[id];
    if (!c) return "";
    if (lang === "ar") return c.nameAr;
    if (lang === "fr") return c.nameFr;
    return c.name;
  };

  const handleCountryClick = (id: string) => {
    if (!(id in ACTIVE_COUNTRIES)) return;
    if (selectedCountry === id) {
      // deselect → reset
      setSelectedCountry(null);
      setMapPosition(INITIAL_VIEW);
    } else {
      const meta = ACTIVE_COUNTRIES[id];
      setSelectedCountry(id);
      setMapPosition({ center: meta.center, zoom: meta.zoom });
    }
  };

  const selectedDistributors = selectedCountry ? DISTRIBUTORS[selectedCountry] ?? [] : [];

  return (
    <section id="where-to-buy" className="relative py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4 block">
            {t.whereToBuy.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight mb-4">
            {t.whereToBuy.title}{" "}
            <span className="text-gradient font-bold">{t.whereToBuy.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            {t.whereToBuy.subtitle}
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xl"
          style={{ height: 480 }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [20, 20] }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              zoom={mapPosition.zoom}
              center={mapPosition.center}
              onMoveEnd={({ zoom, coordinates }) =>
                setMapPosition({ zoom, center: coordinates as [number, number] })
              }
              minZoom={0.8}
              maxZoom={20}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const id = geo.id as string;
                    const isActive = id in ACTIVE_COUNTRIES;
                    const isSelected = selectedCountry === id;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleCountryClick(id)}
                        onMouseEnter={() => isActive && setHoveredCountry(id)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        style={{
                          default: {
                            fill: isSelected
                              ? "hsl(183 100% 33%)"
                              : isActive
                              ? "hsl(183 100% 33% / 0.35)"
                              : "hsl(var(--muted))",
                            stroke: "hsl(var(--border))",
                            strokeWidth: 0.5,
                            outline: "none",
                            transition: "fill 0.2s",
                          },
                          hover: {
                            fill: isActive ? "hsl(183 100% 33% / 0.7)" : "hsl(var(--muted))",
                            stroke: "hsl(var(--border))",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: isActive ? "pointer" : "default",
                          },
                          pressed: {
                            fill: isActive ? "hsl(183 100% 33%)" : "hsl(var(--muted))",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredCountry && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 text-sm font-medium shadow-lg pointer-events-none"
              >
                <MapPin size={14} className="inline mr-1 text-primary" />
                {getCountryName(hoveredCountry)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset zoom button */}
          <AnimatePresence>
            {selectedCountry && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setSelectedCountry(null);
                  setMapPosition(INITIAL_VIEW);
                }}
                className="absolute top-4 right-4 glass-card border border-border/60 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-all flex items-center gap-1.5"
              >
                <X size={12} /> Reset view
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Distributor panel */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 bg-card border border-border rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  {getCountryName(selectedCountry)}
                </h3>
                <button
                  onClick={() => {
                    setSelectedCountry(null);
                    setMapPosition(INITIAL_VIEW);
                  }}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDistributors.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-border rounded-xl p-4 hover:border-primary/50 transition-colors bg-background"
                  >
                    <p className="font-semibold text-sm mb-1">{d.name}</p>
                    <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                      <MapPin size={11} /> {d.city}
                    </p>
                    <div className="space-y-1.5">
                      <a href={`tel:${d.phone}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Phone size={12} /> {d.phone}
                      </a>
                      <a href={`mailto:${d.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={12} /> {d.email}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default WhereToBuySection;
