import {Cascade, Entity, EntityRepositoryType, Enum, LoadStrategy, ManyToOne, Property,} from '@mikro-orm/core';
import {BaseEntity} from "./base.entity";
import {UserEntity} from "./user.entity";
import {CartEntity} from "./cart.entity";
import {OrderRepository} from "../repository/order.repository";
import {PaymentEntity} from "./payment.entity";
import {DeliveryEntity} from "./delivery.entity";

export enum OrderStatus {
    CREATED = 'created',
    COMPLETED = 'completed',
}

@Entity()
export class OrderEntity extends BaseEntity {
    @ManyToOne({entity: () => UserEntity, strategy: LoadStrategy.JOINED, eager: true, cascade: [Cascade.ALL]})
    user!: UserEntity;

    @ManyToOne({entity: () => CartEntity, eager: true, cascade: [Cascade.ALL]})
    cart!: CartEntity;

    @ManyToOne({entity: () => PaymentEntity, eager: true, cascade: [Cascade.ALL]})
    payment!: PaymentEntity;

    @ManyToOne({entity: () => PaymentEntity, eager: true, cascade: [Cascade.ALL]})
    delivery!: DeliveryEntity;

    @Property({name: 'comments', type: 'string', primary: false, unique: false, nullable: false})
    comments?: string;

    @Enum({items: () => OrderStatus, nativeEnumName: 'order_status', array: true})
    status!: OrderStatus;

    @Property({name: 'total', type: 'numeric', primary: false, unique: false, nullable: false})
    total!: number;

    [EntityRepositoryType]?: OrderRepository;

    constructor(
        payment: PaymentEntity,
        delivery: DeliveryEntity,
        comments: string,
        status: OrderStatus,
        total: number
    ) {
        super()
        this.payment = payment;
        this.delivery = delivery;
        this.comments = comments;
        this.status = status;
        this.total = total;
    }
}