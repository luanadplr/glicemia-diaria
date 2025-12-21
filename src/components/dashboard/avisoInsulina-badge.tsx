import { prisma } from "@/lib/prisma";
import { Badge } from "../ui/badge";
import { AlertTriangleIcon, SyringeIcon } from "lucide-react";

export async function AvisoInsulinaBadge({
  nivelGlicemia,
  userId,
}: {
  nivelGlicemia: number;
  userId: string;
}) {
  const ultimoRegistroGlicemiaLista = await prisma.glicemia.findMany({
    where: { usuarioId: userId },
  });

  ultimoRegistroGlicemiaLista.reverse();

  if (nivelGlicemia === null || ultimoRegistroGlicemiaLista.length === 0) {
    return <></>;
  } else {
    if (ultimoRegistroGlicemiaLista[0].total >= 600) {
      return (
        <Badge variant="destructive">
          <AlertTriangleIcon /> Hi - Muito Alta
          <SyringeIcon /> Recomendado uso de Insulina
        </Badge>
      );
    }
    if (ultimoRegistroGlicemiaLista[0].total > nivelGlicemia) {
      return (
        <Badge variant="destructive">
          {ultimoRegistroGlicemiaLista[0].total}mg/dL - Alta
          <SyringeIcon /> Recomendado uso de Insulina
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" className="bg-green-700">
          {ultimoRegistroGlicemiaLista[0].total}mg/dL - Ideal
        </Badge>
      );
    }
  }
}
