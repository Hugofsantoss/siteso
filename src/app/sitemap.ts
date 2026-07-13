import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { todosEmpreendimentos } from "@/data/empreendimentos";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/sobre`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteConfig.url}/servicos`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteConfig.url}/lancamentos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/em-andamento`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/portfolio`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contato`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const empreendimentoRoutes: MetadataRoute.Sitemap = todosEmpreendimentos.map((item) => ({
    url: `${siteConfig.url}/empreendimentos/${item.slug}`,
    changeFrequency: "monthly",
    priority: item.status === "Lançamento" ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...empreendimentoRoutes];
}
