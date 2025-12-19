"use client";

import * as z from "zod";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldError } from "../ui/field";
import { editarPerfilNivelGlicemia } from "@/service/db";

const GlicemiaSchema = z.object({
  novoNivelGlicemia: z.number().min(1, "Insira um novo valor"),
});

type GlicemiaForm = z.infer<typeof GlicemiaSchema>;

export function EditarNivelGlicemia({
  userId,
  username,
  nivelGlicemia,
}: {
  userId: string;
  username: string;
  nivelGlicemia: number;
}) {
  const form = useForm<GlicemiaForm>({
    resolver: zodResolver(GlicemiaSchema),
    defaultValues: {
      novoNivelGlicemia: 0,
    },
  });

  const router = useRouter();

  async function onSubmit(formData: GlicemiaForm) {
    try {
      await editarPerfilNivelGlicemia(userId, formData.novoNivelGlicemia);
      router.push("/dashboard/" + username);
    } catch (error) {
      toast.error("Algo deu errado!");
    }
  }

  return (
    <Card className="w-full max-w-md flex flex-col justify-between">
      <CardHeader className="text-sm">
        <Logo />
        <CardDescription>
          Altere seu nível de glicemia | Nível atual: {nivelGlicemia}
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => router.back()}>
            Voltar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Field>
              <Input
                {...form.register("novoNivelGlicemia", { valueAsNumber: true })}
                placeholder="Novo Valor Glicêmico Ideal"
                type="number"
              />
              <FieldError>
                {form.formState.errors.novoNivelGlicemia?.message}
              </FieldError>
            </Field>
            <Button type="submit" className="w-full mt-3">
              Alterar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
