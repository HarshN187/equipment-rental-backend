import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class GetAllEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getAllEquipments(): Promise<EquipmentDto[]> {
    const result = await this.equipmentRepo.allAsyncWithJoin(
      {},
      { category: true },
    );

    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
