import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class GetAllEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getAllEquipments(): Promise<GetEquipmentResDto[]> {
    const result = await this.equipmentRepo.allAsyncWithJoin(
      {},
      { category: true },
    );

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.equipmentRepo.mapToResponseArray(result);

    return response;
  }
}
