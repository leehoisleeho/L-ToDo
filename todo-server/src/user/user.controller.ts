import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async login(@Body() data: any) {
    const res = await this.userService.findOne(data.username);
    if (res.error === 0 && res.data.password === data.password) {
      return {
        error: 0,
        msg: '登录成功',
        data: res.data,
      };
    } else {
      return {
        error: 1,
        msg: '账号密码错误',
      };
    }
  }

  @Post('create')
  create(@Body() data: any) {
    return this.userService.create(data);
  }
}
