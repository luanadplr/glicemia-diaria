import { DadosForm } from "@/components/registro/dados-form";
import { useSession } from "@/service/session";
import { redirect } from "next/navigation";

export default async function Dados() {
  const session = await useSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="bg-linear-to-l from-teal-300 to-emerald-400 w-full h-screen flex flex-col items-center justify-center">
      <DadosForm name={session.user.name} />
    </div>
  );
}
