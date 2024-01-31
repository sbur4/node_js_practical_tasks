import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { IUserEntity, UserEntity } from '../../data/entity/user.entity'
import { SERVER_ERROR_RESPONSE } from '../../core/util/response.util'
import { findUserByEmail } from '../../core/service/user.service'

class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, name, role } = req.body as IUserEntity

            if (!(email && password && name && role)) {
                console.log(
                    `Invalid user email:${email} and password:${password}`
                )
                res.status(400).send('All input is required')
                return
            }

            const oldUser = await findUserByEmail(email)

            if (oldUser) {
                console.log(`User with ${email} already exist. Please login`)
                res.status(409).send('User Already Exist. Please Login')
                return
            }

            const encryptedPassword = await bcrypt.hash(password, 10)

            const newUser = new UserEntity({
                email,
                password: encryptedPassword,
                name,
                role,
            })

            await newUser.save()

            console.log(`User with ${email} registered successfully`)
            res.status(201).json({
                // data: {message: 'User registered successfully'},
                data: newUser,
                error: null,
            })
        } catch (error) {
            console.error(error)
            res.status(500).json(SERVER_ERROR_RESPONSE)
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body as IUserEntity

            if (!(email && password)) {
                console.log(
                    `Invalid user email:${email} and password:${password}`
                )
                res.status(400).json({
                    data: null,
                    error: 'All input is required',
                })
                return
            }

            const user: IUserEntity | null = await UserEntity.findOne({ email })

            if (user! && (await bcrypt.compare(password, user!.password))) {
                const token = jwt.sign(
                    { user_id: user.id, email: email, role: user.role },
                    process.env.TOKEN_KEY!,
                    { expiresIn: '2h' }
                )

                console.log(`Token was created to user:${email}`)

                res.status(201).json({
                    data: { token },
                    error: null,
                })
                return
            }
            console.log(`Invalid Credentials`)

            res.status(400).send('Invalid Credentials')
        } catch (error) {
            console.error(error)
            res.status(500).json({
                data: null,
                error: {
                    message: (error as Error).message,
                },
            })
        }
    }
}

export default new UserController()
