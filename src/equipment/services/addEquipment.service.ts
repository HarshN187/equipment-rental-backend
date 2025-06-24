import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';
import { CategoryRepository } from '../repository/category.repository';
import { DbException } from 'src/common/exceptions';
import { EquipmentDto } from '../dto/equipment.dto';

@Injectable()
export class AddEquipmentService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async addEquipment(body: CreateEquipmentDto): Promise<EquipmentDto> {
    const categoryData = await this.categoryRepo.getAsync(body.category);

    if (!categoryData) {
      throw new DbException('data not found for this category');
    }

    const equipmentAdded = await this.equipmentRepo.createAsync({
      ...body,
      category: categoryData,
    } as unknown as EquipmentDto);

    return equipmentAdded;
  }
}
