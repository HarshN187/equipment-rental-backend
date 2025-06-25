import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { Equipment } from '../entities/equipment.entity';
import { EquipmentDto } from '../dto/equipment.dto';

@Injectable()
export class EquipmentRepository extends BaseRepo<
  Equipment,
  EquipmentDto,
  number,
  {},
  {}
> {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(equipmentRepository, mapper, logger, Equipment, EquipmentDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get softDeleteColumnName(): keyof Equipment {
    return 'deleted_at';
  }

  public override get idColumnName(): keyof Equipment {
    return 'e_id';
  }

  public async searchEquipment(
    query,
    relation?: Array<string>,
  ): Promise<EquipmentDto[]> {
    const data = await this.equipmentRepository.find({
      where: query,
      relations: relation,
    });

    return this.mapToModelArray(data);
  }
}
