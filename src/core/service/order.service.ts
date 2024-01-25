import {ICartEntity} from "../../data/entity/cart.entity";
import OrderCreateException from "../exception/order.create.exception";
import {IOrderEntity, OrderEntity} from "../../data/entity/order.entity";
import {calculateTotal} from "../converter/cart.dto.converter";

export async function createOrder(cart: ICartEntity): Promise<IOrderEntity> {
    try {
        // const totalSum: number = calculateTotal(cart.items); //todo
        const totalSum: number = 0;

        const order: IOrderEntity = new OrderEntity({
            user: cart.user,
            cart: cart,
            items: cart.items,
            payment: {
                type: 'paypal',
                address: 'London',
                creditCard: "1234-1234-1234-1234",
            },
            delivery: {
                type: 'courier',
                address: '450 Kingsway, London, NW08 9XH',
            },
            comments: 'test',
            total: totalSum,
        });

        await OrderEntity.create(order);

        // convert to dto

        return order;
    } catch (error) {
        console.error(`Can't create order by user:${cart.user.id} `, error);
        throw new OrderCreateException(cart.user.id);
    }
}