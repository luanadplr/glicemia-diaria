import { authClient } from "@/lib/auth-client";

export async function clientSession() {
  return authClient.getSession();
}
