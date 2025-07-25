import { AutoMap } from '@automapper/classes';
import { EquipmentDto } from 'src/equipment/dto/equipment.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class RentalDto {
  @AutoMap()
  id: number;

  @AutoMap()
  user: UserDto;

  @AutoMap()
  equipment: EquipmentDto;

  @AutoMap()
  start_date: Date;

  @AutoMap()
  end_date: Date;

  @AutoMap()
  //active,returned,overdue(not returned)
  status: string;

  @AutoMap()
  //paid,unpaid
  payment_status: string;

  @AutoMap()
  quantity: number;

  // @AutoMap()
  created_at: Date;

  // @AutoMap()
  updated_at: Date;

  // @AutoMap()
  deleted_at: Date;
}
