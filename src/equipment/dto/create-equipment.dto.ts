import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { categoryDto } from './category.dto';

export class CreateEquipmentDto {
  @AutoMap()
  @ApiProperty({
    example: 2,
  })
  @IsInt()
  e_id: number;

  @AutoMap()
  @ApiProperty({
    example: 'equip name',
  })
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty({
    example: 'description detail',
  })
  @IsString()
  description: string;

  @AutoMap()
  @IsInt()
  @ApiProperty({
    example: 500,
  })
  rent_per_day: number;

  @AutoMap()
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  available: boolean;

  @AutoMap()
  @ApiProperty({
    example: 3,
  })
  category: number;
}
