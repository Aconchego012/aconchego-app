import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController as PeopleController } from './people.controller';
import { PeopleService } from '../service/people.service';
import { ServiceStatus } from '../enum/message-patterns';
import { Person } from '../entity/person.entity';
import { generateRandomPerson } from '../../test/fixtures/person-fixture';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../entity/address.entity';

describe('AppController', () => {
  let appController: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        PeopleService,
        {
          provide: getRepositoryToken(Person),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: {
            emit: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    appController = app.get<PeopleController>(PeopleController);
    peopleService = app.get<PeopleService>(PeopleService);
  });

  describe('createPerson', () => {
    it('should return the result of the PeopleService', async () => {
      const person = generateRandomPerson();
      delete person.name;

      const expectedResult = {
        status: ServiceStatus.SUCCESS,
        data: new Person(),
      };

      jest
        .spyOn(peopleService, 'createPerson')
        .mockImplementation(() => Promise.resolve(expectedResult));

      const result = await appController.createPerson({ data: person });
      console.log(result);

      expect(result).toBe(expectedResult);
    });
  });

  // Implement similar tests for getPersonById, updatePerson, and deletePerson methods
});
