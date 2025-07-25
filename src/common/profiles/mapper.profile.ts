import {
  createMap,
  createMapper,
  forMember,
  mapFrom,
  Mapper,
  MappingPropertiesClassId,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PermissionDto } from 'src/auth/dto/permission.dto';
import { RolesDto } from 'src/auth/dto/roles.dto';
import { RolesPermissionDto } from 'src/auth/dto/rolesPermission.dto';
import { Permissions } from 'src/auth/entities/permissions.entity';
import { Roles } from 'src/auth/entities/roles.entity';
import { RolesPermission } from 'src/auth/entities/roles_permission.entity';
import { categoryDto } from 'src/equipment/dto/category.dto';
import { CreateEquipmentDto } from 'src/equipment/dto/create-equipment.dto';
import { EquipmentDto } from 'src/equipment/dto/equipment.dto';
import { GetCategoryResDto } from 'src/equipment/dto/getCategoryRes.dto';
import { GetEquipmentResDto } from 'src/equipment/dto/getEquipmentRes.dto';
import { UpdateEquipmentDto } from 'src/equipment/dto/update-equipment.dto';
import { Category } from 'src/equipment/entities/category.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { CreateRentalDto } from 'src/rentals/dto/create-rental.dto';
import { GetRentalResDto } from 'src/rentals/dto/getRentalRes.dto';
import { RentalDto } from 'src/rentals/dto/rental.dto';
import { Rental } from 'src/rentals/entities/rental.entity';
import { AddressDto } from 'src/user/dto/address.dto';
import { CreateAddressDto } from 'src/user/dto/create-address.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetAddressResDto } from 'src/user/dto/getAddress.dto';
import { GetUserResDto } from 'src/user/dto/getUserRes.dto';
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
      createMap(mapper, EquipmentDto, GetEquipmentResDto);

      // createMap(mapper, RolesDto, Roles);
      createMap(mapper, Permissions, PermissionDto);
      createMap(mapper, Roles, RolesDto);
      createMap(
        mapper,
        RolesPermission,
        RolesPermissionDto,
        forMember(
          (d) => d.role,
          mapFrom((e) => e.role),
        ),
      );
      createMap(mapper, Address, AddressDto);
      createMap(mapper, Equipment, EquipmentDto);
      createMap(
        mapper,
        Category,
        categoryDto,
        forMember(
          (d) => d.equipments,
          mapFrom((e) => e.equipments),
        ),
      );
      // createMap()
      createMap(mapper, Rental, RentalDto);
      createMap(
        mapper,
        User,
        UserDto,
        forMember(
          (d) => d.addresses,
          mapFrom((e) => e.addresses),
        ),
        forMember(
          (d) => d.rentals,
          mapFrom((e) => e.rentals),
        ),
      );
      createMap(
        mapper,
        categoryDto,
        GetCategoryResDto,
        forMember(
          (d) => d.equipments,
          mapFrom((e) => e.equipments),
        ),
      );
      createMap(mapper, RentalDto, GetRentalResDto);
      createMap(
        mapper,
        UserDto,
        GetUserResDto,
        forMember(
          (d) => d.addresses,
          mapFrom((e) => e.addresses),
        ),
        forMember(
          (d) => d.rentals,
          mapFrom((e) => e.rentals),
        ),
      );
      createMap(mapper, AddressDto, GetAddressResDto);
      createMap(mapper, CreateEquipmentDto, EquipmentDto);
      createMap(mapper, CreateRentalDto, RentalDto);
      createMap(mapper, CreateAddressDto, AddressDto);
      createMap(mapper, CreateUserDto, UserDto);
      createMap(mapper, UpdateEquipmentDto, EquipmentDto);
    };
  }
}
