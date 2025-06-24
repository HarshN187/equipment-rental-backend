import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';

@Injectable()
export class GetAllEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getAllEquipments(): Promise<EquipmentDto[]> {
    const result1 = await this.equipmentRepo.allAsyncWithJoin(
      {},
      { category: true },
    );

    return result1;
  }
}
