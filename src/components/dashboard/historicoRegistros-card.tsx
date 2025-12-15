import { prisma } from "@/lib/prisma";

export async function HistoricoRegistrosGlicemicos({
  userId,
}: {
  userId: string;
}) {
  const data = await prisma.glicemia.findMany({
    where: { usuarioId: userId },
  });
  return (
    <div>
      <h2>Histórico de Registros</h2>
      <ul>
        {data.map((glicemia) => (
          <li key={glicemia.id}>{glicemia.total}</li>
        ))}
      </ul>
    </div>
  );
}
