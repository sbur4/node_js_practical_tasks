import {getUniqueID} from "../../core/util/uuid.generator.utils";
import {OrderEntity, OrderStatus} from "../entity/order.entity";
import {getCartByUserId} from "./cart.repository";
import {calculateTotal} from "../../core/converter/cart.dto.converter";

const ORDERS_DB: OrderEntity[] = [];

export function isCartEmpty(userId: string): boolean {
    return ORDERS_DB.some((order) => order.userId === userId && order.items.length === 0)
}

export function addNewOrder(userId: string): OrderEntity {
    const orderId = getUniqueID;
    const cart = getCartByUserId(userId);
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
    const total = calculateTotal(cart.items);

    const order: OrderEntity = {
        id: orderId(),
        userId,
        cartId: cart.id,
        items: cart.items,
        payment,
        delivery,
        comments,
        status: 'created' as OrderStatus,
        total
    };

    ORDERS_DB.push(order);

    return order;
}