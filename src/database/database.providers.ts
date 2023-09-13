import { dataSource } from '../config/data-source.config';

export const DATABASE_PROVIDERS_TOKENS = {
  DataSource: 'DataSource',
} as const;

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDERS_TOKENS.DataSource,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
