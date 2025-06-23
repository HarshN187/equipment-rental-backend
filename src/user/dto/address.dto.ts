import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserDto } from './user.dto';

export class AddressDto {
  @AutoMap()
  id: number;

  @AutoMap()
  address: string;

  @AutoMap()
  city: string;

  @AutoMap()
  state: string;

  @AutoMap()
  country: string;

  @AutoMap()
  zipcode: string;

  @AutoMap()
  user: UserDto;
}
