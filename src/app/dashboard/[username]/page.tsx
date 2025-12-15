import { GraficoGlicemicoCard } from "@/components/dashboard/graficoGlicemico-card";
import { HistoricoRegistrosGlicemicos } from "@/components/dashboard/historicoRegistros-card";
import { MenuSheet } from "@/components/dashboard/menu-sheet";
import { NovoRegistroGlicemico } from "@/components/dashboard/novoRegistro-dialog";
import { UltimoRegistroGlicemico } from "@/components/dashboard/ultimoRegistro-card";
import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
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

  if (!hasUsername) {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  }

  return (
    <main className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_1fr_auto] gap-4 h-screen">
      <section className="row-span-4 bg-white w-48 p-4">
        <Logo />
        <MenuSheet name={session.user.name} />
      </section>
      <section className="col-span-2">
        <GraficoGlicemicoCard />
      </section>
      <section className="col-start-2 row-start-2">
        <UltimoRegistroGlicemico userId={session.user.id} />
      </section>
      <section className="col-start-3 row-start-2">
        <div>Ainda estou pensando...</div>
      </section>
      <section className="col-start-2 row-start-3">
        <NovoRegistroGlicemico userId={session.user.id} />
        <div>Badge de última troca de insulina ??</div>
      </section>
      <section className="col-span-2 col-start-2 row-start-4">
        <HistoricoRegistrosGlicemicos userId={session.user.id} />
      </section>
    </main>
  );
}

// bg-linear-to-l from-teal-300 to-emerald-400
