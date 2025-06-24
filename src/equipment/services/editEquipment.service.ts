import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { UpdateEquipmentDto } from '../dto/update-equipment.dto';

@Injectable()
export class editEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async editEquipment(body: UpdateEquipmentDto): Promise<EquipmentDto> {
    const equipmentUpdated = await this.equipmentRepo.updateAsync(
      body as unknown as EquipmentDto,
    );

    return equipmentUpdated;
  }
}
