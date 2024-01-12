const USER_DTO = require("../dto/user-dto");

class UserToDtoConverter {
    static convert(user) {
        return new USER_DTO(user.getId(), user.getName(), user.getEmail());
    }
}

module.exports = UserToDtoConverter;