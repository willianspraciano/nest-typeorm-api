import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return course;
  }

  create(createCourseDTO: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDTO);
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    await this.courseRepository.delete(+id);
  }
}
