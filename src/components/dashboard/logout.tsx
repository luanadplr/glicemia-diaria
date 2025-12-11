"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const handleLogOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/");
      },
    },
  });
};

export function Logout() {
  return <Button onClick={handleLogOut}>Logout</Button>;
}
