import { Logout } from "@/components/dashboard/logout";
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

  // Impedir de acessar a área do Dashboard caso não esteja logado
  const session = await useSession();
  if (!session) return redirect("/");

  const userId = session.user.id;

  const hasUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (!hasUsername) return redirect("/");

  return (
    <>
      <h1>Dashboard {username}</h1>
      <Logout />
    </>
  );
}
