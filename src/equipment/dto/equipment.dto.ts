import { AutoMap } from '@automapper/classes';
import { categoryDto } from './category.dto';

export class EquipmentDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  rent_per_day: number;

  @AutoMap()
  available: boolean;

  @AutoMap()
  category: categoryDto;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;

  @AutoMap()
  deleted_at: Date;
}
