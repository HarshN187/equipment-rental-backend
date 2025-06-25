import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { categoryDto } from '../dto/category.dto';
import { DbException } from 'src/common/exceptions';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetCategoryResDto } from '../dto/getCategoryRes.dto';

@Injectable()
export class GetAllCategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getAll(): Promise<GetCategoryResDto[]> {
    const result = await this.categoryRepo.allAsyncWithJoin(
      {},
      {
        equipments: true,
      },
    );

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(
      result,
      categoryDto,
      GetCategoryResDto,
    );

    return response;
  }
}
