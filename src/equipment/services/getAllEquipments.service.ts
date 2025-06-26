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

  async getAllEquipments(status: number): Promise<GetEquipmentResDto[]> {
    let filter = {};

    isNaN(status) ? '' : (filter['available'] = status ? 1 : 0);

    const result = await this.equipmentRepo.allAsyncWithJoin(filter, {
      category: true,
    });

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.equipmentRepo.mapToResponseArray(result);

    return response;
  }
}
