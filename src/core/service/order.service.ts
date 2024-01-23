import {DI} from "../../web/demo.app";
import {OrderEntity, OrderStatus} from "../../data/entity/order.entity";
import {calculateTotalSum} from "../converter/cart.dto.converter";
import {PaymentEntity} from "../../data/entity/payment.entity";
import {AddressEntity} from "../../data/entity/adress.entity";
import {DeliveryEntity} from "../../data/entity/delivery.entity";

export async function createOrder(userId: string, cartId: string): Promise<OrderEntity | null> {
    const user = await DI.userRepository.findOneOrFail({id: userId});
    console.log(`User was found by cart id:${userId}`);
    const cart = await DI.cartRepository.findOneOrFail({id: cartId});
    console.log(`Cart was found by cart id:${cartId}`);

    const payment: PaymentEntity = new PaymentEntity('paypal', 'London', '1234-1234-1234-1234');
    const address: AddressEntity = new AddressEntity('Bohdana Khmelnytskoho', '39', '83');
    const delivery: DeliveryEntity = new DeliveryEntity('courier', address);

    const comments = 'test';

    const totalSum = calculateTotalSum(cart!.products);

    const order = new OrderEntity(payment, delivery, comments, OrderStatus.CREATED, totalSum);
    order.user = user;
    order.cart = cart;

    DI.paymentRepository.create(payment);
    console.log(`Payment was saved by user id:${userId}`);
    DI.addressRepository.create(address);
    console.log(`Address was saved by user id:${userId}`);
    DI.deliveryRepository.create(delivery);
    console.log(`Delivery was saved by user id:${userId}`);

    DI.orderRepository.create(order);
    console.log(`Delivery was saved by user id:${userId}`)

    return order;
}