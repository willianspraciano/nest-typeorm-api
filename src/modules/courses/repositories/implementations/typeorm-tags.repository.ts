import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DATABASE_PROVIDERS_TOKENS } from '@database/database.providers';
import { ITagsRepository } from '../interfaces/tags-repository.interface';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class TypeormTagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor(
    @Inject(DATABASE_PROVIDERS_TOKENS.DataSource)
    private dataSource: DataSource,
  ) {
    this.ormRepository = dataSource.getRepository(Tag);
  }

  async create(tagData: Partial<Tag>): Promise<Tag> {
    const tag = this.ormRepository.create(tagData);
    return await this.ormRepository.save(tag);
  }

  async update(id: string, tagData: Partial<Tag>): Promise<Tag> {
    return await this.ormRepository.preload({ id, ...tagData });
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<Tag[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<Tag | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Tag | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}
