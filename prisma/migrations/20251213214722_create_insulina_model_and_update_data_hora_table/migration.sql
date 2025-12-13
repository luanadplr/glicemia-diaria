/*
  Warnings:

  - You are about to drop the column `dataHora` on the `Glicemia` table. All the data in the column will be lost.
  - You are about to drop the `Fitas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fitas" DROP CONSTRAINT "Fitas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Glicemia" DROP CONSTRAINT "Glicemia_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Glicemia" DROP COLUMN "dataHora",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hora" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Fitas";

-- CreateTable
CREATE TABLE "Insulina" (
    "id" TEXT NOT NULL,
    "dataDeTroca" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Insulina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Insulina_usuarioId_key" ON "Insulina"("usuarioId");

-- AddForeignKey
ALTER TABLE "Glicemia" ADD CONSTRAINT "Glicemia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insulina" ADD CONSTRAINT "Insulina_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
