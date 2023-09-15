import { Injectable } from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { IUsersRepository } from '../interfaces/users.repository';

@Injectable()
export class FakeCoursesRepository implements IUsersRepository {
  private items: User[] = [];

  async create(data: Partial<User>): Promise<User> {
    const item = new User();
    Object.assign(item, data);
    this.items.push(item);
    return item;
  }

  async update(id: string, data: Partial<User>): Promise<User | undefined> {
    const index = this.items.findIndex((course) => course.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.items[index], ...data };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((course) => course.id !== id);
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.items.find((item) => item.id === id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.items.find((item) => item.email === email);
  }
}
