import {NextFunction, Request, RequestHandler, Response} from 'express';
import jwt from 'jsonwebtoken'
import {IUserEntity, USER_ROLE} from "../../data/entity/user.entity";

export const authenticationCheck: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.log(`Token is required`);
            return res.status(403).json({data: null, error: {message: 'Token is required'}});
        }

        const [tokenType, token] = authHeader.split(' ')

        if (tokenType !== 'Bearer' && !token) {
            console.log('Invalid Token');
            return res.status(403).send('Invalid Token')
        }

        try {
            const user = jwt.verify(
                token,
                process.env.TOKEN_KEY!
            ) as IUserEntity;

            req.user = user
        } catch (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({error: {message: 'Invalid Token'}});
        }

        return next();
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
}