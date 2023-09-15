import { User } from '../../entities/user.entity';

export interface IUsersRepository {
  create(courseData: Partial<User>): Promise<User>;
  update(id: string, courseData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findOneById(id: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
}
