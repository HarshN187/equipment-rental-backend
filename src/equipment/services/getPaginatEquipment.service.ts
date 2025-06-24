import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';

@Injectable()
export class GetPaginateEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getPaginateEquipments(
    page: number,
    perPage: number,
  ): Promise<EquipmentDto[]> {
    const result = await this.equipmentRepo.pagedAsyncWithJoin(
      {
        $page: page,
        $perPage: perPage,
      },
      { category: true },
    );

    return result.items;
  }
}
