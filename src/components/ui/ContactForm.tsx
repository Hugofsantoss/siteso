"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { buildWhatsAppUrl, contactInfo } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

const inputStyles =
  "w-full border border-stone-300 bg-white px-4 py-3 text-sm text-graphite-900 placeholder:text-stone-400 transition-colors focus:border-gold-500 focus:outline-none";

const labelStyles = "text-xs font-medium tracking-wide text-graphite-700 uppercase";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { assunto: "Empreendimentos" },
  });

  const onSubmit = (data: ContactFormData) => {
    const mensagem = [
      `Nome: ${data.nome}`,
      `Email: ${data.email}`,
      `Telefone: ${data.telefone}`,
      `Assunto: ${data.assunto}`,
      "",
      data.mensagem,
    ].join("\n");

    window.open(buildWhatsAppUrl(contactInfo.salesPhoneRaw, mensagem), "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 border border-stone-200 bg-stone-50 px-8 py-16 text-center">
        <CheckCircle2 size={40} strokeWidth={1.25} className="text-gold-600" />
        <p className="font-display text-xl font-semibold text-graphite-900">
          Mensagem pronta para envio
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-stone-600">
          Abrimos o WhatsApp com sua mensagem preenchida. É só confirmar o envio por lá para
          falar com nossa equipe.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-2 text-sm font-medium text-graphite-900 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-gold-600"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className={labelStyles}>
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome"
          className={inputStyles}
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "nome-error" : undefined}
          {...register("nome")}
        />
        {errors.nome && (
          <p id="nome-error" role="alert" className="text-xs text-red-600">
            {errors.nome.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="voce@email.com"
            className={inputStyles}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="telefone" className={labelStyles}>
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            placeholder="(31) 90000-0000"
            className={inputStyles}
            aria-invalid={!!errors.telefone}
            aria-describedby={errors.telefone ? "telefone-error" : undefined}
            {...register("telefone")}
          />
          {errors.telefone && (
            <p id="telefone-error" role="alert" className="text-xs text-red-600">
              {errors.telefone.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="assunto" className={labelStyles}>
          Assunto
        </label>
        <select id="assunto" className={inputStyles} {...register("assunto")}>
          <option value="Empreendimentos">Empreendimentos</option>
          <option value="Construção de Casas">Construção de Casas</option>
          <option value="Revitalização de Fachadas">Revitalização de Fachadas</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mensagem" className={labelStyles}>
          Mensagem
        </label>
        <textarea
          id="mensagem"
          rows={5}
          placeholder="Conte um pouco sobre o que você procura"
          className={`${inputStyles} resize-none`}
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
          {...register("mensagem")}
        />
        {errors.mensagem && (
          <p id="mensagem-error" role="alert" className="text-xs text-red-600">
            {errors.mensagem.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Enviando..." : "Enviar via WhatsApp"}
      </Button>
    </form>
  );
}
