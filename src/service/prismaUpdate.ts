"use server";

/*

 Função para atualizar os dados no banco de dados 

*/

import { prisma } from "@/lib/prisma";

export async function updateUserData(data: any, userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      nivelGlicemia: data.nivelGlicemia,
    },
  });
}
