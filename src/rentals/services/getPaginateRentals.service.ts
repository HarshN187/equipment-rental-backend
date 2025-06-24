import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';

@Injectable()
export class GetRentalsPaginateService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getPaginateRentals(
    page: number,
    perPage: number,
  ): Promise<RentalDto[]> {
    const data = await this.rentalRepo.pagedAsync({
      $page: page,
      $perPage: perPage,
    });

    return data.items;
  }
}
