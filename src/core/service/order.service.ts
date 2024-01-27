import {OrderEntity, OrderStatus} from "../../data/entity/order.entity";
import {CartEntity} from "../../data/entity/cart.entity";
import {calculateTotalSum} from "../converter/cart.dto.converter";
import {DeliveryEntity} from "../../data/entity/delivery.entity";
import {AddressEntity} from "../../data/entity/adress.entity";
import {PaymentEntity} from "../../data/entity/payment.entity";
import OrderCreateException from "../exception/order.create.exception";
import {DI} from "../../web/demo.app";

export async function createOrder(cart: CartEntity): Promise<OrderEntity> {
    try {
        const payment: PaymentEntity = new PaymentEntity('paypal', 'London', '1234-1234-1234-1234');
        const address: AddressEntity = new AddressEntity('Bohdana Khmelnytskoho', '39', '83');
        const delivery: DeliveryEntity = new DeliveryEntity('courier', address);

        const comments = 'test';

        const total: number = await calculateTotalSum(cart.products);

        const order = new OrderEntity(payment, delivery, comments, OrderStatus.CREATED, total);
        order.user = cart.user;
        order.cart = cart;

        return DI.orderRepository.create(order);
    } catch (error) {
        console.error(`Can't create an order for user id:${cart.user.id} `, error);
        throw new OrderCreateException(cart.user.id);
    }
}