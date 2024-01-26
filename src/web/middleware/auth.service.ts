import {NextFunction, Request, RequestHandler, Response} from 'express';
import jwt from 'jsonwebtoken'
import {IUserEntity, USER_ROLE} from "../../data/entity/user.entity";

export const authenticationCheck: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).send('Token is required')
        }

        const [tokenType, token] = authHeader.split(' ')

        if (tokenType !== 'Bearer') {
            return res.status(403).send('Invalid Token')
        }

        try {
            const user = jwt.verify(
                token,
                process.env.TOKEN_KEY!
            ) as IUserEntity

            req.user = user
        } catch (err) {
            return res.status(401).send('Invalid Token')
        }
        return next()
    }
}
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== USER_ROLE.ADMIN) {
        return res.status(403).json({
            error: {
                message: 'Forbidden',
            },
        })
    }
    next();

    //     try {
    //         const userId = req.header(USER_ID_HEADER);
    //
    //         if (!userId) {
    //             console.log(`You must be authorized user`);
    //             return res.status(403).json({data: null, error: {message: 'You must be authorized user'}});
    //         }
    //
    //         const user = await findUserById(userId);
    //
    //         if (!user) {
    //             console.log(`User is not authorized by id:${userId}`);
    //             return res.status(401).json({
    //                 data: null, error: {message: 'User is not authorized'}
    //             });
    //         }
    //
    //         console.log(`User is authorized by id:${userId}`);
    //         doNext(userId);
    //
    //     } catch
    //         (error) {
    //         console.error(error);
    //         res.status(500).json(SERVER_ERROR_RESPONSE);
    //     }
    // }
    //
    // function doNext(userEmail: string) {
    //     req.params.userEmail = userEmail;
    //     next();
    // }
}

// todo +