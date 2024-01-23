import {OrderEntity} from "../entity/order.entity";
import {EntityRepository} from "@mikro-orm/core";

@OrderRepository
export class OrderRepository extends EntityRepository<OrderEntity> {
}