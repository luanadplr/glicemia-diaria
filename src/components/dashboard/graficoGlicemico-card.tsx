import { prisma } from "@/lib/prisma";
import { useSession } from "@/service/session";
import { Card, CardContent, CardHeader } from "../ui/card";
import { GraficoGlicemicoChart } from "./graficoGlicemico-chart";

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

  return (
    <Card className="h-300px w-100">
      <CardHeader>Gráfico Glicêmico</CardHeader>
      <CardContent>
        <GraficoGlicemicoChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}
