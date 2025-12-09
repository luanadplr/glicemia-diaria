import { getSession } from "@/service/session";
import { redirect } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function Dashboard({ params }: Props) {
  const { username } = await params;
  const session = await getSession();

  // Impedir de acessar a área do Dashboard caso não esteja logado
  if (!session) redirect("/login");

  return <h1>Dashboard do {session?.user.name}</h1>;
}
