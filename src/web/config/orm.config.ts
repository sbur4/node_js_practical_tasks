import * as dotenv from 'dotenv';

import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

dotenv.config();

const options: Options<PostgreSqlDriver> = {
    driver: PostgreSqlDriver,
    dbName: process.env.MIKRO_ORM_DB_NAME,
    user: process.env.MIKRO_ORM_USER,
    password: process.env.MIKRO_ORM_PASSWORD,
    host: process.env.MIKRO_ORM_HOST,

    entities: ['./dist/src/data/entity'], // path to your JS entities (dist), relative to `baseDir`
    entitiesTs: ['./src/data/entity'], // path to our TS entities (src), relative to `baseDir`
    migrations: {
        path: './dist/migrations', // path to the folder with migrations
        pathTs: './src/data/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    }
};

export default options;