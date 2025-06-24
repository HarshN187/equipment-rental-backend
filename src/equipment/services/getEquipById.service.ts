import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';

@Injectable()
export class GetEquipmentbyIdService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getEquipment(id: number) {
    const result = await this.equipmentRepo.getAsyncWithJoin(id, {
      category: true,
    });

    return result;
  }
}
