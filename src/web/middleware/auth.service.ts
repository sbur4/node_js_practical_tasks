import {NextFunction, Request, RequestHandler, Response} from 'express';
import jwt from 'jsonwebtoken'
import {IUserEntity, USER_ROLE} from "../../data/entity/user.entity";
import {findUserByEmail} from "../../core/service/user.service";

export const authenticationCheck: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.warn(`Token is required`);
            return res.status(403).json({data: null, error: {message: 'Token is required'}});
        }

        const [tokenType, token] = authHeader.split(' ')

        if (tokenType !== 'Bearer' && !token) {
            console.warn('Invalid Token');
            return res.status(403).send('Invalid Token')
        }

        try {
            const user = jwt.verify(
                token,
                process.env.TOKEN_KEY!
            ) as IUserEntity;

            req.user = user;
        } catch (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({error: {message: 'Invalid Token'}});
        }

        if (req.url.search("cart") && req.method === 'DELETE') {
            const user = await findUserByEmail(req.user.email!);
            if (user?.role !== USER_ROLE.ADMIN) {
                res.status(403).json({
                    error: {
                        message: 'Forbidden',
                    },
                })
                return;
            }
        }
        return next();
    }
}