import { z } from "zod";

export const investidorBaseSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome completo."),
  email: z.email("Informe um e-mail válido."),
  telefone: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  documento: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
});

export const senhaSchema = z.string().min(8, "A senha deve ter pelo menos 8 caracteres.");

export type InvestidorBaseValues = z.infer<typeof investidorBaseSchema>;
