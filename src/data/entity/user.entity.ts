import { model, Schema } from 'mongoose'

export enum USER_ROLE {
    ADMIN = 'admin',
    USER = 'user',
}

export interface IUserEntity {
    id: string
    name: string
    email?: string
    password: string
    role: USER_ROLE
}

const userSchema = new Schema<IUserEntity>(
    {
        name: { type: Schema.Types.String, required: true, unique: false },
        email: { type: Schema.Types.String, required: true, unique: true },
        password: { type: Schema.Types.String, required: true, unique: true },
        role: { type: Schema.Types.String, enum: ['admin', 'user'] },
    },
    {
        versionKey: false,
    }
)

userSchema.methods.toJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
    }
}

export const UserEntity = model('User', userSchema)
