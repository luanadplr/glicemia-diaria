import { EditarNivelGlicemia } from "@/components/perfil/editarNivelGlicemia";
import { useSession } from "@/service/session";
import { redirect } from "next/navigation";

export default async function EditarPerfil() {
  const session = await useSession();
  if (!session) redirect("/login");
  const userData = session.user;

  return (
    <div className="bg-[#259D91] w-full h-screen flex items-center justify-center">
      <EditarNivelGlicemia
        userId={userData.id!}
        username={userData.username!}
        nivelGlicemia={userData.nivelGlicemia!}
      />
    </div>
  );
}
