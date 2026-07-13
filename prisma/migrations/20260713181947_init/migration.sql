-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Investidor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "documento" TEXT,
    "senhaHash" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "adminId" TEXT,
    "investidorId" TEXT,
    "userAgent" TEXT,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sessao_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Sessao_investidorId_fkey" FOREIGN KEY ("investidorId") REFERENCES "Investidor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Obra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "codigoInterno" TEXT NOT NULL,
    "endereco" TEXT,
    "bairro" TEXT,
    "cidade" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "descricao" TEXT,
    "dataInicio" DATETIME,
    "previsaoEntrega" DATETIME,
    "percentualExecucao" INTEGER NOT NULL DEFAULT 0,
    "capaPath" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "arquivada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InvestidorObra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "investidorId" TEXT NOT NULL,
    "obraId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InvestidorObra_investidorId_fkey" FOREIGN KEY ("investidorId") REFERENCES "Investidor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InvestidorObra_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EtapaCronograma" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obraId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "percentual" INTEGER NOT NULL DEFAULT 0,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "dataConclusao" DATETIME,
    CONSTRAINT "EtapaCronograma_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Atualizacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obraId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Atualizacao_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Midia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obraId" TEXT NOT NULL,
    "atualizacaoId" TEXT,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT,
    "descricao" TEXT,
    "categoria" TEXT,
    "arquivoPath" TEXT NOT NULL,
    "mesReferencia" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Midia_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Midia_atualizacaoId_fkey" FOREIGN KEY ("atualizacaoId") REFERENCES "Atualizacao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "obraId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "arquivoPath" TEXT NOT NULL,
    "permiteDownload" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Documento_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investidor_email_key" ON "Investidor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sessao_token_key" ON "Sessao"("token");

-- CreateIndex
CREATE INDEX "Sessao_token_idx" ON "Sessao"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Obra_codigoInterno_key" ON "Obra"("codigoInterno");

-- CreateIndex
CREATE INDEX "InvestidorObra_obraId_idx" ON "InvestidorObra"("obraId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestidorObra_investidorId_obraId_key" ON "InvestidorObra"("investidorId", "obraId");

-- CreateIndex
CREATE INDEX "EtapaCronograma_obraId_idx" ON "EtapaCronograma"("obraId");

-- CreateIndex
CREATE INDEX "Midia_obraId_idx" ON "Midia"("obraId");

-- CreateIndex
CREATE INDEX "Midia_atualizacaoId_idx" ON "Midia"("atualizacaoId");

-- CreateIndex
CREATE INDEX "Documento_obraId_idx" ON "Documento"("obraId");
