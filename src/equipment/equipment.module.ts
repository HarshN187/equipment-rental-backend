import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { Category } from './entities/category.entity';
import { EquipmentRepository } from './repository/equipment.repository';
import { CategoryRepository } from './repository/category.repository';
import { GetAllEquipmentService } from './services/getAllEquipments.service';
import { mapperProfile } from 'src/common/profiles/mapper.profile';
import { GetEquipmentbyIdService } from './services/getEquipById.service';
import { GetAllCategoryService } from './services/getAllCategory.service';
import { AddEquipmentService } from './services/addEquipment.service';
import { editEquipmentService } from './services/editEquipment.service';
import { RemoveEquipmentService } from './services/removeEquipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, Category])],
  controllers: [EquipmentController],
  providers: [
    EquipmentRepository,
    CategoryRepository,
    GetAllEquipmentService,
    mapperProfile,
    GetEquipmentbyIdService,
    GetAllCategoryService,
    AddEquipmentService,
    editEquipmentService,
    RemoveEquipmentService,
  ],
  exports: [EquipmentRepository, CategoryRepository],
})
export class EquipmentModule {}
