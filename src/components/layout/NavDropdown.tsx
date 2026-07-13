"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface NavDropdownProps {
  label: string;
  items: readonly { label: string; href: string }[];
  tone: "solid" | "transparent";
}

export function NavDropdown({ label, items, tone }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = items.some((item) => pathname.startsWith(item.href));

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const textColor =
    tone === "solid"
      ? active
        ? "text-gold-600"
        : "text-graphite-700 hover:text-gold-600"
      : active
        ? "text-gold-400"
        : "text-white hover:text-gold-400";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors ${textColor}`}
      >
        {label}
        <ChevronDown
          size={15}
          strokeWidth={1.75}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full mt-4 w-52 -translate-x-1/2 border border-stone-200 bg-white py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 text-sm text-graphite-700 transition-colors hover:bg-stone-50 hover:text-gold-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
