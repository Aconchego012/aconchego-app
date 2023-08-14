import { faker } from '@faker-js/faker';
import { CreatePersonDto } from '../../src/dto/people/create-person-dto';
import { RoleType } from 'src/entity/role.entity';

export function generateRandomPerson(): CreatePersonDto {
  const person = new CreatePersonDto();
  person.cpf = faker.string.uuid();
  person.name = faker.person.fullName();
  person.email = faker.internet.email();
  person.phone = faker.phone.number();
  person.address = {
    streetName: faker.location.street(),
    neighborhood: faker.location.streetAddress(),
    number: faker.number.int(2),
    city: faker.location.city(),
    zipCode: faker.number.int(10),
  };
  person.role = {
    name: RoleType.STUDENT,
  };
  person.birthdate = faker.date.past();
  return person;
}
