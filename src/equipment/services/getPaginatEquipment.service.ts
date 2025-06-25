import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class GetPaginateEquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async getPaginateEquipments(
    page: number,
    perPage: number,
    order: number,
  ): Promise<GetEquipmentResDto[]> {
    const result = await this.equipmentRepo.pagedAsyncWithJoin(
      {
        $page: page,
        $perPage: perPage,
        $orderBy: 'e_id',
        $order: order ? 'ASC' : 'DESC',
      },
      { category: true },
    );

    const response = this.equipmentRepo.mapToResponseArray(result.items);

    return response;
  }
}
