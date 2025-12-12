"use client";

import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

export function Logout() {
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
    <Button className="cursor-pointer" onClick={handleLogOut}>
      {loading ? "Deslogando..." : "Sair"}
    </Button>
  );
}
