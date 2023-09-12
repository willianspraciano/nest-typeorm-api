import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

let dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
};

if (process.env.DB_SSL === 'true') {
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
