import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/*

Função para pegar os dados do usuário logado pela sessão

*/

export async function useSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
