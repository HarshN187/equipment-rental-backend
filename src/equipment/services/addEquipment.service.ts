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
export class AddEquipmentService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    private readonly categoryRepo: CategoryRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async addEquipment(body: CreateEquipmentDto): Promise<GetEquipmentResDto> {
    const categoryData = await this.categoryRepo.getAsync(body.category);

    if (!categoryData) {
      throw new DbException('data not found for this category');
    }

    const reqData = this.mapper.map(body, CreateEquipmentDto, EquipmentDto);

    const equipmentAdded = await this.equipmentRepo.createAsync({
      ...reqData,
      category: categoryData,
    });

    const response = this.mapper.map(
      equipmentAdded,
      EquipmentDto,
      GetEquipmentResDto,
    );

    return response;
  }
}
