import {DI} from "../../web/demo.app";
import {UserEntity} from "../../data/entity/user.entity";

export async function findUserById(id: string): Promise<UserEntity | null> {
    return await DI.userRepository.findOne({id: id});
}

export async function isUserExist(id: string): Promise<boolean> {
    const user = await DI.userRepository.findOne({id: id});
    return !(user === null || undefined);
}