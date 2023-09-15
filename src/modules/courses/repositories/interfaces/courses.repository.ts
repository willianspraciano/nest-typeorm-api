import { Course } from '../../entities/course.entity';

export abstract class ICourseRepository {
  abstract create(courseData: Partial<Course>): Promise<Course>;
  abstract update(id: string, courseData: Partial<Course>): Promise<Course>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Course[]>;
  abstract findOneById(id: string): Promise<Course | undefined>;
}
