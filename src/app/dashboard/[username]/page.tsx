import { AvisoInsulinaBadge } from "@/components/dashboard/avisoInsulina-badge";
import { GraficoGlicemicoCard } from "@/components/dashboard/graficoGlicemico-card";
import { HistoricoRegistrosGlicemicos } from "@/components/dashboard/historicoRegistros-card";
import { NovoRegistroGlicemico } from "@/components/dashboard/novoRegistro-dialog";
import { UltimoRegistroGlicemico } from "@/components/dashboard/ultimoRegistro-card";
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
    <div className="grid grid-cols-[auto_auto] grid-rows-[auto_1fr_1fr_1fr_auto] gap-4 h-screen">
      <section className="col-span-3 p-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl text-[#259D91]">Seu Dashboard</h1>
          <p className="text-muted-foreground text-[13px]">
            Seja Bem Vindo, {session.user.name}
          </p>
        </div>
        <div>
          <AvisoInsulinaBadge />
        </div>
      </section>
      <section className="col-span-2 row-span-2 ">
        <GraficoGlicemicoCard />
      </section>
      <section className="">
        <UltimoRegistroGlicemico userId={session.user.id} />
      </section>
      <section className="bg-amber-950">
        <div>Aréa da Insuliina</div>
      </section>
      <section className="col-span-3 bg-amber-100">
        <div>Histórico</div>
      </section>
      <section className="col-span-3 bg-foreground">
        <div>Rodapé simples</div>
      </section>

      {/* <section className="row-span-4 bg-white w-48 p-4">
        <Logo />
        <MenuSheet name={session.user.name} />
      </section>
      <section className="col-span-2">
        
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
      </section> */}
    </div>
  );
}

// bg-linear-to-l from-teal-300 to-emerald-400
