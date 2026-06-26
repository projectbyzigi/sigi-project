"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS, CONTACT } from "@/lib/site-content";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-[var(--color-bg)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="container-x flex items-center justify-between py-5">
            <div className="inline-flex items-center">
              <Image
                src="/brand/logo-mark.png"
                alt="SIGI Bauunternehmen"
                width={581}
                height={486}
                className="h-auto w-[76px]"
              />
            </div>
            <button
              onClick={onClose}
              aria-label="Menü schließen"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-2xl"
            >
              ×
            </button>
          </div>

          <nav className="container-x flex flex-1 flex-col justify-center gap-2">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                className="display border-b border-[var(--color-line)] py-4 text-[clamp(2rem,9vw,3rem)] text-[var(--color-ink)]"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="container-x flex flex-col gap-1 py-8 text-sm text-[var(--color-ink-soft)]">
            <a href={`tel:${CONTACT.phoneHref}`} className="link-underline w-fit">
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="link-underline w-fit">
              {CONTACT.email}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
