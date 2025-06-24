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

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly getAllEquipService: GetAllEquipmentService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    // return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  findAllEquipment() {
    return this.getAllEquipService.getAllEquipments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.equipmentService.findOne(+id);
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
