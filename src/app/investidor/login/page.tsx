import type { Metadata } from "next";
import { AuthLoginLayout } from "@/components/auth/AuthLoginLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { loginInvestidorAction } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Login Investidor",
  robots: { index: false, follow: false },
};

export default function InvestidorLoginPage() {
  return (
    <AuthLoginLayout titulo="Área do Investidor" subtitulo="Acompanhe suas obras com a Sólido.">
      <LoginForm action={loginInvestidorAction} emailPlaceholder="voce@email.com" />
    </AuthLoginLayout>
  );
}
