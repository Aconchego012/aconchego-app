import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsNumber,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleType } from 'src/entity/role.entity';

class RoleDTO {
  @IsEnum(RoleType)
  name: RoleType;
}

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  streetName: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  zipCode: number;
}

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null) // The 'null' parameter allows any locale.
  phone: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ValidateNested()
  @Type(() => RoleDTO)
  role: RoleDTO;

  @IsNotEmpty()
  @IsDate()
  birthdate: Date;
}
