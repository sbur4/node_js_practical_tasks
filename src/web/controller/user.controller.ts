import {Request, Response} from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {IUserEntity, UserEntity} from "../../data/entity/user.entity";
import {SERVER_ERROR_RESPONSE} from "../../core/util/response.util";

class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            // Get user input
            const {email, password, name, role} = req.body as IUserEntity;

            // Validate user input
            if (!(email && password && name && role)) {
                res.status(400).send('All input is required')
            }

            // Validate if user already exist in our database
            const oldUser = await UserEntity.findOne({email});

            if (oldUser) {
                res.status(409).send('User Already Exist. Please Login');
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserEntity({
                email,
                password: encryptedPassword,
                name,
                role,
            });

            await newUser.save();

            res.status(201).json({
                data: {message: 'User registered successfully'},
                error: null,
            })

            // if (user && (await bcrypt.compare(password, user.password))) {
            //     // Create token
            //     const token = jwt.sign(
            //         { user_id: user._id, email, role: user.role },
            //         process.env.TOKEN_KEY!,
            //         {
            //             expiresIn: "2h",
            //         }
            //     );
            //
            //     return res.status(200).json({
            //         token
            //     });
            // }
            // res.status(400).send("Invalid Credentials");
        } catch (error) {
            res.status(500).json(SERVER_ERROR_RESPONSE)
        }

    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body as IUserEntity

            // Validate user input
            if (!(email && password)) {
                 res.status(400).send('All input is required')
            }

            const user:IUserEntity = await UserEntity.findOne({email})

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    {user_id: user.id, email: email, role: user.role},
                    process.env.TOKEN_KEY!,
                    {expiresIn: '2h'}
                )
                 res.status(201).json({
                    data: {token},
                    error: null,
                })
            }

            res.status(400).send('Invalid Credentials')
        } catch (error) {
            res.status(500).json({
                data: null,
                error: {
                    message: (error as Error).message,
                },
            })
        }
    }
}


export default new UserController();