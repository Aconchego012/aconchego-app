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
 
  
  @Controller('class')
  export class ClassesController {
    constructor(
      @Inject('TCP_CLIENT') private tcpClient: ClientProxy,   
    ) {}
  
    @Post()
    async createClass(@Body() createClassData: unknown): Promise<string> {
      const result = this.tcpClient.send(
        { action: 'CREATE_CLASS' },
        createClassData,
      );
  
      const classData = await firstValueFrom(result);
      return JSON.stringify(classData);
    }
  
    @Get(':id')
    async getClassById(@Param('id') id: number): Promise<string> {
      const result = this.tcpClient.send({ action: 'GET_CLASS' }, { id });
  
      const classData = await firstValueFrom(result);
      return JSON.stringify(classData);
    }
  
    @Put(':id')
    async updateClass(
      @Param('id') id: number,
      @Body() body: any,
    ): Promise<string> {
      const result = this.tcpClient.send(
        { action: 'UPDATE_CLASS' },
        { id, body },
      );
  
      const classData = await firstValueFrom(result);
      return JSON.stringify(classData);
    }
  
    @Delete(':id')
    async deleteClass(@Param('id') id: number): Promise<string> {
      const result = this.tcpClient.send({ action: 'DELETE_CLASS' }, { id });
  
      const data = await firstValueFrom(result).catch(() => {
        throw new HttpException(
          'Classes service is unresponsive',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  
      if (data.status === 'NOT_FOUND') {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
  
      if (data.status === 'UNKNOWN_ERROR') {
        throw new HttpException(
          'Classes service responded with an error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  
      return JSON.stringify(data.message);
    }
  }
  