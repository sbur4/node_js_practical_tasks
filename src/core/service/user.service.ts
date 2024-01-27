import {DI} from "../../web/demo.app";
import {UserEntity} from "../../data/entity/user.entity";
import UserNotExistsException from "../exception/user.not.exists.exception";

export async function findUserById(id: string): Promise<UserEntity | null> {
    try {
        return await DI.userRepository.findOne({id: id});
    } catch (error) {
        console.error(`User not found by id:${id} `, error);
        throw new UserNotExistsException(id);
    }
}