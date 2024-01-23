import {EntityRepository} from '@mikro-orm/core';
import {DeliveryEntity} from "../entity/delivery.entity";

@DeliveryRepository
export class DeliveryRepository extends EntityRepository<DeliveryEntity> {
}