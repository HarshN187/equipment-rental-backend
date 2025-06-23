import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(process.cwd()), 'dist/**/*.entity.js'],
  migrations: [join(process.cwd()), '**/migrations/*.js'],
  synchronize: false,
  migrationsRun: false,
});
