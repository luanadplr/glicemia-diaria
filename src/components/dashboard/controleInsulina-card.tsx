import { CalendarIcon, PlusCircleIcon, SyringeIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

export function ControleInsulinaCard() {
  return (
    <Card className="h-full mr-5">
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-chart-2 opacity-60 rounded-md p-1">
            <SyringeIcon className="text-white" />
          </div>
          <p className="font-semibold">Controle de Insulina </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex gap-2 text-muted-foreground items-center text-sm">
            <CalendarIcon />
            Última troca:
          </div>
          <p className="font-medium text-xl">16/12/2025</p>
        </div>
        <Button className="text-center rounded-full mt-4 bg-[#259D91] text-white border">
          <PlusCircleIcon />
          Novo Registro de Insulina
        </Button>
      </CardContent>
    </Card>
  );
}
