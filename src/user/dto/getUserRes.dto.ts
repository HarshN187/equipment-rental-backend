import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { GetAddressResDto } from './getAddress.dto';
import { GetRentalResDto } from 'src/rentals/dto/getRentalRes.dto';

export class GetUserResDto {
  @ApiProperty()
  @IsOptional()
  @AutoMap()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  role: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  phone: string;

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  addresses: GetAddressResDto[];

  @ApiProperty()
  @AutoMap()
  @IsOptional()
  rentals: GetRentalResDto[];
}
