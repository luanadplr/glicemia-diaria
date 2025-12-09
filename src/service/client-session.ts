import { authClient } from "@/lib/auth-client";

export async function getClientSession() {
  return authClient.getSession();
}
