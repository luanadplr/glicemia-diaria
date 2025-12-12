/* 

Registrar um novo usuário

*/

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "O nome é obrigatório"),
});

export type signupValues = z.infer<typeof signupSchema>;

export async function novoUsuario(formData: signupValues) {
  const { data, error } = await authClient.signUp.email(
    {
      email: formData.email,
      password: formData.password,
      name: formData.name,
    },
    {
      onSuccess: (context) => {
        redirect("/cadastro/dados");
      },
      onError: (context) => {
        if (context.error.status === 422) {
          toast.error("Email já cadastrado");
        }
        redirect("/login");
      },
    }
  );
}
