"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
  label?: string;
}

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null;
  const current = open ? images[index] : null;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index as number) === 0 ? images.length - 1 : (index as number) - 1);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.label ?? current.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-5 top-5 z-10 rounded-sm p-2 text-white/80 transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(index === 0 ? images.length - 1 : (index as number) - 1);
                }}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-sm p-2 text-white/80 transition-colors hover:text-gold-400 md:left-6"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(((index as number) + 1) % images.length);
                }}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-sm p-2 text-white/80 transition-colors hover:text-gold-400 md:right-6"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            </>
          )}

          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full max-h-[80vh] w-full">
              <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" />
            </div>
            {current.label && (
              <p className="text-sm font-medium tracking-wide text-white/80">{current.label}</p>
            )}
            {images.length > 1 && (
              <p className="text-xs text-white/50">
                {(index as number) + 1} / {images.length}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
