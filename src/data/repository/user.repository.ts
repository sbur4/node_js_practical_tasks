import {UserEntity} from "../entity/user.entity";

export const USERS_DB: UserEntity[] = [];

export async function findById(id: string): Promise<UserEntity | undefined> {
    return USERS_DB.find(user => user.id === id);
};