import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserModel } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public findAll(): Array<UserModel> {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): UserModel {
    return this.userService.findOne(id);
  }

  @Post()
  public create(@Body() user: UserModel): UserModel {
    return this.userService.create(user);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.userService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserModel,
  ): UserModel {
    return this.userService.update(id, user);
  }
}
