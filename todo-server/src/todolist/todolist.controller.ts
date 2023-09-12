import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post('create')
  create(@Body() data: any) {
    return this.todolistService.create(data);
  }

  @Get('find/:userid')
  find(@Param('userid') userid: number) {
    return this.todolistService.findOne(userid);
  }

  @Post('update')
  update(@Body() data: any) {
    return this.todolistService.update(data);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.todolistService.remove(id);
  }
}
