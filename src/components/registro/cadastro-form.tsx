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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Insira um email válido" }),
    password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
    name: z.string().min(1, "O nome é obrigatório"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não correspondem",
    path: ["confirmPassword"],
  });

export function CadastroForm() {
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState("password");

  const form = useForm<signupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: signupValues) {
    setLoading(true);
    await novoUsuario(formData);
  }

  function handleSeePassword() {
    seePassword === "password"
      ? setSeePassword("text")
      : setSeePassword("password");
  }

  const router = useRouter();

  return (
    <Card className="w-full max-w-md mx-5 my-0">
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
              <InputGroup>
                <InputGroupInput
                  {...form.register("password")}
                  id="password"
                  placeholder="Senha"
                  className="text-sm p-5"
                  autoComplete="off"
                  type={seePassword}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={handleSeePassword}>
                    {seePassword === "password" ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldError className="text-[12px]">
                {form.formState.errors.password?.message}
              </FieldError>
            </Field>
            <Field>
              <Input
                {...form.register("confirmPassword")}
                placeholder="Digite novamente a senha"
                className="text-sm p-5"
                autoComplete="off"
                type={seePassword}
                id="doublePassword"
              />
              <FieldError>
                {form.formState.errors.confirmPassword?.message}
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
        <div className="flex flex-col items-center text-sm mt-2">
          Já possui uma conta?
          <Link href="/login" replace className="underline">
            Faça Login.
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
