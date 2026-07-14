import type { NextConfig } from "next";

// CSP com escopo restrito ao que o site realmente carrega: tudo self-hosted
// (fontes via next/font, imagens locais, API/Server Actions no mesmo domínio),
// mais o iframe do Google Maps na página de Contato. 'unsafe-inline' em script/style
// é necessário para os scripts de hidratação do Next.js e para os estilos inline
// que o Framer Motion aplica durante as animações.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Padrão do Next.js é 1MB, insuficiente para fotos/vídeos/documentos reais
      // enviados no painel admin. Cada action valida tipo e tamanho explicitamente
      // (ver src/lib/upload-validation.ts); este é só o teto do corpo da requisição.
      bodySizeLimit: "10mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/empreendimentos",
        destination: "/lancamentos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
