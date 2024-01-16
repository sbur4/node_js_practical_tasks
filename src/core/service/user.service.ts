import {isUserExistById} from "../../data/repository/user.repository"

export function isUserExist(userId: string): boolean {
    return isUserExistById(userId);
}