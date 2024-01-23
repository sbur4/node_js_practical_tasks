import {EntityRepository} from '@mikro-orm/postgresql';
import {CartItemEntity} from "../entity/cartItem.entity";

@CartItemRepository
export class CartItemRepository extends EntityRepository<CartItemEntity> {
}
