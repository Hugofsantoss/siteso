"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function buildTabs(obraId: string) {
  return [
    { href: `/admin/obras/${obraId}`, label: "Dados" },
    { href: `/admin/obras/${obraId}/midias`, label: "Mídias" },
    { href: `/admin/obras/${obraId}/documentos`, label: "Documentos" },
    { href: `/admin/obras/${obraId}/atualizacoes`, label: "Atualizações" },
  ];
}

export function ObraTabs({ obraId }: { obraId: string }) {
  const pathname = usePathname();
  const tabs = buildTabs(obraId);

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-stone-200">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "border-gold-500 text-graphite-900"
                : "border-transparent text-stone-500 hover:text-graphite-900"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
