import {Entity, EntityRepositoryType, ManyToOne, Property,} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {AddressEntity} from "./adress.entity";
import {DeliveryRepository} from "../repository/delivery.repository";

@Entity()
export class DeliveryEntity extends BaseEntity {
    @Property({
        name: 'type', type: 'string', primary: false, unique: false, nullable: false
    })
    type!: string;

    @ManyToOne(() => AddressEntity)
    address!: AddressEntity

    [EntityRepositoryType]?: DeliveryRepository;

    constructor(type: string, address: AddressEntity,) {
        super();
        this.type = type;
        this.address = address;
    }
}