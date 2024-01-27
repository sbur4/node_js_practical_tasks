import {findById} from "../../data/repository/user.repository"
import UserNotExistsException from "../exception/user.not.exists.exception";
import {UserEntity} from "../../data/entity/user.entity";

export async function findUserById(userId: string): Promise<UserEntity | undefined> {
    try {
        return await findById(userId);
    } catch (error) {
        console.error(`User not found by id:${userId} `, error);
        throw new UserNotExistsException(userId);
    }
}