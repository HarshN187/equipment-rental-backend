import {
  createMap,
  createMapper,
  Mapper,
  MappingPropertiesClassId,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { categoryDto } from 'src/equipment/dto/category.dto';
import { EquipmentDto } from 'src/equipment/dto/equipment.dto';
import { Category } from 'src/equipment/entities/category.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { RentalDto } from 'src/rentals/dto/rental.dto';
import { Rental } from 'src/rentals/entities/rental.entity';
import { AddressDto } from 'src/user/dto/address.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Address } from 'src/user/entities/address.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class mapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserDto);
      createMap(mapper, Address, AddressDto);
      createMap(mapper, Equipment, EquipmentDto);
      createMap(mapper, Category, categoryDto);
      createMap(mapper, Rental, RentalDto);
    };
  }
}
