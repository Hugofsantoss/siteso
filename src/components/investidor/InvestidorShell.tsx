"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LogOut, Menu, X } from "lucide-react";
import { logoutInvestidorAction } from "@/lib/auth/actions";

const navItems = [{ href: "/investidor", label: "Minhas Obras", icon: Building2 }];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1 px-3 py-6">
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium transition-colors ${
              active ? "bg-white/10 text-white" : "text-stone-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton() {
  return (
    <form action={logoutInvestidorAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium text-stone-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        <LogOut size={18} strokeWidth={1.5} />
        Sair
      </button>
    </form>
  );
}

interface InvestidorShellProps {
  nome: string;
  children: ReactNode;
}

export function InvestidorShell({ nome, children }: InvestidorShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-stone-200 bg-graphite-900 md:flex">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <p className="font-display text-lg font-semibold text-white">
            Sólido<span className="text-gold-400"> Investidor</span>
          </p>
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t border-white/10 p-4">
          <LogoutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 md:h-20 md:px-8">
          <button
            className="text-graphite-900 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <p className="hidden font-display text-lg font-semibold text-graphite-900 md:block">
            Área do Investidor
          </p>
          <p className="text-sm text-stone-600">
            Olá, <span className="font-medium text-graphite-900">{nome}</span>
          </p>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
            />
            <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-graphite-900">
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
                <p className="font-display text-lg font-semibold text-white">
                  Sólido<span className="text-gold-400"> Investidor</span>
                </p>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="text-white"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
              <div className="border-t border-white/10 p-4">
                <LogoutButton />
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}
