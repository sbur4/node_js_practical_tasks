import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
import {Request, Response} from "express";
import {createOrder} from "../../core/service/order.service";

class OrderController {
    public async makeOrder(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.header(USER_ID_HEADER);
            const cartId = req.body.id;

            const order = await createOrder(userId!, cartId!);
            console.log(`Order was made by user id:${userId}`);

            res.status(201).json({
                data: {order: order},
                error: null
            });
        } catch (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    };
}

export default new OrderController();