import { IUsersRepository, TypeormUsersRepository } from './repositories';

export const usersProviders = [
  {
    provide: IUsersRepository,
    useClass: TypeormUsersRepository,
  },
];
