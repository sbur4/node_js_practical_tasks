class UserDao {
    #storageDb;

    constructor(storageDb) {
        this.#storageDb = storageDb;
    }

    findAllUsers = () => this.#storageDb.findAll();

    findUserById = (id) => {
        return this.#storageDb.findById(id);
    }

    findUserByEmail = (email) => {
        return this.#storageDb.findUserByEmail(email);
    }

    addUser = (user) => this.#storageDb.save(user);

    updateUser = (user) => this.#storageDb.save(user);

    deleteUser = (id) => this.#storageDb.delete(id);

    findUsersByIds = (ids) => this.#storageDb.findByIds(ids);

    findHobbiesByUserId = (id) => {
        return this.#storageDb.findHobbiesByUserId(id);
    }

    isUserExistById = (id) => {
       return  this.#storageDb.isUserExist(id);
    }
}

module.exports = UserDao;