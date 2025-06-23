import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdService } from './services/getUserById.service';
import { GetUserAddressesService } from './services/getUserAddresses.service';
import { AddressDto } from './dto/address.dto';
import { UserDto } from './dto/user.dto';
import { GetAllUserService } from './services/getAllUsers.service';
import { EditUserService } from './services/updateUser.service';
import { CreateUserService } from './services/createUser.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { addAddressService } from './services/addUserAddress.service';
import { DeleteUserService } from './services/deleteUser.service';
import { DeleteAddressService } from './services/deleteAddress.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUserAddressService: GetUserAddressesService,
    private readonly getAllUserService: GetAllUserService,
    private readonly editUserService: EditUserService,
    private readonly createUserService: CreateUserService,
    private readonly addAddressService: addAddressService,
    private readonly deleteUserService: DeleteUserService,
    private readonly deleteAddressService: DeleteAddressService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.createUserService.createUser(createUserDto);
  }

  @Post('address')
  addAddress(@Body() createAddressDto: CreateAddressDto): Promise<AddressDto> {
    return this.addAddressService.createAddress(createAddressDto);
  }

  @Get()
  findAllUser(): Promise<UserDto[]> {
    return this.getAllUserService.getAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') userId: string): Promise<UserDto> {
    return this.getUserByIdService.getUserById(+userId);
  }

  @Get('/:id/address')
  getUserAddresses(@Param('id') userId: string): Promise<AddressDto[]> {
    return this.getUserAddressService.getUserAddresses(+userId);
  }

  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.editUserService.editUser(updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteUserService.deleteUser(+id);
  }

  @Delete('address/:id')
  deleteAddress(@Param('id') id: string) {
    return this.deleteAddressService.deleteAddress(+id);
  }
}
