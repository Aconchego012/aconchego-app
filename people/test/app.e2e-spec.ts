import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { generateRandomPerson } from './fixtures/person-fixture';
import { MessagePatterns } from '../src/enum/message-patterns';
import { firstValueFrom } from 'rxjs';

describe('AppController (e2e)', () => {
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'PEOPLE_SERVICE',
            transport: Transport.TCP,
            options: {
              host: '127.0.0.1',
              port: 8585,
            },
          },
        ]),
      ],
    }).compile();

    client = module.get<ClientProxy>('PEOPLE_SERVICE');
    await client.connect();
  });

  afterEach(async () => {
    await client.close();
  });

  it('should create a person', async () => {
    const person = generateRandomPerson();

    const response = client.send(
      { action: MessagePatterns.CREATE_PERSON },
      { data: person },
    );

    const result = await firstValueFrom(response);

    expect(result).toMatchObject(person);
    // Add more assertions based on what you expect the response to be
  });
});
