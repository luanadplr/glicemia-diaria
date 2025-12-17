import { prisma } from "@/lib/prisma";
import { prismaUserData } from "@/service/db";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CalendarIcon, Clock2Icon, DropletIcon, Syringe } from "lucide-react";
import { NovoRegistroGlicemicoButton } from "./novoRegistro-button";

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

  const dataRegistro = `${ultimaGlicemiaData?.data.getUTCDate()}/${
    ultimaGlicemiaData?.data.getMonth() + 1
  }`;

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
        {glicemias.length === 0 ? (
          <div className="h-full flex flex-col gap-3 items-start">
            <p>Você ainda não tem nenhum registro</p>
            <NovoRegistroGlicemicoButton userId={dadosUser?.id!} />
          </div>
        ) : (
          <div className="flex justify-around">
            <div>
              <p className="font-bold text-5xl">
                {ultimaGlicemiaData?.total}
                <span className="font-normal text-muted-foreground text-sm ml-1">
                  mg/dL
                </span>
              </p>
              <div className="text-sm mt-3 border rounded-full p-1 text-center">
                {ultimaGlicemiaData?.total > dadosUser?.nivelGlicemia!
                  ? "Alta"
                  : "Ideal"}
              </div>
            </div>
            <div>
              <ul>
                <li className="flex gap-1 items-center">
                  <CalendarIcon size={18} />
                  {dataRegistro}
                </li>
                <li className="flex gap-1 items-center">
                  <Clock2Icon size={18} />
                  {ultimaGlicemiaData?.hora.slice(0, 5)}
                </li>
                <li className="flex gap-1 items-center text-sm">
                  <Syringe size={18} />
                  {ultimaGlicemiaData?.aplicouInsulina === true
                    ? "Aplicou"
                    : "Não aplicou"}
                </li>
                <li className="text-sm">Em Jejum</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
