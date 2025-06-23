import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  phone: string;

  @AutoMap()
  password: string;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;

  @AutoMap()
  deleted_at: Date;
}
