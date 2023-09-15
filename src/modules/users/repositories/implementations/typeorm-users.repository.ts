import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_PROVIDERS_TOKENS } from '@database/database.providers';
import { User } from '../../entities/user.entity';
import { IUsersRepository } from '../interfaces/users-repository.interface';

@Injectable()
export class TypeormUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor(
    @Inject(DATABASE_PROVIDERS_TOKENS.DataSource)
    private dataSource: DataSource,
  ) {
    this.ormRepository = dataSource.getRepository(User);
  }

  async create(data: Partial<User>): Promise<User> {
    const item = this.ormRepository.create(data);
    return await this.ormRepository.save(item);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const item = await this.ormRepository.preload({ id, ...data });
    await this.ormRepository.save(item);
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.ormRepository.find({});
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }
}
