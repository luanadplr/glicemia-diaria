"use server";

/*

Função para verificar o usuário pelo email e retornar seus dados

*/

import { prisma } from "@/lib/prisma";

export async function prismaData(email: string) {
  const data = prisma.user.findFirst({
    where: { email },
  });
  return data;
}

/*

Função para registrar novo dado de Glicemia no Banco de dados

*/

interface Glicemia {
  total: number;
  aplicouInsulina: boolean;
  data: Date;
  hora: string;
  observacao: string | undefined;
}

export async function glicemiaUpdate(data: Glicemia, userId: string) {
  return prisma.glicemia.create({
    data: {
      total: data.total,
      aplicouInsulina: data.aplicouInsulina,
      data: data.data,
      hora: data.hora,
      observacao: data.observacao,
      usuario: { connect: { id: userId } },
    },
  });
}

/*

 Função para atualizar os dados no banco de dados 
 na rota /cadastro/dados

*/

export async function updateUserData(data: any, userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      nivelGlicemia: data.nivelGlicemia,
    },
  });
}
