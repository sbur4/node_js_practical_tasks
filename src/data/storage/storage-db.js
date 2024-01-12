const USER = require("../../core/model/user");

class StorageDb {
    #users;

    constructor() {
        const user1 = new USER(1, 'Ann', 'ann@google.com', ['books', 'sport', 'dancing']);
        const user2 = new USER(2, 'Ben', 'ben@google.com', ['series', 'sport']);
        this.#users = new Map;
        this.#users.set(1, user1);
        this.#users.set(2, user2);
    }

    findAll = () => {
        return Array.from(this.#users.values());
    };

    findUserByEmail(userEmail) {
        for (const user of this.#users.values()) {
            if (user.getEmail() === userEmail) {
                return user;
            }
        }
        return null;
    }

    findById(userId) {
        for (const user of this.#users.values()) {
            if (user.getId() === userId) {
                return user;
            }
        }
        return null;
    }

    save(user) {
        this.#users.set(user.getId(), user);
    }

    delete(userId) {
        this.#users.delete(userId);
    }

    findByIds(userIds) {
        const users = [];
        this.#users.forEach((value, key) => {
            if (userIds.includes(key)) {
                users.push(value);
            }
        });

        return users;
    }

    findHobbiesByUserId(userId) {
        return this.#users.get(userId).getHobbies();
    }

    isUserExist(userId) {
        return this.#users.has(userId);
    }
}

module.exports = StorageDb;