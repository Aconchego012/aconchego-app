import { Module } from '@nestjs/common';
import { ClassesModule } from './classes/classes.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [ClassesModule, PeopleModule],
})
export class AppModule {}
