import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';

@Injectable()
export class GetAllEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getAllEquipments() {
    const result = await this.equipmentRepo.allAsync({});

    const result1 = await this.equipmentRepo.allAsyncWithJoin(
      {},
      { category: true },
    );

    return result;
  }
}
