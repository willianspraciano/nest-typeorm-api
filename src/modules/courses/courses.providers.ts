import {
  ICourseRepository,
  ITagsRepository,
  TypeormCourseRepository,
  TypeormTagsRepository,
} from './repositories';

export const coursesProviders = [
  {
    provide: ICourseRepository,
    useClass: TypeormCourseRepository,
  },
  {
    provide: ITagsRepository,
    useClass: TypeormTagsRepository,
  },
];
