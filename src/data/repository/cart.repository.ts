import {EntityRepository} from '@mikro-orm/postgresql';
import {CartEntity} from "../../data/entity/cart.entity";

@CartRepository
export class CartRepository extends EntityRepository<CartEntity> {
}