import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('rentals')
export class RentalsController {
  constructor() {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    // return this.rentalsService.create(createRentalDto);
  }

  @Get()
  findAll() {
    // return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.rentalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    // return this.rentalsService.update(+id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.rentalsService.remove(+id);
  }
}
