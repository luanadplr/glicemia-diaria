"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  };

  return (
    <Button variant="link" className="text-white" onClick={handleLogOut}>
      <LogOutIcon />
      {loading ? "Deslogando..." : "Sair"}
    </Button>
  );
}
