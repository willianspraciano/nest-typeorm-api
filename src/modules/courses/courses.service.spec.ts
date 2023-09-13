import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ICourseRepository,
  ITagsRepository,
  FakeCoursesRepository,
  FakeTagsRepository,
} from './repositories';

describe('CoursesService', () => {
  let service: CoursesService;
  let coursesRepository: ICourseRepository;
  let tagsRepository: ITagsRepository;

  beforeEach(async () => {
    coursesRepository = new FakeCoursesRepository();
    tagsRepository = new FakeTagsRepository();
    service = new CoursesService(coursesRepository, tagsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should creates a course', async () => {
    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };
    const newCourse = await service.create(createCourseDto);
    expect(newCourse).toHaveProperty('id');
    expect(newCourse.name).toBe(createCourseDto.name);
  });

  it('should list courses', async () => {
    const course1 = await service.create({
      name: 'Curso de NestJS',
      description: 'Este é um curso de Nest.js',
      tags: ['Nestjs'],
    });
    const course2 = await service.create({
      name: 'Express',
      description: 'Este é um curso de Express',
      tags: ['TypeORM'],
    });

    const courses = await service.findAll();
    expect(courses).toEqual([course1, course2]);
  });

  it('should gets a course', async () => {
    const courseCreated = await service.create({
      name: 'Curso de NestJS',
      description: 'Este é um curso de Nest.js',
      tags: ['Nestjs'],
    });

    const courseFound = await service.findOne(courseCreated.id);
    expect(courseFound).toStrictEqual(courseCreated);
  });

  it('should throw a not found exception when not found a course to show', async () => {
    try {
      await service.findOne('non-existing-id');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should updates a course', async () => {
    const tag1 = 'Nestjs';
    const tag2 = 'TypeScript';
    const tag3 = 'TypeOrm';
    const course = await service.create({
      name: 'Título do Curso',
      description: 'Este é a descrição do título',
      tags: [tag1],
    });

    const name = 'Título do Curso Atualizado';
    const description = 'Este é a descrição do título Atualizado';
    const tags = [tag2, tag3];
    const updateCourseDto: UpdateCourseDto = { name, description, tags };

    const updatedCourse = await service.update(course.id, updateCourseDto);
    expect(updatedCourse.name).toBe(name);
    expect(updatedCourse.description).toBe(description);
    expect(updatedCourse.tags).toHaveLength(2);
    expect(updatedCourse.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: tag2 }),
        expect.objectContaining({ name: tag3 }),
      ]),
    );
  });

  it('should throw a not found exception when not found a course to update', async () => {
    try {
      await service.update('non-existing-id', {});
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should deletes a course', async () => {
    const course = await service.create({
      name: 'Título do Curso',
      description: 'Este é a descrição do título',
      tags: ['tag'],
    });

    await service.remove(course.id);

    await expect(service.findOne(course.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
