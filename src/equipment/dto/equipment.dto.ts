import { AutoMap } from '@automapper/classes';
import { categoryDto } from './category.dto';

export class EquipmentDto {
  @AutoMap()
  e_id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  rent_per_day: number;

  @AutoMap()
  available: boolean;

  @AutoMap()
  total_quntity: number;

  @AutoMap()
  available_quntity: number;

  @AutoMap()
  category: categoryDto;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;

  @AutoMap()
  deleted_at: Date;
}
