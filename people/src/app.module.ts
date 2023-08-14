import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Person } from './entity/person.entity';
import { PeopleController } from './controller/people.controller';
import { PeopleService } from './service/people.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_CLIENT',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'people',
      entities: [Address, Person],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Address, Person]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class AppModule {}
