import { z } from "zod";

export const contactSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  email: z.email("Informe um email válido"),
  telefone: z.string().min(8, "Informe um telefone válido"),
  assunto: z.enum(["Empreendimentos", "Construção de Casas", "Revitalização de Fachadas", "Outro"]),
  mensagem: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
