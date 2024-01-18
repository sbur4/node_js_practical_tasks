// import { Reference } from '@mikro-orm/core';
// import { EntityRepository } from '@mikro-orm/postgresql';
//
// import { DI } from "../../web/demo.app"; // todo
// import { OrderEntity, OrderStatus } from "../entity/order.entity";
// import { CartEntity } from "../entity/cart.entity";
// import { UserEntity } from "../entity/user.entity";
//
// export class OrderRepository extends EntityRepository<OrderEntity> {
//     public async isCartEmpty(userId: string) {
//         return null;
//         //     return ORDERS_DB.some((order) => order.userId === userId && order.items.length === 0)
//     }
//
//     async addNewOrder(userId: string) {
//         const user = await DI.userRepository.findOne({ id: userId });
//
//         if (!user) {
//             throw new Error(`User ID ${userId} was not found.`);
//         }
//
//         const cart = await DI.cartRepository.findOne({ user, isDeleted: false });
//
//         if (!cart) {
//             throw new Error(`The cart for user ID ${user.id} was not found.`);
//         }
//
//         // TODO: test data
//         const payment = {
//             type: "creditCard",
//         };
//         const delivery = {
//             type: "courier",
//             address: {
//                 street: "Esenina",
//                 house: "1",
//                 apartment: "1",
//             },
//         };
//         const comments = "test";
//         const total = cart.items.reduce((acc, item) => {
//             return acc + item.product.price * item.count;
//         }, 0);
//
//         const order = new OrderEntity(
//             payment,
//             delivery,
//             comments,
//             OrderStatus.CREATED,
//             total
//         );
//         order.user = Reference.createFromPK(UserEntity, userId);
//         order.cart = Reference.createFromPK(CartEntity, cart.id);
//
//         return await DI.em.persistAndFlush(order);
//     }
// }
//
// // import {getUniqueID} from "../../core/util/uuid.generator.utils";
// // import {OrderEntity, OrderStatus} from "../entity/order.entity";
// // import {getCartByUserId} from "./cart.repository";
// // import {calculateTotal} from "../../core/converter/cart.dto.converter";
// //
// // const ORDERS_DB: OrderEntity[] = [];
// //
// // export function isCartEmpty(userId: string): boolean {
// //     return ORDERS_DB.some((order) => order.userId === userId && order.items.length === 0)
// // }
// //
// // export function addNewOrder(userId: string): OrderEntity {
// //     const orderId = getUniqueID;
// //     const cart = getCartByUserId(userId);
// //     const payment = {
// //         type: 'paypal',
// //         address: 'London',
// //         creditCard: '1234-1234-1234-1234'
// //     };
// //     const delivery = {
// //         type: 'courier',
// //         address: {
// //             street: 'Bohdana Khmelnytskoho',
// //             house: '93',
// //             apartment: '38',
// //         }
// //     };
// //     const comments = 'test';
// //     const total = calculateTotal(cart.items);
// //
// //     const order: OrderEntity = {
// //         id: orderId(),
// //         userId,
// //         cartId: cart.id,
// //         items: cart.items,
// //         payment,
// //         delivery,
// //         comments,
// //         status: 'created' as OrderStatus,
// //         total
// //     };
// //
// //     ORDERS_DB.push(order);
// //
// //     return order;
// // }