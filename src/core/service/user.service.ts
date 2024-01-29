import {IUserEntity, UserEntity} from "../../data/entity/user.entity";
import UserNotExistsException from "../exception/user.not.exists.exception";

export async function findUserById(id: string): Promise<IUserEntity | null> {
    try {
        return await UserEntity.findById(id);
    } catch (error) {
        console.error(`User not found by id:${id} `, error);
        throw new UserNotExistsException(id);
    }
}