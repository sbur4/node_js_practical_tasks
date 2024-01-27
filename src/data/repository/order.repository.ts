import {OrderEntity} from "../entity/order.entity";

const ORDERS_DB: OrderEntity[] = [];

export async function save(order: OrderEntity): Promise<OrderEntity> {
    ORDERS_DB.push(order);

    return order;
}