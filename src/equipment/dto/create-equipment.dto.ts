import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsInt, IsString } from 'class-validator';
import { categoryDto } from './category.dto';

export class CreateEquipmentDto {
  @AutoMap()
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
  @IsInt()
  @ApiProperty({
    example: 10,
  })
  total_quntity: number;

  // @AutoMap()
  // @IsInt()
  // @ApiProperty({
  //   example: 10,
  // })
  // available_quntity: number;

  // @AutoMap()
  // @IsBoolean()
  // @ApiProperty({
  //   example: true,
  // })
  // available: boolean;

  @AutoMap()
  @ApiProperty({
    example: 3,
  })
  category: number;
}
