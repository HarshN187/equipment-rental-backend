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
import { getAllRentalService } from './services/getAllRentals.service';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly getAllRentalService: getAllRentalService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    // return this.rentalsService.create(createRentalDto);
  }

  @Get()
  getAllRentals() {
    return this.getAllRentalService.getAll();
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
