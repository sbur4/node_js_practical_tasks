class User {
    constructor(id, name, email, hobbies) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.hobbies = hobbies;
    }

    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getEmail() {
        return this.email;
    }

    setEmail(value) {
        this.email = value;
    }

    getHobbies() {
        return this.hobbies;
    }

    setHobbies(value) {
        this.hobbies = value;
    }
}

module.exports = User;