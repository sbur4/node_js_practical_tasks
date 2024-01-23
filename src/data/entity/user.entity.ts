import {Cascade, Collection, Entity, EntityRepositoryType, OneToMany, Property,} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {UserRepository} from "../../data/repository/user.repository";
import {CartEntity} from "./cart.entity";
import {OrderEntity} from "./order.entity";

@Entity({tableName: 'user_entity'})
export class UserEntity extends BaseEntity {
    @Property({
        name: 'name', type: 'string', primary: false, unique: false, nullable: false
    })
    name!: string;

    @OneToMany(() => CartEntity, (cart) => cart.user, {
        eager: true,
        cascade: [Cascade.ALL]
    })
    carts = new Collection<CartEntity>(this);

    @OneToMany(() => OrderEntity, (order) => order.user, {
        eager: true,
        cascade: [Cascade.ALL]
    })
    orders = new Collection<OrderEntity>(this);

    [EntityRepositoryType]?: UserRepository;

    constructor(name: string) {
        super();
        this.name = name;
    }
}