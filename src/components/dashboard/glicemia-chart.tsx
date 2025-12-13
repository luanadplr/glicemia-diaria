import { prisma } from "@/lib/prisma";
import { useSession } from "@/service/session";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Chart } from "./chart";

export async function ChartGlicemico() {
  const session = await useSession();
  const data = session?.user;

  const glicemias = await prisma.glicemia.findMany({
    where: { usuarioId: data?.id },
  });

  const chartData = glicemias.map((item) => ({
    date: item.data.toLocaleDateString("pt-BR"),
    Valor: item.total,
  }));

  return (
    <Card className="max-w-md m-auto">
      <CardHeader>Gráfico Glicêmico</CardHeader>
      <CardContent>
        <Chart chartData={chartData} />
      </CardContent>
    </Card>
  );
}
