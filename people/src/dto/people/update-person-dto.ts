import {
  IsOptional,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  IsIn,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleType } from 'src/entity/role.entity';

class RoleDTO {
  @IsEnum(RoleType)
  name: RoleType;
}

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  streetName: string;

  @IsOptional()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  zipCode: number;

  @IsOptional()
  @IsString()
  city: string;
}

export class UpdatePersonDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phone: string;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RoleDTO)
  role: RoleDTO;

  @IsOptional()
  @IsDate()
  birthdate: Date;
}
