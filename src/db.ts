import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as number | undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/models/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    migrationsRun: true,
    migrationsTableName: "migrations",
    ssl: true
})