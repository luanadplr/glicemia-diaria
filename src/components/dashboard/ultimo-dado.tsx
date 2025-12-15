import { prisma } from "@/lib/prisma";
import { prismaUserData } from "@/service/db";

export async function DadoRecente({ userId }: { userId: string }) {
  const glicemias = await prisma.glicemia.findMany({
    where: { usuarioId: userId },
  });

  // Pegar o último dado de glicemia registrado
  glicemias.reverse();
  const ultimaGlicemiaData = glicemias[0];

  // Pegar o nivel de glicemia registrado no cadastro do usuário
  const dadosUser = await prismaUserData(userId);
  const nivelGlicemiaUsario = dadosUser?.nivelGlicemia!;

  return (
    <div>
      <p>Aqui vai o dado: {ultimaGlicemiaData.total}</p>
      {glicemias[0].total > nivelGlicemiaUsario
        ? "É recomendado a Insulina"
        : "Não é recomendado a Insulina"}
    </div>
  );
}
