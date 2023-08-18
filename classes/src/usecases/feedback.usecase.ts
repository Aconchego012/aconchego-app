import { PrismaClient } from "@prisma/client";

interface FeedbackDTO {
  feedback: string;
  date: Date;
  studentId: string;
  teacherId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export async function createFeedbackUsecase(
  feedback: FeedbackDTO
): Promise<any> {
  const prisma = new PrismaClient();

  const createdFeedback = await prisma.feedback.create({
    data: {
      feedback: feedback.feedback,
      date: feedback.date,
      studentId: feedback.studentId,
      teacherId: feedback.teacherId,
      status: feedback.status,
      parameters: {
        create: {
          name: "Parametro 1",
          value: "5",
        },
      },
    },
  });

  return createdFeedback;
}
