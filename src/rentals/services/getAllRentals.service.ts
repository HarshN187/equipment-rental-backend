import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetRentalResDto } from '../dto/getRentalRes.dto';

@Injectable()
export class getAllRentalService {
  constructor(
    private readonly rentalRepo: RentalRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getAll(): Promise<GetRentalResDto[]> {
    const data = await this.rentalRepo.allAsync({});

    if (!data) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(data, RentalDto, GetRentalResDto);

    return response;
  }
}
