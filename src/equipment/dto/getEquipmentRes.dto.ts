import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetCategoryResDto } from './getCategoryRes.dto';

export class GetEquipmentResDto {
  @AutoMap()
  @ApiProperty()
  e_id: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  rent_per_day: number;

  @AutoMap()
  @ApiProperty()
  available: boolean;

  @AutoMap()
  @ApiProperty()
  category: GetCategoryResDto;

  @AutoMap()
  @ApiProperty()
  created_at: Date;

  @AutoMap()
  @ApiProperty()
  updated_at: Date;

}
