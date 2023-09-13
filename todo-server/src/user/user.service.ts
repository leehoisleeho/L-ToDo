import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async create(data: any) {
    try {
      const result = await this.user.save(data);
      if (result) {
        return {
          error: 0,
          msg: 'ok',
          data: result,
        };
      }
    } catch (e) {
      return {
        error: e,
        msg: 'create failed',
      };
    }
  }

  /**
   * 验证用户名是否已存在
   * @param username
   * true 表示没有username false 表示有username
   */
  async check(username:string){
    try {
      const result = await this.user.findOneBy({ username });
      if (result===null){
        return 0
      }else {
        return 1
      }
    }catch (e){
      return{
        error:e,
        msg:'failed'
      }
    }
  }
  async findOne(username: string) {
    try {
      const result = await this.user.findOneBy({ username });
      if (result) {
        return {
          error: 0,
          msg: 'ok',
          data: result,
        };
      }
    } catch (e) {
      return {
        error: e,
        msg: 'create failed',
      };
    }
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }
}
