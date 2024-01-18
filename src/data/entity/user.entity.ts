import {Collection, Entity, EntityRepositoryType, OneToMany, Property,} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
// import {CartEntity} from "./cart.entity";
// import {OrderEntity} from "./order.entity";
import {UserRepository} from "../../data/repository/user.repository";

// @Entity({customRepository: () => UserRepository})
@Entity()
export class UserEntity extends BaseEntity {
    @Property()
    name?: string;

    // @OneToMany(() => CartEntity, (cart) => cart.user)
    // carts = new Collection<CartEntity>(this);
    //
    // @OneToMany(() => OrderEntity, (order) => order.user)
    // orders = new Collection<OrderEntity>(this);

    [EntityRepositoryType]?: UserRepository;

    constructor(name: string) {
        super();
        this.name = name;
    }
}