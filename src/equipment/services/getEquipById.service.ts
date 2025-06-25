import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class GetEquipmentbyIdService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getEquipment(id: number): Promise<GetEquipmentResDto> {
    const result = await this.equipmentRepo.getAsyncWithJoin(id, {
      category: true,
    });

    if (!result) {
      throw new DbException('data not found for this id');
    }

    const response = this.mapper.map(result, EquipmentDto, GetEquipmentResDto);

    return response;
  }
}
