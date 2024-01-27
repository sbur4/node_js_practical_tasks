import {save} from "../../data/repository/order.repository";
import {CartEntity} from "../../data/entity/cart.entity";
import {OrderEntity, OrderStatus} from "../../data/entity/order.entity";
import OrderCreateException from "../exception/order.create.exception";
import {getUniqueID} from "../util/uuid.generator.utils";
import {calculateTotal} from "../converter/cart.dto.converter";

export async function createOrder(cart: CartEntity): Promise<OrderEntity> {
    try {
        const orderId = getUniqueID;

        const payment = {
            type: 'paypal',
            address: 'London',
            creditCard: '1234-1234-1234-1234'
        };

        const delivery = {
            type: 'courier',
            address: {
                street: 'Bohdana Khmelnytskoho',
                house: '93',
                apartment: '38',
            }
        };

        const comments = 'test';

        const total: number = await calculateTotal(cart.items);

        const order: OrderEntity = {
            id: orderId(),
            userId: cart.userId,
            cartId: cart.id,
            items: cart.items,
            payment: payment,
            delivery: delivery,
            comments: comments,
            status: 'created' as OrderStatus,
            total: total
        };

        return await save(order);
    } catch (error) {
        console.error(`Can't create an order for user id:${cart.userId} `, error);
        throw new OrderCreateException(cart.userId);
    }
}