class CreateUserDto {
    constructor(name, email, hobbies) {
        this.name = name;
        this.email = email;
        this.hobbies = hobbies;
    }
}

module.exports = CreateUserDto;