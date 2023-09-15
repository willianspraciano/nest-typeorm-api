import { TypeormUsersRepository } from './repositories';

export const USERS_PROVIDERS_TOKENS = {
  UsersRepository: 'UsersRepository',
} as const;

export const usersProviders = [
  {
    provide: USERS_PROVIDERS_TOKENS.UsersRepository,
    useClass: TypeormUsersRepository,
  },
];
