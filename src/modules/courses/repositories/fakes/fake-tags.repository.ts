import { Tag } from '../../entities/tag.entity';
import { ITagsRepository } from '../interfaces/tags-repository.interface';

export class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  async create(tagData: Partial<Tag>): Promise<Tag> {
    const tag = new Tag();
    Object.assign(tag, tagData);
    this.tags.push(tag);
    return tag;
  }

  async update(id: string, tagData: Partial<Tag>): Promise<Tag | undefined> {
    const tagIndex = this.tags.findIndex((tag) => tag.id === id);
    if (tagIndex === -1) {
      return undefined;
    }

    const updatedTag = { ...this.tags[tagIndex], ...tagData };
    this.tags[tagIndex] = updatedTag;
    return updatedTag;
  }

  async delete(id: string): Promise<void> {
    this.tags = this.tags.filter((tag) => tag.id !== id);
  }

  async findAll(): Promise<Tag[]> {
    return this.tags;
  }

  async findById(id: string): Promise<Tag | undefined> {
    return this.tags.find((tag) => tag.id === id);
  }

  async findByName(name: string): Promise<Tag | undefined> {
    return this.tags.find((tag) => tag.name === name);
  }
}
