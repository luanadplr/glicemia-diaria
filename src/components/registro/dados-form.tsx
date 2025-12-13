"use client";

import * as z from "zod";
import { Logo } from "../logo";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Field, FieldError } from "../ui/field";
import { Button } from "../ui/button";
import { updateUserData } from "@/service/db";
import { clientSession } from "@/service/client-session";
import { redirect } from "next/navigation";
import { useState } from "react";

const schemaFormDados = z.object({
  username: z.string().min(1, "O username é obrigatório"),
  nivelGlicemia: z.number().min(1, "O nível de glicemia é obrigatório"),
});

type FormDados = z.infer<typeof schemaFormDados>;

const session = await clientSession();
if (!session) redirect("/");

export function DadosForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormDados>({
    resolver: zodResolver(schemaFormDados),
    defaultValues: {
      username: "",
      nivelGlicemia: 0,
    },
  });

  const userId = session.data?.user.id;

  async function onSubmit(formData: FormDados) {
    setLoading(true);

    try {
      await updateUserData(formData, userId!);
    } catch (error) {
      return {
        data: null,
        error,
      };
    }

    redirect("/dashboard/" + formData.username);
  }

  return (
    <Card className="w-full max-w-md flex flex-col justify-between">
      <CardHeader>
        <div className="text-sm">
          <Logo />
        </div>
        <h2 className="font-bold">Insira suas informações</h2>
        <CardAction className="text-sm text-muted-foreground">
          {session.data?.user.name}
        </CardAction>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <Field>
              <Label htmlFor="username">Escolha um Username</Label>
              <Input
                {...form.register("username")}
                type="text"
                placeholder="Seu Username"
                className="text-sm"
                id="username"
                autoComplete="off"
              />
              <FieldError className="text-[12px]">
                {form.formState.errors.username?.message}
              </FieldError>
            </Field>
            <Field>
              <Label htmlFor="glicemia">
                Qual seu nível de Glicemia para tomar Insulina?
              </Label>
              <Input
                {...form.register("nivelGlicemia", { valueAsNumber: true })}
                type="number"
                placeholder="Nível de Glicemia"
                className="text-sm"
                id="glicemia"
              />
              <FieldError className="text-[12px]">
                {form.formState.errors.nivelGlicemia?.message}
              </FieldError>
            </Field>
            <Button type="submit">{loading ? "Enviando..." : "Enviar"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
