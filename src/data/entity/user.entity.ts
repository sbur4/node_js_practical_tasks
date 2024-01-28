import {model, Schema} from 'mongoose';

export interface IUserEntity {
    id: string,
    name: string,
    email?: string,
}

const userSchema = new Schema<IUserEntity>({
    name: {type: Schema.Types.String, required: true, unique: false},
    email: {type: Schema.Types.String, required: true, unique: true}
}, {
    versionKey: false
});

userSchema.methods.toJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email
    }
}

export const UserEntity = model('User', userSchema);