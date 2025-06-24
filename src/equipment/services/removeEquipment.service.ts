import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';

@Injectable()
export class RemoveEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async RemoveEquipment(e_id: number): Promise<boolean> {
    const equipmentDeleted = await this.equipmentRepo.deleteAsync(e_id);

    return equipmentDeleted;
  }
}
