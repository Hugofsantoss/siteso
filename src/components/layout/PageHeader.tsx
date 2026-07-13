import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: string;
  path: string;
}

export function PageHeader({ eyebrow, title, description, breadcrumb, path }: PageHeaderProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: breadcrumb, item: `${siteConfig.url}${path}` },
    ],
  };

  return (
    <section className="bg-graphite-900 pt-36 pb-16 md:pt-44 md:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs text-stone-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-gold-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-300">{breadcrumb}</li>
          </ol>
        </nav>

        {eyebrow && (
          <span className="mt-8 block text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-300">{description}</p>
        )}
      </Container>
    </section>
  );
}
