import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { GetUserPaginationService } from './services/getUserPagination.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
    private readonly getUserPagination: GetUserPaginationService,
  ) {}

  @Post()
  // @Roles(['user'])
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.createUserService.createUser(createUserDto);
  }

  @Post('address')
  @Roles(['user'])
  addAddress(@Body() createAddressDto: CreateAddressDto): Promise<AddressDto> {
    return this.addAddressService.createAddress(createAddressDto);
  }

  @Get()
  @Roles(['admin'])
  findAllUser(): Promise<UserDto[]> {
    return this.getAllUserService.getAllUser();
  }

  @Get('/:id/address')
  @Roles(['user', 'admin'])
  getUserAddresses(@Param('id') userId: string): Promise<AddressDto[]> {
    return this.getUserAddressService.getUserAddresses(+userId);
  }

  @Get('/pagination/:perPage/:page')
  @Roles(['admin'])
  getUserWithPagination(
    @Param('perPage') perPage: string,
    @Param('page') page: string,
  ): Promise<UserDto[]> {
    return this.getUserPagination.getUserPagination(+page, +perPage);
  }

  @Patch()
  @Roles(['user', 'admin'])
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.editUserService.editUser(updateUserDto);
  }

  @Delete(':id')
  @Roles(['user', 'admin'])
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.deleteUserService.deleteUser(+id);
  }

  @Delete('address/:id')
  @Roles(['user'])
  deleteAddress(@Param('id') id: string): Promise<boolean> {
    return this.deleteAddressService.deleteAddress(+id);
  }

  @Get(':id')
  @Roles(['user', 'admin'])
  findOneUser(@Param('id') userId: string): Promise<UserDto> {
    return this.getUserByIdService.getUserById(+userId);
  }
}
