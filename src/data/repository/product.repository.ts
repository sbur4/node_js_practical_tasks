import {EntityRepository} from '@mikro-orm/core';

import {ProductEntity} from "../../data/entity/product.entity";

@ProductRepository
export class ProductRepository extends EntityRepository<ProductEntity> {
}