import {Controller, Post, Body, Param} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('check/:username')
  check(@Param('username') username:string){
    return this.userService.check(username)
  }

  @Post('create')
  create(@Body() data: any) {
    return this.userService.create(data);
  }
}
