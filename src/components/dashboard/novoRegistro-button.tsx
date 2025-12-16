"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { NovoRegistroGlicemico } from "./novoRegistro-dialog";

export function NovoRegistroGlicemicoButton({ userId }: { userId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full bg-white text-black">
          <PlusCircle size={13} />
          Novo dado Glicêmico
        </Button>
      </DialogTrigger>
      <NovoRegistroGlicemico userId={userId} />
    </Dialog>
  );
}
