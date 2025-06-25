import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { GetUserResDto } from './getUserRes.dto';

export class GetAddressResDto {
  @AutoMap()
  @ApiProperty()
  @IsInt()
  id: number;

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
  user: GetUserResDto;
}
