"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { updateInsulinaData } from "@/service/db";

export function ControleInsulinaButton({ userId }: { userId: string }) {
  async function handleInsulinaButton() {
    await updateInsulinaData(userId, new Date());
  }

  return (
    <Button
      onClick={handleInsulinaButton}
      className="text-center rounded-full mt-4 bg-[#259D91] text-white border"
    >
      <PlusCircleIcon />
      Novo Registro de Insulina
    </Button>
  );
}
