import "server-only";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Pool pequeno: o pooler da Supabase (pgbouncer, transaction mode, porta 6543 em
// DATABASE_URL) já faz o balanceamento real das conexões. Cada instância serverless
// da Vercel só precisa manter uma conexão própria para não estourar o limite do Postgres.
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
