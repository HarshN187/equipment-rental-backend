import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { EquipmentDto } from 'src/equipment/dto/equipment.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateRentalDto {
  // @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty({
    example: 3,
  })
  @AutoMap()
  user: number;

  @ApiProperty({
    example: 3,
  })
  @AutoMap()
  equipment: number;

  @ApiProperty({
    example: Date.now(),
  })
  @AutoMap()
  start_date: Date;

  @ApiProperty({
    example: 1,
  })
  @AutoMap()
  quantity: number;

  @ApiProperty({
    example: new Date(Date.now() + 2),
  })
  @AutoMap()
  end_date: Date;

  @ApiProperty({
    example: 'active',
  })
  @AutoMap()
  //active,returned,overdue(not returned)
  status: string;

  @ApiProperty({
    example: 'unpaid',
  })
  @AutoMap()
  //paid,unpaid
  payment_status: string;
}
