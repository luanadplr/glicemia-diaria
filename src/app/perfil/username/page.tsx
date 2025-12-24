import { EditarUsernameCard } from "@/components/perfil/editarUsername-card";
import { useSession } from "@/service/session";
import { redirect } from "next/navigation";

export default async function EditarPerfil() {
  const session = await useSession();
  if (!session) redirect("/login");
  const userData = session.user;

  return (
    <div className="bg-[#259D91] w-full h-screen flex items-center justify-center">
      <EditarUsernameCard userId={userData.id!} />
    </div>
  );
}
