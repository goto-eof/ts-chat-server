import {DataSource, DataSourceOptions} from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT!) || 5432,
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: process.env.PGDATABASE || "websoket-chat-server",
    synchronize: false,
    logging: true,
    entities: ['src/entity/*.ts'],
    migrations: ['src/database/migration/*.ts'],
    migrationsRun: true
};
export const AppDataSource = new DataSource(dataSourceOptions);