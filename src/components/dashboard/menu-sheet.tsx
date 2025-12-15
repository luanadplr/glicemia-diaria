"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { Button } from "@/components/ui/button";

interface Props {
  name: string | undefined;
}

export function MenuSheet({ name }: Props) {
  return (
    <Sheet>
      <SheetTrigger className="border rounded-md p-1 cursor-pointer">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          <h2>Olá, {name}</h2>
          <ul>
            <li>
              <Button className="cursor-pointer" variant="link">
                Editar Perfil ↗
              </Button>
            </li>
          </ul>
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
