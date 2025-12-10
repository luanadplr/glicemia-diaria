"use client";

import { redirect } from "next/navigation";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardAction,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";

function redirectToSignUp() {
  redirect("/cadastro");
}

export function LoginForm() {
  return (
    <Card className="w-full max-w-md flex flex-col justify-between">
      <CardHeader>
        <div className="text-sm">
          <Logo />
        </div>
        <h2 className="font-bold">Faça seu Login</h2>
        <CardDescription>
          Seu registro glicêmico na palma da mão
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={redirectToSignUp}
          >
            Cadastro
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="gap-4 text-center flex flex-col justify-between">
        <Input placeholder="Seu Username" className="text-sm" />
        <Button className="cursor-pointer">Entrar</Button>
      </CardContent>
    </Card>
  );
}
