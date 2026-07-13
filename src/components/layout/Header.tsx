"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { navLinks } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavDropdown } from "@/components/layout/NavDropdown";
import logo from "@/assets/images/brand/logo.png";

export function Header() {
  const scrolled = useScrollHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const solid = scrolled || pathname !== "/";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out ${
          solid ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <Container className="flex h-20 items-center justify-between md:h-24">
          <Link href="/" className="relative z-10 flex items-center" aria-label="Sólido Construções Prediais — página inicial">
            <Image
              src={logo}
              alt="Sólido Construções Prediais"
              className={`h-9 w-auto transition-[filter] duration-300 md:h-10 ${
                solid ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) =>
              "children" in link ? (
                <NavDropdown
                  key={`${link.label}-${pathname}`}
                  label={link.label}
                  items={link.children}
                  tone={solid ? "solid" : "transparent"}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    solid
                      ? "text-graphite-700 hover:text-gold-600"
                      : "text-white hover:text-gold-400"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden md:block">
            <Button href="/contato" variant={solid ? "primary" : "ghost"} className="!px-6 !py-2.5 text-xs">
              Solicitar orçamento
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className={`rounded-sm p-2 transition-colors md:hidden ${solid ? "text-graphite-900" : "text-white"}`}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
