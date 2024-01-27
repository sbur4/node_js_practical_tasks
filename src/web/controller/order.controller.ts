import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
import {Request, Response} from "express";
import {createOrder} from "../../core/service/order.service";
import {findCarByUserId} from "../../core/service/cart.service";

class OrderController {
    public async makeOrder(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.header(USER_ID_HEADER);

            const cart = await findCarByUserId(userId!);

            if (!cart) {
                console.log(`User id:${userId} has no cart`);

                res.status(400).json({
                    data: null,
                    error: `User id:${userId} has no cart`
                });
                return;
            }

            if (cart.products.length === 0) {
                res.status(400).json({
                    data: null,
                    error: 'Cart is empty'
                });
                console.log(`Cart is empty for user id:${userId}`);
                return;
            } else {
                if (cart.isDeleted) {
                    res.status(404).json({
                        data: null,
                        error: {
                            message: `Cart was disabled for the user id:${userId}`
                        }
                    });
                    console.warn(`Cart was disabled for the user id:${userId}`);
                    return;
                }

                console.log(`Cart was found by user id:${userId}`);

                const order = await createOrder(cart!);
                console.log(`User id:${userId} made order id:${order.id}`);

                res.status(201).json({
                    data: {order: order},
                    error: null
                });
            }
        } catch
            (error) {
            console.error(error);
            res.status(500).json(SERVER_ERROR_RESPONSE);
        }
    }
}

export default new OrderController();