import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/images/brand/logo.png";

interface AuthLoginLayoutProps {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}

export function AuthLoginLayout({ titulo, subtitulo, children }: AuthLoginLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite-900 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <Link href="/" aria-label="Voltar para a página inicial" className="inline-flex">
            <Image
              src={logo}
              alt="Sólido Construções Prediais"
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <div>
            <p className="font-display text-2xl font-semibold text-white">{titulo}</p>
            <p className="mt-1 text-sm text-stone-400">{subtitulo}</p>
          </div>
        </div>

        {children}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-stone-400 transition-colors hover:text-gold-400"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}
