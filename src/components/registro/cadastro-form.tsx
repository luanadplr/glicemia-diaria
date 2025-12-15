"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { signupValues, novoUsuario } from "@/service/authentication";
import { Logo } from "../logo";
import { Card, CardHeader, CardDescription, CardContent } from "../ui/card";

const signupSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "O nome é obrigatório"),
});

export function CadastroForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<signupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(formData: signupValues) {
    setLoading(true);
    await novoUsuario(formData);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="text-sm">
          <Logo />
        </div>
        <h2 className="font-bold">Crie uma conta</h2>
        <CardDescription>
          Seu registro glicêmico na palma da mão
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-3 flex flex-col gap-2"
          >
            <Field>
              <Input
                {...form.register("email")}
                id="email"
                placeholder="Email"
                className="text-sm p-5"
              />
              <FieldError className="text-[12px]">
                {form.formState.errors.email?.message}
              </FieldError>
            </Field>
            <Field>
              <Input
                {...form.register("password")}
                type="password"
                id="password"
                placeholder="Senha"
                className="text-sm p-5"
                autoComplete="off"
              />
              <FieldError className="text-[12px]">
                {form.formState.errors.password?.message}
              </FieldError>
            </Field>
            <Field>
              <Input
                {...form.register("name")}
                type="text"
                id="name"
                placeholder="Primeiro Nome"
                className="text-sm p-5"
              />
              <FieldError className="text-[12px]">
                {form.formState.errors.name?.message}
              </FieldError>
            </Field>
            <Button type="submit" disabled={loading} className="mt-3">
              {loading ? "Carregando..." : "Cadastrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
