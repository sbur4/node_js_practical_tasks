// import {Request, Response} from 'express';
//
// import {createOrder, isEmptyCart} from "../../core/service/order.service";
// import {SERVER_ERROR_RESPONSE, USER_ID_HEADER} from "../../core/util/response.util";
//
// class OrderController {
//     public makeOrder(req: Request, res: Response): void {
//         try {
//             const userId = req.header(USER_ID_HEADER);
//
//             const isEmpty = isEmptyCart(userId!);
//             if (isEmpty!) {
//                 res.status(400).json({
//                     data: null,
//                     error: 'Cart is empty'
//                 });
//                 console.log(`Cart is empty for user id:${userId}`);
//                 return;
//             }
//
//             const order = createOrder(userId!);
//             console.log(`Order was made by user id:${userId}`);
//
//             res.status(201).json({
//                 data: {order: order},
//                 error: null
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json(SERVER_ERROR_RESPONSE);
//         }
//     }
// }
//
// export default new OrderController();