"use client";

import * as z from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { checkUsername } from "@/service/prisma";
import { clientSession } from "@/service/client-session";
import { authClient } from "@/lib/auth-client";

function redirectToSignUp() {
  redirect("/cadastro");
}

const loginSchema = z.object({
  username: z.string().min(1, "Username inválido"),
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string(),
});

type loginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: loginData) {
    console.log(formData);
    const response = await checkUsername(formData.username);
    if (response.data === formData.username) {
      authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard/" + formData.username,
      });
    }
  }

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
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              {...form.register("username")}
              placeholder="Seu Username"
              className="text-sm"
            />
            <Input
              {...form.register("email")}
              placeholder="Seu Email"
              className="text-sm"
            />
            <Input
              {...form.register("password")}
              placeholder="Sua Senha"
              className="text-sm"
              type="password"
            />
            <Button className="cursor-pointer">Entrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
