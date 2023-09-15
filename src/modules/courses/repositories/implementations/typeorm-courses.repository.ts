import { DataSource, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_PROVIDERS_TOKENS } from '@database/database.providers';
import { Course } from '../../entities/course.entity';
import { ICourseRepository } from '../interfaces/courses.repository';

@Injectable()
export class TypeormCourseRepository implements ICourseRepository {
  private ormRepository: Repository<Course>;
  constructor(
    @Inject(DATABASE_PROVIDERS_TOKENS.DataSource)
    private dataSource: DataSource,
  ) {
    this.ormRepository = dataSource.getRepository(Course);
  }

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = this.ormRepository.create(courseData);
    return await this.ormRepository.save(course);
  }

  async update(id: string, courseData: Partial<Course>): Promise<Course> {
    const course = await this.ormRepository.preload({ id, ...courseData });
    await this.ormRepository.save(course);
    return course;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<Course[]> {
    return this.ormRepository.find({
      relations: { tags: true },
    });
  }

  async findOneById(id: string): Promise<Course | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: { tags: true },
    });
  }
}
