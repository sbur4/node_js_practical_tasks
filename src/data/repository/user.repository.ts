import {EntityRepository} from '@mikro-orm/core';

import {UserEntity} from "../../data/entity/user.entity";

@UserRepository
export class UserRepository extends EntityRepository<UserEntity> {
}