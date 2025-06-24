import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class GetAllCategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAll() {
    const result = await this.categoryRepo.allAsync({});

    return result;
  }
}
