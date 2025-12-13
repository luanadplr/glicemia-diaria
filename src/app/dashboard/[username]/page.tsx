import { MenuSheeter } from "@/components/dashboard/menu-sheeter";
import { NovoDadoGlicemico } from "@/components/dashboard/nova-glicemia";
import { Logo } from "@/components/logo";
import { prisma } from "@/lib/prisma";
import { useSession } from "@/service/session";
import { redirect } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function Dashboard({ params }: Props) {
  const { username } = await params;
  const session = await useSession();

  // Impedir de acessar a área do Dashboard caso não esteja logado
  if (!session) return redirect("/");

  // Verificar se o username no parametro existe, se não, redireciona ao login
  const hasUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (!hasUsername) return redirect("/");

  return (
    <div className="bg-linear-to-l from-teal-300 to-emerald-400 w-full h-screen flex flex-col">
      <section className="flex flex-row justify-between p-2 items-center bg-white">
        <Logo />
        <MenuSheeter name={session.user.name} />
      </section>
      <section>
        <NovoDadoGlicemico userId={session.user.id} />
      </section>
    </div>
  );
}
