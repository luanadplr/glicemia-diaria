"use server";

import { prisma } from "@/lib/prisma";

export async function prismaData(email: string) {
  const data = prisma.user.findFirst({
    where: { email },
  });
  return data;
}
