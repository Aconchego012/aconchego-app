import { PrismaClient } from "@prisma/client";

interface ClassDTO {
  name: string;
  description: string;
  teacherId: string;
}

interface AttendanceDTO {
  classId: string;
  studentId: string;
  date: Date;
  status: "PRESENT" | "ABSENT";
}

export async function createClassUsecase(
  classData: ClassDTO
): Promise<ClassDTO> {
  const prisma = new PrismaClient();

  const createdClass = await prisma.class.create({
    data: classData,
  });

  return createdClass;
}

export async function registerAttendanceUsecase(
  attendance: AttendanceDTO
): Promise<AttendanceDTO> {
  const prisma = new PrismaClient();

  const createdAttendance = await prisma.attendance.create({
    data: {
      classId: attendance.classId,
      studentId: attendance.studentId,
      date: attendance.date,
      status: attendance.status,
    },
  });

  return createdAttendance;
}

export async function updateClassUsecase(
  classId: string,
  classData: Partial<ClassDTO>
): Promise<ClassDTO> {
  const prisma = new PrismaClient();

  const updatedClass = await prisma.class.update({
    where: { id: classId },
    data: classData,
  });

  return updatedClass;
}

export async function listClassUsecase(): Promise<ClassDTO[]> {
  const prisma = new PrismaClient();

  const classes = await prisma.class.findMany();

  return classes;
}

export async function deleteClassUsecase(classId: string): Promise<ClassDTO> {
  const prisma = new PrismaClient();

  const deletedClass = await prisma.class.delete({
    where: { id: classId },
  });

  return deletedClass;
}

export async function registerStudentToClass(
  studentId: string,
  classId: string
) {
  const prisma = new PrismaClient();
  const studentExists = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!studentExists) {
    throw new Error("Student not found");
  }

  const classExists = await prisma.class.findUnique({
    where: {
      id: classId,
    },
  });

  if (!classExists) {
    throw new Error("Class not found");
  }

  const registeredStudent = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      Class: {
        connect: {
          id: classId,
        },
      },
    },
  });

  return registeredStudent;
}
