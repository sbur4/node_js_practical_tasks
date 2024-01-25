class UserFindByIdException extends Error {
    constructor(userId: string) {
        super(`User not found by id:${userId}`);
        this.name = "UserFindByIdException";
    }
}

export default UserFindByIdException;

// todo +