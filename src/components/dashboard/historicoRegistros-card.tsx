import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ClockFadingIcon } from "lucide-react";
import { HistoricoRegistrosLista } from "./historicoRegistros-list";

export async function HistoricoRegistrosGlicemicos({
  userId,
}: {
  userId: string;
}) {
  const dataGlicemia = await prisma.glicemia.findMany({
    where: { usuarioId: userId },
  });

  const dataUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  const userNivelGlicemia = dataUser?.nivelGlicemia!;

  dataGlicemia.reverse();

  return (
    <Card className="md:w-auto md:mx-5">
      <CardHeader>
        <div className="flex gap-3 items-center">
          <div className="bg-chart-2 opacity-60 rounded-md p-1">
            <ClockFadingIcon className="text-white" />
          </div>
          <p className="font-semibold">Histórico de Registros</p>
        </div>
      </CardHeader>
      <CardContent>
        <HistoricoRegistrosLista
          dataGlicemia={dataGlicemia}
          nivelGlicemia={userNivelGlicemia}
        />
      </CardContent>
    </Card>
  );
}
