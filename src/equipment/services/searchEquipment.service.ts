import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { Like } from 'typeorm';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class FindEquipmentBySearchService {
  constructor(
    private readonly equipRepo: EquipmentRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findEquipment(query: string): Promise<GetEquipmentResDto[]> {
    console.log(query);
    const result = await this.equipRepo.allAsync({
      name: Like(`%${query}%`),
      //   description: Like(`%${query}%`),
      $orderBy: 'e_id',
      $order: 'asc',
    });

    console.log(result);

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
