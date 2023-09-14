import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todolist } from './entities/todolist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist) private readonly todolist: Repository<Todolist>,
  ) {}
  async create(data:any) {
    try {
      const result = await this.todolist.save(data);
      if (result) {
        return {
          error: 0,
          msg: 'ok',
        };
      }
    } catch (e) {
      return {
        error: e,
        msg: 'create failed',
      };
    }
  }

  async findOne(uuid:string) {
    try {
      const result = await this.todolist.find({ where: { uuid }});
      return {
        error: 0,
        msg: 'ok',
        data: result,
      };
    } catch (e) {
      return {
        error: e,
        msg: 'not fined',
      };
    }
  }

  async update(data) {
    try {
      const result = await this.todolist.update(data.id, data);
      if (result) {
        return {
          error: 0,
          msg: 'ok',
        };
      }
    } catch (e) {
      return {
        msg: 'update failed 缺少必要参数',
      };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.todolist.delete(id);
      if (result.affected) {
        return {
          error: 0,
          msg: 'ok',
        };
      } else {
        return {
          error: 1,
          msg: 'delete failed',
        };
      }
    } catch (e) {
      return {
        error: 1,
        msg: e,
      };
    }
  }
}
