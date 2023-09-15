import { Tag } from '../../entities/tag.entity';

export abstract class ITagsRepository {
  abstract create(tagData: Partial<Tag>): Promise<Tag>;
  abstract update(id: string, tagData: Partial<Tag>): Promise<Tag>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Tag[]>;
  abstract findById(id: string): Promise<Tag | undefined>;
  abstract findByName(name: string): Promise<Tag | undefined>;
}
