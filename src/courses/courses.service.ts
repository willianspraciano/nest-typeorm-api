import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do fremework NestJS',
      description: 'Fundamentos do framework NestJS',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    return this.courses.find((course) => course.id === Number(id));
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
  }

  update(id: string, updateCourseDTO: any) {
    const courseIndex = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (courseIndex >= 0) this.courses[courseIndex] = updateCourseDTO;
  }

  remove(id: string) {
    const courseIndex = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (courseIndex >= 0) this.courses.splice(courseIndex, 1);
  }
}
