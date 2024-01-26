import dotenv from 'dotenv';
import express, { Express } from 'express';

import * as database from '../config/database.init';

export async function bootstrap(): Promise<Express> {
    dotenv.config();

    await database.connect();

    const app = express();

    app.use(express.json());

    return app;
}
