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

  findAll() {
    return `This action returns all user`;
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
