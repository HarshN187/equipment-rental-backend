import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../repository/equipment.repository';
import { EquipmentDto } from '../dto/equipment.dto';
import { UpdateEquipmentDto } from '../dto/update-equipment.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetEquipmentResDto } from '../dto/getEquipmentRes.dto';

@Injectable()
export class editEquipmentService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async editEquipment(body: UpdateEquipmentDto): Promise<GetEquipmentResDto> {
    const equipmentUpdated = await this.equipmentRepo.updateAsync(
      body as unknown as EquipmentDto,
    );

    const response = this.mapper.map(
      equipmentUpdated,
      EquipmentDto,
      GetEquipmentResDto,
    );

    return response;
  }
}
