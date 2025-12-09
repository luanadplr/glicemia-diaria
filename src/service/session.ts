import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function useSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
