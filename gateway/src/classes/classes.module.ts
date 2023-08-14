import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
 
  controllers: [ClassesController],
  imports: [
    ClientsModule.register([
      {
        name: 'TCP_CLIENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8586,
        },
      },
    ]),
    ClassesModule,
  ],
  // TEM QUE EXPORTAR OS SERVICES QUE SERÃO USADOS POR OUTROS MÓDULOS
  // exports: [ClassesService],
})
export class ClassesModule {}
