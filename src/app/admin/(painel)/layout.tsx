import type { Metadata } from "next";
import type { ReactNode } from "react";
import { verifyAdminSession } from "@/lib/auth/dal";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPainelLayout({ children }: { children: ReactNode }) {
  const { nome } = await verifyAdminSession();

  return <AdminShell nome={nome}>{children}</AdminShell>;
}
