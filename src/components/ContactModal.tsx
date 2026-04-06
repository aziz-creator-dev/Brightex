import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, MessageSquare } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";
import { useLanguage } from "@/contexts/LanguageContext";

const RECIPIENT = "contact@brightex.tn";

const ContactModal = () => {
  const { open, closeModal } = useContactModal();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${RECIPIENT}?subject=${encodeURIComponent(form.subject || "Contact from Brightex website")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => { setSent(false); closeModal(); setForm({ name: "", email: "", subject: "", message: "" }); }, 2000);
  };

  const field = "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-card rounded-3xl w-full max-w-lg pointer-events-auto border border-border/60 shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-border/40">
                <div>
                  <h2 className="text-xl font-semibold">
                    {t.contact.titleStart}{" "}
                    <span className="text-gradient font-bold">{t.contact.titleHighlight}</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">{RECIPIENT}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`${field} pl-9`}
                    />
                  </div>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`${field} pl-9`}
                    />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-muted-foreground/50" />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`${field} pl-9`}
                  />
                </div>

                <textarea
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-none`}
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-teal text-white text-sm font-semibold tracking-wide hover:scale-[1.02] hover:shadow-[0_0_25px_-5px_hsl(183_100%_33%/0.5)] transition-all duration-300"
                >
                  {sent ? (
                    "Opening mail client..."
                  ) : (
                    <>
                      <Send size={15} />
                      {t.nav.getInTouch}
                    </>
                  )}
                </button>
              </form>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
