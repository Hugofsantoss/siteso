# Deploy — Supabase + Vercel

Passo a passo para colocar o site (incluindo a Área do Investidor) no ar. O código já está
pronto; os passos abaixo exigem acesso às suas contas Supabase e Vercel, então precisam ser
feitos por você.

## 1. Criar o projeto no Supabase

1. Crie um projeto em [supabase.com](https://supabase.com) (escolha a região mais próxima, ex:
   South America / São Paulo).
2. Guarde a senha do banco definida na criação — ela entra nas connection strings do passo 2.

## 2. Configurar o banco de dados

Em **Project Settings → Database → Connection string**, copie duas URLs:

- **Connection pooling** (modo *Transaction*, porta `6543`) → variável `DATABASE_URL`. Garanta
  que termine com `?pgbouncer=true`.
- **Direct connection** (porta `5432`) → variável `DIRECT_URL`.

## 3. Configurar o Storage (uploads)

1. No painel: **Storage → New bucket**.
2. Nome: `uploads`. Marque como **privado** (não público) — os arquivos só são servidos pela
   rota autenticada `/api/arquivos/...`, nunca diretamente pela URL do Supabase.
3. Em **Project Settings → API**, copie:
   - `Project URL` → variável `SUPABASE_URL`
   - `service_role` key (não a `anon` key) → variável `SUPABASE_SERVICE_ROLE_KEY`

## 4. Preencher o `.env` local

Copie `.env.example` para `.env` e preencha `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_URL` e
`SUPABASE_SERVICE_ROLE_KEY` com os valores acima. Ajuste `ADMIN_BOOTSTRAP_PASSWORD` para uma
senha forte e defina o email real do administrador.

## 5. Criar as tabelas e o admin inicial

Com o `.env` preenchido, rode localmente:

```bash
npm install
npm run db:deploy   # aplica as migrations no banco (prisma migrate deploy)
npm run db:seed     # cria o admin definido no .env
```

Isso cria as tabelas no Postgres e o único administrador real (sem dados fictícios).

## 6. Deploy na Vercel

1. Suba o repositório para o GitHub (se ainda não estiver lá) e importe o projeto em
   [vercel.com/new](https://vercel.com/new).
2. Em **Project Settings → Environment Variables**, adicione (Production e Preview):
   - `DATABASE_URL`, `DIRECT_URL`
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET` (`uploads`)
   - `ADMIN_BOOTSTRAP_NAME`, `ADMIN_BOOTSTRAP_EMAIL`, `ADMIN_BOOTSTRAP_PASSWORD` (só necessárias
     se for rodar o seed novamente via `vercel env pull` + `npm run db:seed` localmente; não são
     usadas em runtime pela aplicação)
3. Clique em **Deploy**. O `postinstall` do `package.json` já roda `prisma generate`
   automaticamente durante o build — nenhuma configuração extra é necessária.

## Checklist pós-deploy

- [ ] `https://seu-dominio/admin/login` abre e aceita o login do admin criado no passo 5
- [ ] Criar uma obra de teste pelo painel e confirmar que a capa faz upload/exibe corretamente
      (valida a conexão com o bucket do Supabase Storage)
- [ ] Criar um investidor de teste vinculado a essa obra e confirmar o login em
      `/investidor/login`
- [ ] Trocar a senha do admin pelo próprio painel e, se usada só para teste, excluir a obra/
      investidor de teste antes de liberar o sistema para uso real

## Notas de arquitetura

- **Runtime vs. migrations**: a aplicação usa `DATABASE_URL` (conexão via pooler, `pgbouncer`)
  em todo o runtime; o CLI do Prisma (`db:migrate`, `db:deploy`, `db:seed`) usa `DIRECT_URL`
  (conexão direta), configurado em `prisma.config.ts`. Isso é necessário porque o pooler em modo
  transaction não suporta os comandos DDL que as migrations precisam.
- **Uploads**: nunca ficam em `/public` nem em disco local (a Vercel não tem disco persistente
  entre requisições). Todo arquivo enviado pelo admin vai para o bucket privado do Supabase
  Storage e só é servido de volta através de `/api/arquivos/[...path]`, que reverifica a sessão
  e o vínculo investidor↔obra a cada requisição antes de liberar os bytes.
