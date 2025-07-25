import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentResDto } from './getEquipmentRes.dto';

export class GetCategoryResDto {
  @AutoMap()
  @ApiProperty()
  cat_id: number;

  @AutoMap()
  @ApiProperty()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  created_at: Date;

  @AutoMap()
  @ApiProperty()
  updated_at: Date;

  @AutoMap()
  @ApiProperty()
  equipments: GetEquipmentResDto[];
}
