import type { Metadata } from "next";
import { AuthLoginLayout } from "@/components/auth/AuthLoginLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { loginAdminAction } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Login Administrador",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AuthLoginLayout titulo="Área do Administrador" subtitulo="Acesso restrito à equipe Sólido.">
      <LoginForm action={loginAdminAction} emailPlaceholder="admin@solidoprediais.com.br" />
    </AuthLoginLayout>
  );
}
