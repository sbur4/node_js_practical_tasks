import express from 'express';

import UserController from "../controller/user.controller";

const userRouter = express.Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);

export const USER_URL = '/api'

export default userRouter;
