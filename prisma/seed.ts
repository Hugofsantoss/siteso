import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  const nome = process.env.ADMIN_BOOTSTRAP_NAME;
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const senha = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!nome || !email || !senha) {
    throw new Error(
      "Defina ADMIN_BOOTSTRAP_NAME, ADMIN_BOOTSTRAP_EMAIL e ADMIN_BOOTSTRAP_PASSWORD no .env antes de rodar o seed.",
    );
  }

  const existente = await db.admin.findUnique({ where: { email } });
  if (existente) {
    console.log(`Admin "${email}" já existe — nada a fazer.`);
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 12);
  const admin = await db.admin.create({
    data: { nome, email, senhaHash },
  });

  console.log(`Admin criado: ${admin.email}`);
  console.log("Troque a senha padrão assim que possível pelo painel.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
