import { Hero } from "@/sections/Hero";
import { ServicosGrid } from "@/sections/ServicosGrid";
import { EmpreendimentosDestaque } from "@/sections/EmpreendimentosDestaque";
import { Diferenciais } from "@/sections/Diferenciais";
import { CtaContato } from "@/sections/CtaContato";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicosGrid />
      <EmpreendimentosDestaque />
      <Diferenciais />
      <CtaContato />
    </>
  );
}
