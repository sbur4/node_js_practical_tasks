import {NextFunction, Request, RequestHandler, Response} from 'express';

import {findUserById} from "../../core/service/user.service";
import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";

export const authenticationCheck: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    {
        try {
            const userId = req.header(USER_ID_HEADER);

            if (!userId) {
                console.log(`You must be authorized user`);
                return res.status(403).json({data: null, error: {message: 'You must be authorized user'}});
            }

            const user = await findUserById(userId);

            if (!user) {
                console.log(`User is not authorized by id:${userId}`);
                return res.status(401).json({
                    data: null, error: {message: 'User is not authorized'}
                });
            }

            console.log(`User is authorized by id:${userId}`);
            doNext(userId);

        } catch
            (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }

    function doNext(userEmail: string) {
        req.params.userEmail = userEmail;
        next();
    }
}