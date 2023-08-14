import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Address } from '../entity/address.entity';
import { Person } from '../entity/person.entity';
import { ServiceResponse, ServiceStatus } from '../enum/message-patterns';
import { UpdatePersonDto } from '../dto/people/update-person-dto';
import { CreatePersonDto } from 'src/dto/people/create-person-dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @Inject('REDIS_CLIENT') private redisClient: ClientProxy,
  ) {}

  async createPerson(data: CreatePersonDto): Promise<ServiceResponse<Person>> {
    const address = await this.addressRepository.save(
      plainToInstance(Address, data.address),
    );

    const personToBeSaved = { ...data, address };

    const person = await this.personRepository.save(
      plainToInstance(Person, personToBeSaved),
    );
    this.redisClient.emit('person-created', person);

    return {
      status: ServiceStatus.SUCCESS,
      data: person,
    };
  }

  async getPersonById(id: number): Promise<ServiceResponse<Person>> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      return {
        status: ServiceStatus.NOT_FOUND,
        message: 'Person not found',
      };
    }

    return {
      status: ServiceStatus.SUCCESS,
      data: person,
    };
  }

  async updatePerson(data: UpdatePersonDto): Promise<ServiceResponse<Person>> {
    const oldPerson = await this.personRepository.findOne({
      where: { id: data.id },
    });

    if (!oldPerson) {
      return {
        status: ServiceStatus.NOT_FOUND,
        message: 'Person not found',
      };
    }

    await this.personRepository.update({ id: data.id }, data);

    const person = await this.personRepository.findOne({
      where: { id: data.id },
    });

    this.redisClient.emit('person-updated', person);
    return {
      status: ServiceStatus.SUCCESS,
      data: person,
    };
  }

  async deletePerson(id: number): Promise<ServiceResponse<void>> {
    const person = await this.personRepository.findOne({ where: { id } });
    if (!person) {
      return {
        status: ServiceStatus.NOT_FOUND,
        message: 'Person not found',
      };
    }

    this.redisClient.emit('person-deleted', person);
    await this.personRepository.delete(id);
    return {
      status: ServiceStatus.SUCCESS,
      message: 'Person deleted',
    };
  }
}
