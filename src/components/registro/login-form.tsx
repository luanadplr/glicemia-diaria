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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { Field, FieldDescription } from "../ui/field";
import { prismaData } from "@/service/prismaData";

function redirectToSignUp() {
  redirect("/cadastro");
}

const loginSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string(),
});

type loginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);

  const form = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: loginData) {
    setLoading(true);

    const response = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    const userData = await prismaData(formData.email);

    if (response.error) {
      toast.error("Email ou Senha inválidos");
      setLoading(false);
      setForgetPassword(true);
      form.reset();
    } else {
      redirect("/dashboard/" + userData?.username);
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
            <Field>
              <Input
                {...form.register("email")}
                placeholder="Seu Email"
                className="text-sm"
              />
            </Field>
            <Field>
              <Input
                {...form.register("password")}
                placeholder="Sua Senha"
                className="text-sm"
                type="password"
              />
              {forgetPassword && (
                <FieldDescription>
                  <Button className="text-[13px]" variant="link">
                    Esqueceu sua senha?
                  </Button>
                </FieldDescription>
              )}
            </Field>
            <Button className="cursor-pointer">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
