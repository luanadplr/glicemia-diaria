"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
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

/*

Verificar se o username ja existe no banco de dados

*/

export async function checkUsername(username: string) {
  const hasUsername = await prisma.user.findUnique({ where: { username } });
  if (!hasUsername) {
    return {
      data: null,
      error: "Username não encontrado",
    };
  } else {
    return {
      data: username,
      error: null,
    };
  }
}
