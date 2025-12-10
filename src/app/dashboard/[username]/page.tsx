import { redirect } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function Dashboard({ params }: Props) {
  const { username } = await params;

  // Impedir de acessar a área do Dashboard caso não esteja logado

  return <h1>Dashboard {username}</h1>;
}
