import { User } from '../../entities/user.entity';

export abstract class IUsersRepository {
  abstract create(courseData: Partial<User>): Promise<User>;
  abstract update(id: string, courseData: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findOneById(id: string): Promise<User | undefined>;
  abstract findOneByEmail(email: string): Promise<User | undefined>;
}
