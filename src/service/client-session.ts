import { authClient } from "@/lib/auth-client";

export async function clientSession() {
  const session = await authClient.getSession();
  return { session };
}
