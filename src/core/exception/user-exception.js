class UserException extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = "UserException";
    }
}

module.exports = UserException;