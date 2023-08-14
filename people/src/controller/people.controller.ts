import { Body, Controller, Inject, Param } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { MessagePatterns, ServiceRequest } from '../enum/message-patterns';
import { PeopleService } from '../service/people.service';
import { CreatePersonDto } from '../dto/people/create-person-dto';
import { UpdatePersonDto } from '../dto/people/update-person-dto';

@Controller()
export class PeopleController {
  constructor(@Inject(PeopleService) private peopleService: PeopleService) {}

  @MessagePattern({ action: MessagePatterns.CREATE_PERSON }, Transport.TCP)
  async createPerson(
    @Body() request: ServiceRequest<CreatePersonDto>,
  ): Promise<object> {
    const serviceResult = await this.peopleService.createPerson(request.data);
    return serviceResult;
  }

  @MessagePattern({ action: MessagePatterns.GET_PERSON }, Transport.TCP)
  async getPersonById(
    @Body() request: ServiceRequest<{ id: number }>,
  ): Promise<object> {
    const serviceResult = await this.peopleService.getPersonById(
      request.data.id,
    );
    return serviceResult;
  }

  @MessagePattern({ action: MessagePatterns.UPDATE_PERSON }, Transport.TCP)
  async updatePerson(
    @Body() request: ServiceRequest<UpdatePersonDto>,
  ): Promise<object> {
    const serviceResult = await this.peopleService.updatePerson(request.data);
    return serviceResult;
  }

  @MessagePattern({ action: MessagePatterns.DELETE_PERSON }, Transport.TCP)
  async deletePerson(
    @Body() request: ServiceRequest<{ id: number }>,
  ): Promise<object> {
    const serviceResult = await this.peopleService.deletePerson(
      request.data.id,
    );
    return serviceResult;
  }
}
