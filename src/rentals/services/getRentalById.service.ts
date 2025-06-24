import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';

@Injectable()
export class getRentalByIdService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getRentalById(id: number): Promise<RentalDto> {
    const data = await this.rentalRepo.getAsyncWithJoin(id, {
      user: true,
      equipment: true,
    });

    if (!data) {
      throw new DbException('data not found');
    }

    return data;
  }
}
