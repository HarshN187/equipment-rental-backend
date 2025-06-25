import { AutoMap } from '@automapper/classes';

export class categoryDto {
  @AutoMap()
  category_id: number;

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
}
