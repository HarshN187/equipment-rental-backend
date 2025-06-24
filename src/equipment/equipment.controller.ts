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

@Controller('equipment')
export class EquipmentController {
  constructor(
    private readonly getAllEquipService: GetAllEquipmentService,
    private readonly getEquipByIdService: GetEquipmentbyIdService,
    private readonly getAllCategoryService: GetAllCategoryService,
    private readonly addEquipmentService: AddEquipmentService,
  ) {}

  @Post()
  addEquipment(
    @Body() createEquipmentDto: CreateEquipmentDto,
  ): Promise<EquipmentDto> {
    return this.addEquipmentService.addEquipment(createEquipmentDto);
  }

  @Get()
  findAllEquipment() {
    return this.getAllEquipService.getAllEquipments();
  }

  @Get('/category')
  findAllCategory() {
    return this.getAllCategoryService.getAll();
  }

  @Get(':id')
  findOneEquipment(@Param('id') id: string) {
    return this.getEquipByIdService.getEquipment(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    // return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.equipmentService.remove(+id);
  }
}
