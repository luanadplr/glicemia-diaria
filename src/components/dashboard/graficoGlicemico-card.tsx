import { prisma } from "@/lib/prisma";
import { useSession } from "@/service/session";
import { Card, CardContent, CardHeader } from "../ui/card";
import { GraficoGlicemicoChart } from "./graficoGlicemico-chart";
import { TrendingUpIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { NovoRegistroGlicemicoButton } from "./novoRegistro-button";

export async function GraficoGlicemicoCard() {
  const session = await useSession();
  const data = session?.user;

  const glicemias = await prisma.glicemia.findMany({
    where: { usuarioId: data?.id },
  });

  const chartData = glicemias.map((item) => ({
    date: item.data.toLocaleDateString("pt-BR"),
    Valor: item.total,
  }));

  const timeDate = new Date();
  const month = timeDate.getMonth();
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <Card className="md:ml-5 md:w-auto min-w-0 h-full min-h-0 mx-5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-chart-2 opacity-60 rounded-md p-1">
            <TrendingUpIcon className="text-white" />
          </div>
          <p className="font-semibold">Gráfico Glicêmico</p>
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={meses[month]} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Meses</SelectLabel>
              {meses.map((mes) => (
                <SelectItem key={mes} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="md:m-auto">
        {glicemias.length === 0 ? (
          <div className="h-full flex flex-col gap-3">
            <p>Você ainda não tem nenhum registro</p>
            <NovoRegistroGlicemicoButton userId={data?.id!} />
          </div>
        ) : (
          <GraficoGlicemicoChart chartData={chartData} />
        )}
      </CardContent>
    </Card>
  );
}
