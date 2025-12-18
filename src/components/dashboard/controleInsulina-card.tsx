import { CalendarIcon, SyringeIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useSession } from "@/service/session";
import { ControleInsulinaButton } from "./controleInsulina-button";
import { prisma } from "@/lib/prisma";

export async function ControleInsulinaCard() {
  const session = await useSession();
  const userData = session?.user;

  const userInsulina = await prisma.insulina.findFirst({
    where: { usuarioId: userData?.id },
  });

  return (
    <Card className="h-full md:mr-5 md:ml-0 mx-5">
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
          <p className="font-medium text-xl">
            {userInsulina?.dataDeTroca
              ? userInsulina?.dataDeTroca.toLocaleDateString("pt-BR")
              : "--/--/----"}
          </p>
        </div>
        <ControleInsulinaButton userId={userData?.id!} />
      </CardContent>
    </Card>
  );
}
