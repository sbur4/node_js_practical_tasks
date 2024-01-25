import {IUserEntity, UserEntity} from "../../data/entity/user.entity";
import UserFindByIdException from "../exception/user.find.by.id.exception";

export async function findUserById(id: string): Promise<IUserEntity | null> {
    try {
        return await UserEntity.findById(id);
    } catch (error) {
        console.error(`User not found by id:${id} `, error);
        throw new UserFindByIdException(id);
    }
}

// todo +