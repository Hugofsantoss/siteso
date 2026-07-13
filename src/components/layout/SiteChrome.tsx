"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SiteChromeProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export function SiteChrome({ header, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isPainelRoute = pathname.startsWith("/admin") || pathname.startsWith("/investidor");

  if (isPainelRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
