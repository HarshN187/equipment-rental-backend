import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';

@Injectable()
export class GetRentalsByFilterService {
  constructor(private readonly rentalRepo: RentalRepository) {}

  async getRentals(userId: number = 0, equipmentId: number = 0) {
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

    return data;
  }
}
