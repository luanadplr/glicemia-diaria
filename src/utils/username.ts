import * as z from "zod";
import { createUsername } from "@/utils/create-username";
import { useSession } from "../service/session";
import { prisma } from "@/lib/prisma";

const usernameSchema = z.object({
  username: z.string().min(1, "O username é obrigatório"),
});

type Username = z.infer<typeof usernameSchema>;

export async function Username(data: Username) {
  const session = await useSession();
  if (!session?.user)
    return {
      data: null,
      error: "Usuário não logado",
    };

  const schema = usernameSchema.safeParse(data);

  if (!schema.success)
    return {
      data: null,
      error: schema.error.issues[0].message,
    };

  try {
    const username = createUsername(data.username);
    const userId = session.user.id;

    const hasUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (!hasUsername) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          username,
        },
      });
    } else {
      return {
        data: null,
        error: "Username indisponivel",
      };
    }

    return {
      data: username,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
}
