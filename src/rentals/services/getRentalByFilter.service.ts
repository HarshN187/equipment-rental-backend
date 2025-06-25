import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetRentalResDto } from '../dto/getRentalRes.dto';

@Injectable()
export class GetRentalsByFilterService {
  constructor(
    private readonly rentalRepo: RentalRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getRentals(
    userId: number = 0,
    equipmentId: number = 0,
  ): Promise<GetRentalResDto[]> {
    let filter: { user?: object; equipment?: object } = {};
    console.log('object in getRental servie');

    if (userId != 0) {
      filter.user = { user_id: userId };
    }

    if (equipmentId != 0) {
      filter.equipment = { e_id: equipmentId };
    }
    console.log(filter);
    const data = await this.rentalRepo.allAsync(filter);

    if (!data) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(data, RentalDto, GetRentalResDto);

    return response;
  }
}
