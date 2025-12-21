import { prisma } from "@/lib/prisma";
import { prismaUserData } from "@/service/db";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  AlertTriangleIcon,
  CalendarIcon,
  Clock2Icon,
  DropletIcon,
  SaladIcon,
  Syringe,
} from "lucide-react";
import { NovoRegistroGlicemicoButton } from "./novoRegistro-button";
import { Badge } from "../ui/badge";

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
    <Card className="md:mr-5 md:ml-0 mx-5">
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
              {ultimaGlicemiaData?.total >= 600 ? (
                <Badge variant="destructive" className="mt-2">
                  <AlertTriangleIcon /> Muito Alta
                </Badge>
              ) : ultimaGlicemiaData?.total > dadosUser?.nivelGlicemia! ? (
                <Badge variant="destructive" className="mt-2">
                  Alta
                </Badge>
              ) : (
                <Badge className="bg-green-700 mt-2">Ideal</Badge>
              )}
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
                <li>
                  <Badge variant="secondary">
                    <Syringe size={18} />
                    {ultimaGlicemiaData?.aplicouInsulina === true
                      ? "Aplicou"
                      : "Não aplicou"}
                  </Badge>
                </li>
                <li>
                  <Badge variant="secondary">
                    <SaladIcon />{" "}
                    {ultimaGlicemiaData?.observacao === ""
                      ? "--"
                      : ultimaGlicemiaData?.observacao}
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
