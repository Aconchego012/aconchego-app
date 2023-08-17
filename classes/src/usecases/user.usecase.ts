import { PrismaClient } from "@prisma/client";

export async function createUser(message: string) {
  const prisma = new PrismaClient();

  const user: any = JSON.parse(message);

  await prisma.student.create({
    data: {
      id: user.id,
    },
  });

  console.log("User created!");
}
