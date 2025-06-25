import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class GetAllEquipmentService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getAllEquipments(): Promise<GetEquipmentResDto[]> {
    const result = await this.equipmentRepo.allAsyncWithJoin(
      {},
      { category: true },
    );

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(
      result,
      EquipmentDto,
      GetEquipmentResDto,
    );

    return response;
  }
}
