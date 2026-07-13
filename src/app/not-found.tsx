import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-20">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <span className="font-display text-7xl font-semibold text-gold-500">404</span>
          <h1 className="font-display text-2xl font-semibold text-graphite-900 md:text-3xl">
            Página não encontrada
          </h1>
          <p className="text-sm leading-relaxed text-stone-600">
            A página que você procura não existe ou foi movida. Volte para a Home ou confira
            nossas obras.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Button href="/" variant="primary">
              Voltar para a Home
            </Button>
            <Button href="/portfolio" variant="secondary">
              Ver obras
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
