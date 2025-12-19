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
import { createUsername } from "@/utils/create-username";
import { editarPerfilUsername, prismaHasUsername } from "@/service/db";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldError } from "../ui/field";

const UsernameSchema = z.object({
  username: z.string().min(1, "Insira um username"),
});

type UsernameForm = z.infer<typeof UsernameSchema>;

export function EditarUsernameCard({ userId }: { userId: string }) {
  const form = useForm<UsernameForm>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const router = useRouter();

  async function onSubmit(formData: UsernameForm) {
    const newUsername = createUsername(formData.username);
    const hasUsername = await prismaHasUsername(newUsername);

    if (hasUsername.data) {
      toast.error(hasUsername.error);
    } else {
      await editarPerfilUsername(userId, newUsername);
      router.push("/dashboard/" + newUsername);
    }
  }

  return (
    <Card className="w-full max-w-md flex flex-col justify-between">
      <CardHeader className="text-sm">
        <Logo />
        <CardDescription> Altere seu Username </CardDescription>
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
                {...form.register("username")}
                placeholder="Novo Username"
              />
              <FieldError>{form.formState.errors.username?.message}</FieldError>
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
