"use client";

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
import { useState } from "react";

type Glicemia = {
  data: Date;
  total: number;
  id: string;
  aplicouInsulina: boolean;
  hora: string;
  observacao: string | null;
  usuarioId: string;
};

export function GraficoGlicemicoCard({
  userData,
  dataGlicemia,
}: {
  userData: any;
  dataGlicemia: Glicemia[];
}) {
  const user = userData;
  const glicemias = dataGlicemia;

  const month = new Date().getMonth();
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

  const [selected, setSelected] = useState(month.toString());

  const handleSelect = (value: string) => {
    setSelected(value);
    console.log("Valor selecionado: ", value);
  };

  // Exibir dados apenas do mês selecionado

  const glicemiaCadaMes = glicemias.filter(
    (item) => item.data.getMonth() === Number(selected)
  );

  const chartData = glicemiaCadaMes.map((item) => ({
    date: item.data.toLocaleDateString("pt-BR"),
    Valor: item.total,
  }));

  return (
    <Card className="md:ml-5 md:w-auto min-w-0 h-full min-h-0 mx-5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-chart-2 opacity-60 rounded-md p-1">
            <TrendingUpIcon className="text-white" />
          </div>
          <p className="font-semibold">Gráfico Glicêmico</p>
        </div>
        <Select onValueChange={handleSelect} defaultValue={selected}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Meses</SelectLabel>
              {meses.map((mes, index) => (
                <SelectItem key={mes} value={index.toString()}>
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
            <NovoRegistroGlicemicoButton userId={user.id!} />
          </div>
        ) : glicemiaCadaMes.length === 0 ? (
          <p className="center">Esse mês não há registros</p>
        ) : (
          <GraficoGlicemicoChart
            chartData={chartData}
            nivelGlicemia={user?.nivelGlicemia!}
          />
        )}
      </CardContent>
    </Card>
  );
}
