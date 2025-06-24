import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { Rental } from '../entities/rental.entity';
import { RentalDto } from '../dto/rental.dto';
@Injectable()
export class RentalRepository extends BaseRepo<
  Rental,
  RentalDto,
  number,
  {},
  {}
> {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(rentalRepository, mapper, logger, Rental, RentalDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get softDeleteColumnName(): keyof Rental {
    return 'deleted_at';
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<Rental>,
    filterObj,
  ) {
    super.modifyFindOption(findOpts, filterObj);
    findOpts.relations = ['user', 'equipment'];
  }

  //   public override get idColumnName(): keyof Category {
  //     return 'category_id';
  //   }
}
