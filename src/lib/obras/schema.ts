import { z } from "zod";

export const obraStatusOptions = ["Planejamento", "Em Construção", "Concluída"] as const;

export const obraSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome da obra."),
  codigoInterno: z.string().trim().min(1, "Informe o código interno."),
  endereco: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  bairro: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  cidade: z.string().trim().min(2, "Informe a cidade."),
  status: z.enum(obraStatusOptions),
  descricao: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  dataInicio: z
    .string()
    .optional()
    .transform((v) => v || null),
  previsaoEntrega: z
    .string()
    .optional()
    .transform((v) => v || null),
  percentualExecucao: z.coerce.number().int().min(0).max(100),
});

export type ObraFormValues = z.infer<typeof obraSchema>;
