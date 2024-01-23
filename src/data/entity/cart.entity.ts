import {Cascade, Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, Property} from '@mikro-orm/core';

import {BaseEntity} from "./base.entity";
import {CartItemEntity} from "./cartItem.entity";
import {CartRepository} from "../repository/cart.repository";
import {UserEntity} from "./user.entity";

@Entity()
export class CartEntity extends BaseEntity {
    @Property({
        name: 'isDeleted', type: 'boolean', primary: false, unique: false, nullable: false, default: false
    })
    isDeleted?: boolean = false;

    @ManyToOne(() => UserEntity, {eager: true, cascade: [Cascade.ALL]})
    user!: UserEntity;

    @OneToMany(() => CartItemEntity, (item) => item.cart,
        {eager: true, cascade: [Cascade.ALL]})
    products = new Collection<CartItemEntity>(this);

    [EntityRepositoryType] ?: typeof CartRepository;

    constructor(isDeleted?: boolean) {
        super();
        this.isDeleted = isDeleted;
    }
}