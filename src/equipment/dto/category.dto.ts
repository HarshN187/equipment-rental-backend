import { AutoMap } from '@automapper/classes';
import { EquipmentDto } from './equipment.dto';

export class categoryDto {
  @AutoMap()
  cat_id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;

  @AutoMap()
  deleted_at: Date;

  @AutoMap()
  equipments: EquipmentDto[];
}
