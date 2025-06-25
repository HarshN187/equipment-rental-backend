import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetRentalResDto } from '../dto/getRentalRes.dto';

@Injectable()
export class getRentalByIdService {
  constructor(
    private readonly rentalRepo: RentalRepository,
   
  ) {}

  async getRentalById(id: number): Promise<GetRentalResDto> {
    const data = await this.rentalRepo.getAsyncWithJoin(id, {
      user: true,
      equipment: true,
    });

    if (!data) {
      throw new DbException('data not found');
    }

    const response = this.rentalRepo.mapToResponse(data);

    return response;
  }
}
