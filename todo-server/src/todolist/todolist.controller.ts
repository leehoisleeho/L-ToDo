import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import {TokenGuard} from '../token/token.guard';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  create(@Body() data: any) {
    return this.todolistService.create(data);
  }

  @Get('find/:uuid')
  @UseGuards(TokenGuard)
  find(@Param('uuid') uuid: string) {
    return this.todolistService.findOne(uuid);
  }

  @Post('update')
  @UseGuards(TokenGuard)
  update(@Body() data: any) {
    return this.todolistService.update(data);
  }
  @Delete('delete/:id')
  @UseGuards(TokenGuard)
  delete(@Param('id') id: number) {
    return this.todolistService.remove(id);
  }
}
