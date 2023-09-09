import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

let dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: String(configService.get('DB_PASS')),
  database: configService.get('DB_NAME'),
  entities: [
    configService.get('NODE_ENV') === 'production'
      ? './dist/**/*.entity.js'
      : './src/**/*.entity.ts',
  ],
  migrations: [
    configService.get('NODE_ENV') === 'production'
      ? './dist/database/migrations/*.js'
      : './src/database/migrations/*.ts',
  ],
};

if (configService.get('DB_SSL') === 'true') {
  dataSourceOptions = {
    ...dataSourceOptions,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}

export const dataSource = new DataSource(dataSourceOptions);
