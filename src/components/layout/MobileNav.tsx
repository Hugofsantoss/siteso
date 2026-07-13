"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { navLinks, contactInfo, buildWhatsAppUrl } from "@/lib/site-config";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-graphite-900 transition-opacity duration-300 ease-out md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <div className="flex items-center justify-end px-6 pt-6">
        <button
          onClick={onClose}
          aria-label="Fechar menu"
          className="rounded-sm p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        >
          <X size={28} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex flex-col gap-8 px-10 pt-16">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-display text-3xl font-semibold text-white transition-colors hover:text-gold-400"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-10 left-10 right-10">
        <a
          href={buildWhatsAppUrl(contactInfo.salesPhoneRaw)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm tracking-wide text-stone-300"
        >
          {contactInfo.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
