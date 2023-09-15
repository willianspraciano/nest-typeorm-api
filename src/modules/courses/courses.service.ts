import { Injectable, NotFoundException } from '@nestjs/common';

import { Tag } from './entities/tag.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { ICourseRepository, ITagsRepository } from './repositories';

@Injectable()
export class CoursesService {
  constructor(
    private coursesRepository: ICourseRepository,
    private tagsRepository: ITagsRepository,
  ) {}

  async findAll() {
    return await this.coursesRepository.findAll();
  }

  async findOne(id: string) {
    const course = await this.coursesRepository.findOneById(id);

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = await this.coursesRepository.create({
      ...createCourseDto,
      tags,
    });
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOneById(id);
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    return await this.coursesRepository.update(id, {
      ...updateCourseDto,
      tags,
    });
  }

  async remove(id: string) {
    const course = await this.coursesRepository.findOneById(id);

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return await this.coursesRepository.delete(id);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagsRepository.findByName(name);

    if (tag) return tag;

    return this.tagsRepository.create({ name });
  }
}
