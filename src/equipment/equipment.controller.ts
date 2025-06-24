import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { GetAllEquipmentService } from './services/getAllEquipments.service';
import { GetEquipmentbyIdService } from './services/getEquipById.service';
import { GetAllCategoryService } from './services/getAllCategory.service';
import { AddEquipmentService } from './services/addEquipment.service';
import { EquipmentDto } from './dto/equipment.dto';
import { categoryDto } from './dto/category.dto';
import { editEquipmentService } from './services/editEquipment.service';
import { RemoveEquipmentService } from './services/removeEquipment.service';
import { GetPaginateEquipmentService } from './services/getPaginatEquipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(
    private readonly getAllEquipService: GetAllEquipmentService,
    private readonly getEquipByIdService: GetEquipmentbyIdService,
    private readonly getAllCategoryService: GetAllCategoryService,
    private readonly addEquipmentService: AddEquipmentService,
    private readonly editEquipService: editEquipmentService,
    private readonly removeEquipService: RemoveEquipmentService,
    private readonly getPaginateEquipService: GetPaginateEquipmentService,
  ) {}

  @Post()
  addEquipment(
    @Body() createEquipmentDto: CreateEquipmentDto,
  ): Promise<EquipmentDto> {
    return this.addEquipmentService.addEquipment(createEquipmentDto);
  }

  @Get()
  findAllEquipment(): Promise<EquipmentDto[]> {
    return this.getAllEquipService.getAllEquipments();
  }

  @Get(':page/:perPage')
  findPaginatEquipment(
    @Param('page') page: string,
    @Param('perPage') perPage: string,
  ): Promise<EquipmentDto[]> {
    return this.getPaginateEquipService.getPaginateEquipments(+page, +perPage);
  }

  @Get('/category')
  findAllCategory(): Promise<categoryDto[]> {
    return this.getAllCategoryService.getAll();
  }

  @Get(':id')
  findOneEquipment(@Param('id') id: string): Promise<EquipmentDto> {
    return this.getEquipByIdService.getEquipment(+id);
  }

  @Patch(':id')
  updateEquipment(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<EquipmentDto> {
    return this.editEquipService.editEquipment(updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.removeEquipService.RemoveEquipment(+id);
  }
}
