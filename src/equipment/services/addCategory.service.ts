import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';
import { CategoryRepository } from '../repository/category.repository';
import { DbException } from 'src/common/exceptions';
import { EquipmentDto } from '../dto/equipment.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class AddCategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async addEquipment(body) {
    // const reqData = this.mapper.map(body, , EquipmentDto);

    const categoryAdded = await this.categoryRepo.createAsync({
      ...body,
    });

    return categoryAdded;
  }
}
