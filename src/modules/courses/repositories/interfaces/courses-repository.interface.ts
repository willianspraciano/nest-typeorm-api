import { Course } from '../../entities/course.entity';

export interface ICourseRepository {
  create(courseData: Partial<Course>): Promise<Course>;
  update(id: string, courseData: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Course[]>;
  findOneById(id: string): Promise<Course | undefined>;
}
