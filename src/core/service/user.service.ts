import { IUserEntity, UserEntity } from '../../data/entity/user.entity'
import UserNotExistsException from '../exception/user.not.exists.exception'

export async function findUserById(id: string): Promise<IUserEntity | null> {
    try {
        return await UserEntity.findById(id)
    } catch (error) {
        console.error(`User not found by id:${id} `, error)
        throw new UserNotExistsException(id)
    }
}

export async function findUserByEmail(
    email: string
): Promise<IUserEntity | null> {
    try {
        return await UserEntity.findOne({ email: email })
    } catch (error) {
        console.error(`User not found by email:${email} `, error)
        throw new UserNotExistsException(email)
    }
}
