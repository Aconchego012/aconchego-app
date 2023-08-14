import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassesModule } from '../classes/classes.module';
import { PeopleController } from './people.controller';

@Module({
  controllers: [PeopleController],
  imports: [
    ClientsModule.register([
      {
        name: 'TCP_CLIENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8585,
        },
      },
    ]),
    ClassesModule,
  ],
})
export class PeopleModule {}
