import { Injectable } from '@nestjs/common';

import { Course } from '../../entities/course.entity';
import { ICourseRepository } from '../interfaces/courses-repository.interface';

@Injectable()
export class FakeCoursesRepository implements ICourseRepository {
  private courses: Course[] = [];

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = new Course();
    Object.assign(course, courseData);
    this.courses.push(course);
    return course;
  }

  async update(
    id: string,
    courseData: Partial<Course>,
  ): Promise<Course | undefined> {
    const courseIndex = this.courses.findIndex((course) => course.id === id);
    if (courseIndex === -1) {
      return undefined;
    }

    const updatedCourse = { ...this.courses[courseIndex], ...courseData };
    this.courses[courseIndex] = updatedCourse;
    return updatedCourse;
  }

  async delete(id: string): Promise<void> {
    this.courses = this.courses.filter((course) => course.id !== id);
  }

  async findAll(): Promise<Course[]> {
    return this.courses;
  }

  async findOneById(id: string): Promise<Course | undefined> {
    return this.courses.find((course) => course.id === id);
  }
}
