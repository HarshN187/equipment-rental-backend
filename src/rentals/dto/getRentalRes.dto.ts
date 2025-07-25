import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetEquipmentResDto } from 'src/equipment/dto/getEquipmentRes.dto';
import { GetUserResDto } from 'src/user/dto/getUserRes.dto';

export class GetRentalResDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  user: GetUserResDto;

  @ApiProperty()
  @AutoMap()
  equipment: GetEquipmentResDto;

  @ApiProperty()
  @AutoMap()
  start_date: Date;

  @ApiProperty()
  @AutoMap()
  end_date: Date;

  @ApiProperty()
  @AutoMap()
  //active,returned,overdue(not returned)
  status: string;

  @ApiProperty()
  @AutoMap()
  //paid,unpaid
  payment_status: string;

  @ApiProperty()
  @AutoMap()
  quantity: number;

  @ApiProperty()
  @AutoMap()
  created_at: Date;

  // @ApiProperty()
  // @AutoMap()
  // updated_at: Date;
}
