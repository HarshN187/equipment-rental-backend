import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { ILike, Like } from 'typeorm';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class FindEquipmentBySearchService {
  constructor(private readonly equipRepo: EquipmentRepository) {}

  async findEquipment(query: string): Promise<GetEquipmentResDto[]> {
    console.log(query);
    const result = await this.equipRepo.searchEquipment(
      [{ name: ILike(`%${query}%`) }, { description: ILike(`%${query}%`) }],
      ['category'],
    );

    console.log(result);

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.equipRepo.mapToResponseArray(result);

    return response;
  }
}
