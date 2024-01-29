import dotenv from 'dotenv';
import express, {Express} from 'express';

import * as database from '../config/database.init';
import {fillDatabase} from "../../data/storage/test.storage";

export async function bootstrap(): Promise<Express> {
    dotenv.config();

    await database.connect();

    // Uncomment the line below to fill the database only once
    await fillDatabase();

    const app = express();

    app.use(express.json());

    return app;
}
