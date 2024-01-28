class UserNotExistsException extends Error {
    constructor(userId: string) {
        super(`User not found by id:${userId}`);
        this.name = "UserNotExistsException";
    }
}

export default UserNotExistsException;