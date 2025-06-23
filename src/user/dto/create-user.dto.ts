import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @AutoMap()
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 'name',
  })
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'name@gmail.com',
  })
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 10,
    example: '99887766768',
  })
  @AutoMap()
  @IsString()
  phone: string;

  @ApiProperty({
    example: '123',
  })
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
