import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @AutoMap()
  @IsInt()
  id: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  password: string;

  @ApiProperty()
  @IsOptional()
  @AutoMap()
  created_at: Date;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  updated_at: Date;

  @ApiProperty()
  @IsOptional()
  @AutoMap()
  deleted_at: Date;
}
