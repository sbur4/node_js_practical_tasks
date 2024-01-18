import {NextFunction, Request, RequestHandler, Response} from 'express';

import {SERVER_ERROR_RESPONSE} from "../../core/util/response.util";
import {isUserExist} from "../../core/service/user.service";

export const authenticationCheck: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    {
        try {
            const userId = req.header('x-user-id');

            if (!userId) {
                console.log(`You must be authorized user`);
                return res.status(403).json({data: null, error: {message: 'You must be authorized user'}});
            }

            if (!isUserExist(userId)) {
                console.log(`User is not authorized ${userId}`);
                return res.status(401).json({
                    data: null, error: {message: 'User is not authorized'}
                });
            }

            doNext(userId);
        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    function doNext(userId: string) {
        req.params.userId = userId;
        next();
    }
}