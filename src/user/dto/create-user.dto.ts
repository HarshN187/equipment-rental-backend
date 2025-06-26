import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { UserDto } from './user.dto';
import { RolesDto } from 'src/auth/dto/roles.dto';

export class CreateUserDto {
  // @ApiProperty()
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
    example: 'user',
  })
  @AutoMap()
  @IsString()
  role: RolesDto;

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
}
