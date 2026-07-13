import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/LoginForm";
import { loginInvestidorAction } from "@/lib/auth/actions";
import logo from "@/assets/images/brand/logo.png";

export const metadata: Metadata = {
  title: "Login Investidor",
  robots: { index: false, follow: false },
};

export default function InvestidorLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite-900 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <Image
            src={logo}
            alt="Sólido Construções Prediais"
            className="h-8 w-auto brightness-0 invert"
          />
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              Área do Investidor
            </p>
            <p className="mt-1 text-sm text-stone-400">
              Acompanhe suas obras com a Sólido.
            </p>
          </div>
        </div>
        <LoginForm action={loginInvestidorAction} emailPlaceholder="voce@email.com" />
      </div>
    </div>
  );
}
