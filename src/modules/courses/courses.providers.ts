import { TypeormCourseRepository, TypeormTagsRepository } from './repositories';

export const COURSES_PROVIDERS_TOKENS = {
  CoursesRepository: 'CoursesRepository',
  TagsRepository: 'CoursesRepository',
} as const;

export const coursesProviders = [
  {
    provide: COURSES_PROVIDERS_TOKENS.CoursesRepository,
    useClass: TypeormCourseRepository,
  },
  {
    provide: COURSES_PROVIDERS_TOKENS.TagsRepository,
    useClass: TypeormTagsRepository,
  },
];
