import { Body, Controller, Inject, Param } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { MessagePatterns, ServiceRequest } from '../enum/message-patterns';
import { PeopleService } from '../service/people.service';
import { CreatePersonDto } from '../dto/people/create-person-dto';
import { UpdatePersonDto } from '../dto/people/update-person-dto';

@Controller()
export class PermissionController {
  constructor(@Inject(PeopleService) private peopleService: PeopleService) {}

  @MessagePattern({ action: MessagePatterns.CREATE_PERSON }, Transport.TCP)
  async createPermission(
    @Body() request: ServiceRequest<CreatePersonDto>,
  ): Promise<object> {
    const serviceResult = await this.peopleService.createPerson(request.data);
    return serviceResult;
  }

  async getPermissions() {}
}
