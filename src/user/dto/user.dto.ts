import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { GetAddressResDto } from './getAddress.dto';
import { AddressDto } from './address.dto';
import { RentalDto } from 'src/rentals/dto/rental.dto';
import { RolesDto } from 'src/auth/dto/roles.dto';

export class UserDto {
  @AutoMap()
  user_id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phone: string;

  @AutoMap()
  role: RolesDto;

  @AutoMap()
  password: string;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;

  @AutoMap()
  deleted_at: Date;

  @AutoMap()
  addresses: AddressDto[];

  @AutoMap()
  rentals: RentalDto[];
}
