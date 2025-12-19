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

Função para pegar dados do usuário pelo userId

*/

export async function prismaUserData(userId: string) {
  const data = prisma.user.findUnique({
    where: { id: userId },
  });
  return data;
}

/*

Função para verificar se username já foi cadastrado

*/

export async function prismaHasUsername(username: string) {
  const hasUsername = await prisma.user.findFirst({
    where: { username },
  });

  if (hasUsername) {
    return {
      data: true,
      error: "Username ja cadastrado",
    };
  } else {
    return {
      data: false,
      error: null,
    };
  }
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

export async function updateUserData(
  data: any,
  userId: string,
  username: string
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      username,
      nivelGlicemia: data.nivelGlicemia,
    },
  });
}

/*

Função para pegar os dados da Glicemia do usuário  

*/

export async function findGlicemiaData(userId: string) {
  return prisma.glicemia.findMany({
    where: { usuarioId: userId },
  });
}

/*

Função para atualizar o Model Controle de Insulina no banco de dados

*/

export async function updateInsulinaData(userId: string, date: Date) {
  return prisma.insulina.create({
    data: {
      dataDeTroca: date,
      usuario: { connect: { id: userId } },
    },
  });
}
