import {Entity, EntityRepositoryType, Property,} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {PaymentRepository} from "../repository/payment.repository";

@Entity()
export class PaymentEntity extends BaseEntity {
    @Property({
        name: 'type', type: 'string', primary: false, unique: false, nullable: false
    })
    type!: string;

    @Property({
        name: 'address', type: 'string', primary: false, unique: false, nullable: false
    })
    address!: string;

    @Property({
        name: 'creditCard', type: 'string', primary: false, unique: false, nullable: false
    })
    creditCard!: string;

    [EntityRepositoryType]?: PaymentRepository;

    constructor(type: string, address: string, creditCard: string) {
        super();
        this.type = type;
        this.address = address;
        this.creditCard = creditCard;
    }
}