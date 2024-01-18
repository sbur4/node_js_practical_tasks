import {DI} from "../../web/demo.app";
import {UserRepository} from "../../data/repository/user.repository";

export async function isUserExist(userId: string): Promise<boolean> {
    return await DI.userRepository.isUserExistById(userId);
    // return await UserRepository.isUserExistById(userId);
}