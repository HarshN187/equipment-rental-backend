import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetRentalResDto } from '../dto/getRentalRes.dto';

@Injectable()
export class GetRentalsPaginateService {
  constructor(
    private readonly rentalRepo: RentalRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getPaginateRentals(
    page: number,
    perPage: number,
    order: number,
  ): Promise<GetRentalResDto[]> {
    const data = await this.rentalRepo.pagedAsync({
      $page: page,
      $perPage: perPage,
      $orderBy: 'id',
      $order: order ? 'ASC' : 'DESC',
    });

    const response = this.mapper.mapArray(
      data.items,
      RentalDto,
      GetRentalResDto,
    );

    return response;
  }
}
