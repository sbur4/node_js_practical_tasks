import {EntityRepository} from '@mikro-orm/core';
import {AddressEntity} from "../entity/adress.entity";

@AddressRepository
export class AddressRepository extends EntityRepository<AddressEntity> {
}