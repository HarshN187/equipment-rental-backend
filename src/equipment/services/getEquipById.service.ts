import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class GetEquipmentbyIdService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getEquipment(id: number): Promise<EquipmentDto> {
    const result = await this.equipmentRepo.getAsyncWithJoin(id, {
      category: true,
    });

    if(!result){
        throw new DbException('data not found for this id')
    }

    return result;
  }
}
