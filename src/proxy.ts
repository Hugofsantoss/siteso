import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  INVESTIDOR_SESSION_COOKIE,
} from "@/lib/auth/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminLogin = pathname === "/admin/login";
  const isInvestidorLogin = pathname === "/investidor/login";

  // Checagem apenas otimista (presença de cookie, sem tocar no banco): protege as
  // rotas privadas de acesso sem nenhuma sessão. Não redireciona para longe das
  // páginas de login mesmo com cookie presente — o cookie pode ser inválido/expirado
  // (a validação real é feita pela DAL), e um redirect otimista nessa direção causa
  // loop infinito entre a rota protegida e o login quando a sessão é invalida no
  // banco (ex: investidor desativado) mas o cookie ainda existe no navegador.
  if (pathname.startsWith("/admin") && !isAdminLogin) {
    if (!request.cookies.has(ADMIN_SESSION_COOKIE)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.startsWith("/investidor") && !isInvestidorLogin) {
    if (!request.cookies.has(INVESTIDOR_SESSION_COOKIE)) {
      return NextResponse.redirect(new URL("/investidor/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/investidor/:path*"],
};
