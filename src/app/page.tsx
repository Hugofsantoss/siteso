import { Hero } from "@/sections/Hero";
import { ServicosGrid } from "@/sections/ServicosGrid";
import { LancamentosDestaque } from "@/sections/LancamentosDestaque";
import { Diferenciais } from "@/sections/Diferenciais";
import { CtaContato } from "@/sections/CtaContato";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicosGrid />
      <LancamentosDestaque />
      <Diferenciais />
      <CtaContato />
    </>
  );
}
