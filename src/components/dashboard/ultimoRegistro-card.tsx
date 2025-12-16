import { prisma } from "@/lib/prisma";
import { prismaUserData } from "@/service/db";
import { Card, CardContent, CardHeader } from "../ui/card";
import { DropletIcon } from "lucide-react";

export async function UltimoRegistroGlicemico({ userId }: { userId: string }) {
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
    <Card className="mr-5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-chart-2 opacity-60 rounded-md p-1">
            <DropletIcon className="text-white" />
          </div>
          <p className="font-semibold">Último Registro</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>Aqui vai o dado: {ultimaGlicemiaData.total}</p>
        {glicemias[0].total > nivelGlicemiaUsario
          ? "É recomendado a Insulina"
          : "Não é recomendado a Insulina"}
      </CardContent>
    </Card>
  );
}
