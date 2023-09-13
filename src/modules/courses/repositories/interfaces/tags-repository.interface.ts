import { Tag } from '../../entities/tag.entity';

export interface ITagsRepository {
  create(tagData: Partial<Tag>): Promise<Tag>;
  update(id: string, tagData: Partial<Tag>): Promise<Tag>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Tag[]>;
  findById(id: string): Promise<Tag | undefined>;
  findByName(name: string): Promise<Tag | undefined>;
}
