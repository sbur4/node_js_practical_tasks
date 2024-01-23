import {EntityRepository} from '@mikro-orm/core';
import {PaymentEntity} from "../entity/payment.entity";

@PaymentRepository
export class PaymentRepository extends EntityRepository<PaymentEntity> {
}