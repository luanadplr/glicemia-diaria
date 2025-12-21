import { DadosForm } from "@/components/registro/dados-form";
import { useSession } from "@/service/session";
import { redirect } from "next/navigation";

export default async function Dados() {
  const session = await useSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="bg-[#259D91] w-full h-screen flex flex-col items-center justify-center">
      <DadosForm />
    </div>
  );
}
