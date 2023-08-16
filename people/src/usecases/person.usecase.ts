import { PrismaClient } from "@prisma/client";
import Publisher, { AVAILABLE_CHANNELS } from "../interfaces/message/publisher";

interface PersonDTO {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  cpf: string;
}

export function createPersonUseCase(person: PersonDTO) {
  const prisma = new PrismaClient();

  try {
    const createdPerson = prisma.person.create({
      data: person,
    });

    Publisher.publish(
      AVAILABLE_CHANNELS.PERSON_CREATED,
      JSON.stringify(person)
    );

    return createdPerson;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function getPersonUseCase(personId: string) {
  const prisma = new PrismaClient();

  try {
    const person = prisma.person.findUnique({
      where: {
        id: personId,
      },
    });

    return person;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function updatePersonUseCase(personId: string, person: PersonDTO) {
  const prisma = new PrismaClient();

  try {
    const existingPerson = prisma.person.update({
      where: {
        id: personId,
      },
      data: person,
    });

    Publisher.publish(
      AVAILABLE_CHANNELS.PERSON_UPDATED,
      JSON.stringify(existingPerson)
    );

    return existingPerson;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function deletePersonUsecase(personId: string) {
  const prisma = new PrismaClient();

  try {
    const deletedPerson = prisma.person.delete({
      where: {
        id: personId,
      },
    });

    return deletedPerson;
  } catch (error: any) {
    throw new Error(error);
  }
}
