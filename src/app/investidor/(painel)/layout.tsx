import type { Metadata } from "next";
import type { ReactNode } from "react";
import { verifyInvestidorSession } from "@/lib/auth/dal";
import { InvestidorShell } from "@/components/investidor/InvestidorShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function InvestidorPainelLayout({ children }: { children: ReactNode }) {
  const { nome } = await verifyInvestidorSession();

  return <InvestidorShell nome={nome}>{children}</InvestidorShell>;
}
