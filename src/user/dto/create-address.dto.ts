import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @AutoMap()
  @ApiProperty()
  @IsInt()
  address_id: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  city: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  state: string;

  @AutoMap()
  @IsString()
  @ApiProperty()
  country: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  zipcode: string;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  user: UserDto;
}
