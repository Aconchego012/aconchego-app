import { PrismaClient } from "@prisma/client";

export async function createUser(message: string) {
  const prisma = new PrismaClient();

  const user: any = JSON.parse(message);

  if (user.role === "STUDENT") {
    await prisma.student.create({
      data: {
        id: user.id,
      },
    });
  } else if (user.role === "TEACHER") {
    await prisma.teacher.create({
      data: {
        id: user.id,
      },
    });
  }

  console.log("User created!");
}
