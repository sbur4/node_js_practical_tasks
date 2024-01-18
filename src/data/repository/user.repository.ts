import { EntityRepository } from '@mikro-orm/postgresql';

import { UserEntity } from "../../data/entity/user.entity";
import {DI} from "../../web/demo.app";

export class UserRepository extends EntityRepository<UserEntity> {
     async isUserExistById(id: string) {
        // public async isUserExistById(id: string) {
        const user = await DI.userRepository.findOneOrFail({ id });
        return !!user;
    }
}

// // for the tests
// const USER_1: UserEntity = {id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'};
// const USER_2: UserEntity = {id: '0830da93-1dca-45a0-a740-ec5c83ad3aa5'};
// const USER_3: UserEntity = {id: '7731dce9-be16-4279-bfd5-c0b3ccfb7a14'};
//
// USERS_DB.push(USER_1, USER_2, USER_3);