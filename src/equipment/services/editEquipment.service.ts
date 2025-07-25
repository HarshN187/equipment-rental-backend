import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { UpdateEquipmentDto } from '../dto/update-equipment.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';
import { CategoryRepository } from '../repository/category.repository';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class editEquipmentService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    private readonly categoryRepo: CategoryRepository,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async editEquipment(body: UpdateEquipmentDto): Promise<GetEquipmentResDto> {
    const categoryData = await this.categoryRepo.getAsync(
      body.category ? body.category : 1,
    );
    console.log(categoryData);

    if (!categoryData) {
      throw new DbException('data not found for this category');
    }

    const equipmentUpdated = await this.equipmentRepo.updateAsync({
      ...body,
      category: categoryData,
    } as unknown as EquipmentDto);

    const response = this.equipmentRepo.mapToResponse(equipmentUpdated);

    return response;
  }
}
