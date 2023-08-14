import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Get,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('person')
export class PeopleController {
  constructor(
    @Inject('TCP_CLIENT') private tcpClient: ClientProxy,   
  ) {}

  @Post()
  async createPerson(@Body() createPersonData: unknown): Promise<string> {
    const result = this.tcpClient.send(
      { action: 'CREATE_PERSON' },
      createPersonData,
    );

    // Chamada de service externo
    // const classes = this.classesService.getClass();

    const person = await firstValueFrom(result);
    return JSON.stringify(person);
  }

  @Get(':id')
  async getPersonById(@Param('id') id: number): Promise<string> {
    const result = this.tcpClient.send({ action: 'GET_PERSON' }, { id });

    const person = await firstValueFrom(result);
    return JSON.stringify(person);
  }

  @Put(':id')
  async updatePerson(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<string> {
    const result = this.tcpClient.send(
      { action: 'UPDATE_PERSON' },
      { id, body },
    );

    const person = await firstValueFrom(result);
    return JSON.stringify(person);
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: number): Promise<string> {
    const result = this.tcpClient.send({ action: 'DELETE_PERSON' }, { id });

    const data = await firstValueFrom(result).catch(() => {
      throw new HttpException(
        'People service is unrespossive',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    // Adicionar esses status a um enum
    if (data.status === 'NOT_FOUND') {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (data.status === 'UNKNOWN_ERROR') {
      throw new HttpException(
        'People service responded with an error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return JSON.stringify(data.message);
  }
}
