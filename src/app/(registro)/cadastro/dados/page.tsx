import { useSession } from "@/service/session";

export default async function Dados() {
  const session = await useSession();
  if (!session) {
    return <h2>Voce nao esta logado</h2>;
  } else {
    return <h2>LOGADO COM SUCESSO {session?.user.name}</h2>;
  }
}
