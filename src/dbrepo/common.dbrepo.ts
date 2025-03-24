import { Injectable } from '@nestjs/common';
import { Model, ModelStatic } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

@Injectable()
export class CommonDbRepo {
  async create<T extends Model>(model: ModelStatic<T>, data: any): Promise<T> {
    return await model.create(data);
  }

  async getRow<T extends Model>(
    model: ModelStatic<T>,
    where: any,
  ): Promise<T | null> {
    where.raw = true;
    return await model.findOne(where);
  }

  async findOne<T extends Model>(
    model: ModelStatic<T>,
    where: any,
  ): Promise<T | null> {
    return await model.findOne(where);
  }

  async update<T extends Model>(
    model: ModelStatic<T>,
    where: any,
    data: any,
  ): Promise<boolean> {

    await model.update(data, where);
    return true;
  }

  async getListAll<T extends Model>(
    model: ModelStatic<T>,
    query: any,
  ): Promise<T[]> {
    // query.raw = true;
    return await model.findAll(query);
  }

  async count<T extends Model>(
    model: ModelStatic<T>,
    query: any,
  ): Promise<number> {
    const result = await model.count(query);
    return typeof result == 'number' ? result : 0;
  }

  async bulkCreate<T extends Model>(
    model: ModelStatic<T>,
    data: MakeNullishOptional<T['_creationAttributes']>[],
  ): Promise<T[]> {
    return await model.bulkCreate(data);
  }

  async getAllAndCount<T extends Model>(
    model: ModelStatic<T>,
    query: any,
  ): Promise<{ rows: T[]; count: number }> {
    // query.raw = true;
    const result = await model.findAndCountAll(query);
    return { rows: result.rows, count: result.count };
  }
}
