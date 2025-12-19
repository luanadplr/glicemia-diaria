"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { updateInsulinaData } from "@/service/db";
import { useRouter } from "next/navigation";

export function ControleInsulinaButton({ userId }: { userId: string }) {
  const router = useRouter();

  async function handleInsulinaButton() {
    await updateInsulinaData(userId, new Date());
    router.refresh();
  }

  return (
    <Button
      onClick={handleInsulinaButton}
      className="text-center rounded-full mt-4 bg-[#259D91] text-white border hover:bg-[#259d91c1]"
    >
      <PlusCircleIcon />
      Atualizar data de troca da Insulina
    </Button>
  );
}
