import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  AuthGuard,
  CurrentAccountId,
} from '@vsp/backend-shared/auth-session';

import { CreateUserDto, UpdateUserDto } from './users.dto.js';
import { UsersService } from './users.service.js';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @CurrentAccountId() accountId: string,
  ) {
    return this.usersService.create(dto, accountId);
  }

  @Get()
  findAll(@CurrentAccountId() accountId: string) {
    return this.usersService.findAll(accountId);
  }

  @Get(':id')
  findOneById(@Param('id') id: string, @CurrentAccountId() accountId: string) {
    return this.usersService.findOneById(id, accountId);
  }

  @Put(':id')
  updateById(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentAccountId() accountId: string,
  ) {
    return this.usersService.updateById(id, dto, accountId);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string, @CurrentAccountId() accountId: string) {
    return this.usersService.deleteById(id, accountId);
  }
}
