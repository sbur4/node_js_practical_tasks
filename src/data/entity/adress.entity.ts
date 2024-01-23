import {Entity, EntityRepositoryType, Property,} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {AddressRepository} from "../repository/address.repository";

@Entity()
export class AddressEntity extends BaseEntity {
    @Property({
        name: 'street', type: 'string', primary: false, unique: false, nullable: false
    })
    street!: string;

    @Property({
        name: 'house', type: 'string', primary: false, unique: false, nullable: false
    })
    house!: string;

    @Property({
        name: 'apartment', type: 'string', primary: false, unique: false, nullable: false
    })
    apartment!: string;

    [EntityRepositoryType]?: AddressRepository;

    constructor(street: string, house: string, apartment: string) {
        super();
        this.street = street;
        this.house = house;
        this.apartment = apartment;
    }
}