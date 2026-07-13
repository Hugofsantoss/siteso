import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
