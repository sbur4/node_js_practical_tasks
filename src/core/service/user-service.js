const USER_EXCEPTION = require("../exception/user-exception");
const USER_CONVERTER = require("../converter/user-to-dto-converter");
const VALIDATOR_UTIL = require("../util/validator");
const USER = require("../model/user");

class UserService {
    #userDao;

    constructor(userDao) {
        this.#userDao = userDao;
    }

    findAllUsers = () => this.#userDao.findAllUsers();

    findUserById = id => {
        if (VALIDATOR_UTIL.validateInt(id)) {
            console.error(`Incorrect user id: ${id}`);
            return new USER_EXCEPTION(`Incorrect user id: ${id}`).message;
        }

        if (!this.#userDao.isUserExistById(id)) {
            console.warn(`Can't find user by id: ${id}`);
            return `Can't find user by id: ${id}`;
        } else {
            console.log(`User was found by id: ${id}`);
            return this.#userDao.findUserById(id);
        }
    }

    addUser = createUserDto => {
        if (!createUserDto) {
            console.error(`Dto can't be empty.`);
            return new USER_EXCEPTION(`Dto can't be empty.`).message;
        }

        if (VALIDATOR_UTIL.validateString(createUserDto.email)) {
            console.warn(`User can't found by email: ${createUserDto.email}`);
            return new USER_EXCEPTION(`User can't found by email: ${createUserDto.email}.`).message;
        }

        const existingUser = this.#userDao.findUserByEmail(createUserDto.email);
        console.log(`User was found by email: ${createUserDto.email}`);

        let newUser;
        if (existingUser) {
            newUser = new USER(existingUser.getId(), createUserDto.name, createUserDto.email, createUserDto.hobbies);

            this.#userDao.updateUser(newUser)
            console.log(`User was updated by id: ${newUser.getId()}`);
            return `User was updated by id: ${newUser.getId()}`;
        } else {
            const newUserId = this.findAllUsers().length + 1;

            newUser = new USER(newUserId, createUserDto.name, createUserDto.email, createUserDto.hobbies);

            this.#userDao.addUser(newUser)
            console.log(`User was created with id: ${newUser.getId()}`);
            return `User was created with id: ${newUser.getId()}`;
        }
    };

    updateUser = createUserDto => {
        if (!createUserDto) {
            console.error(`Dto can't be empty.`);
            return new USER_EXCEPTION(`Dto can't be empty.`).message;
        }

        if (VALIDATOR_UTIL.validateString(createUserDto.email)) {
            console.warn(`User can't found by email: ${createUserDto.email}`);
            return new USER_EXCEPTION(`User can't found by email: ${createUserDto.email}`).message;
        }

        const updatedUser = this.#userDao.findUserByEmail(createUserDto.email);
        console.log(`User was found by email: ${createUserDto.email}`);

        if (updatedUser) {
            if (createUserDto.name !== updatedUser.getName() && !VALIDATOR_UTIL.validateString(createUserDto.name)) {
                updatedUser.setName(createUserDto.name);
            }

            const currentHobbies = updatedUser.getHobbies() !== null ? updatedUser.getHobbies() : [];
            const newHobbies = createUserDto.hobbies !== null ? createUserDto.hobbies : [];
            const updatedHobbies = currentHobbies.concat(newHobbies);
            const uniqueUpdatedHobbies = [...new Set(updatedHobbies)];
            updatedUser.setHobbies(null);
            updatedUser.setHobbies(uniqueUpdatedHobbies);

            this.#userDao.updateUser(updatedUser)
            console.log(`User was updated by id: ${updatedUser.getId()}`);
            return `User was updated by id: ${updatedUser.getId()}`;
        } else {
            console.warn(`Can't update user by email: ${createUserDto.email}`);
            return `Can't update user by email: ${createUserDto.email}`;
        }
    };

    deleteUserById = id => {
        if (VALIDATOR_UTIL.validateInt(id)) {
            console.error(`User email can't be empty.`);
            return new USER_EXCEPTION(`User email can't be empty.`).message;
        }

        const existingUser = this.#userDao.findUserById(id);
        console.log(`User was found by email: ${id}`);

        if (existingUser) {
            this.#userDao.deleteUser(existingUser.getId());
            console.log(`User was deleted with id: ${existingUser.getId()}`);
            return `User was deleted by id: ${existingUser.getId()}`;
        } else {
            console.warn(`Can't delete user by id: ${id}`);
            return `Can't delete user by id: ${id}`;
        }
    };

    retrieveUserByIdsWithoutHobbies(userIds) {
        if (userIds == null) {
            console.error(`Incorrect users ids: ${userIds}`);
            return new USER_EXCEPTION(`Incorrect users ids: ${userIds}`).message;
        }

        const correctIds = userIds.filter(id => typeof id === 'number' && Number.isInteger(id));
        console.log(`Correct users ids was found: ${correctIds}`);

        if (correctIds.length === 0) {
            console.warn(`Can't retrieve user by ids: ${correctIds}`);
            return `Can't retrieve user by ids: ${correctIds}`;
        } else {
            const users = this.#userDao.findUsersByIds(correctIds);
            console.log(`Users was found by ids: ${correctIds}`);

            const usersDtos = [];
            users.forEach(user => {
                usersDtos.push(USER_CONVERTER.convert(user));
            });

            console.log(`Users was found without hobbies by ids: ${correctIds}`);
            return usersDtos;
        }
    }

    addHobbyByUserId(id, newHobby) {
        if (VALIDATOR_UTIL.validateInt(id)) {
            console.error(`User id can't be empty.`);
            return new USER_EXCEPTION(`User id can't be empty.`).message;
        }

        if (VALIDATOR_UTIL.validateString(newHobby)) {
            console.error(`Invalid hobby ${newHobby} for user with id: ${id}.`);
            return new USER_EXCEPTION(`Invalid hobby ${newHobby} for user with id: ${id}.`).message;
        }

        const existingUser = this.#userDao.findUserById(id);
        console.log(`User was found by id: ${id}`);

        if (!existingUser) {
            console.warn(`Can't add hobby to user with id: ${id}`);
            return `Can't add hobby to user with id: ${id}`;
        } else {
            const currentHobbies = existingUser.getHobbies() !== null ? existingUser.getHobbies() : [];

            if (!currentHobbies.includes(newHobby)) {
                currentHobbies.push(newHobby);
            }

            existingUser.setHobbies(null);
            existingUser.setHobbies(currentHobbies);

            this.#userDao.updateUser(existingUser);

            console.log(`Hobby was added to the user with id: ${id}`);
            return `Hobby was added to the user with id: ${id}`;
        }
    }

    deleteHobbyByUserId(id, deletedHobby) { // todo
        if (VALIDATOR_UTIL.validateInt(id)) {
            console.error(`User id can't be empty.`);
            return new USER_EXCEPTION(`User id can't be empty.`).message;
        }

        if (VALIDATOR_UTIL.validateString(deletedHobby)) {
            console.error(`Invalid hobby ${deletedHobby} for user with id: ${id}.`);
            return new USER_EXCEPTION(`Invalid hobby ${deletedHobby} for user with id: ${id}.`).message;
        }

        const existingUser = this.#userDao.findUserById(id);
        console.log(`User was found by id: ${id}`);

        if (!existingUser) {
            console.warn(`Can't delete hobby ${deletedHobby} from user with id: ${id}`);
            return `Can't delete hobby ${deletedHobby} from user with id: ${id}`;
        } else {
            const currentHobbies = existingUser.getHobbies() !== null ? existingUser.getHobbies() : [];

            const hobbyIndex = currentHobbies.findIndex(hobby => hobby === deletedHobby);
            if (hobbyIndex !== -1) {
                currentHobbies.splice(hobbyIndex, 1);

                existingUser.setHobbies(null);
                existingUser.setHobbies(currentHobbies);

                this.#userDao.updateUser(existingUser);

                console.log(`Hobby ${deletedHobby} was deleted from the user with id: ${id}`);
                return `Hobby ${deletedHobby} was deleted from the user with id: ${id}`;
            } else {
                console.warn(`Hobby ${deletedHobby} wasn't deleted from the user with id: ${id}`);
                return `Hobby ${deletedHobby} wasn't deleted from the user with id: ${id}`;
            }
        }
    }

    findHobbiesByUserId = id => {
        if (VALIDATOR_UTIL.validateInt(id)) {
            console.error(`Incorrect user ids: ${id}`);
            return new USER_EXCEPTION('Incorrect user id: ' + id).message;
        }

        if (!this.#userDao.isUserExistById(id)) {
            console.warn(`Can't find user by id: ${id}`);
            return `Can't find user by id: ${id}`;
        } else {
            console.log(`Hobbies was found by id: ${id}`);
            return this.#userDao.findHobbiesByUserId(id);
        }
    }
}

module.exports = UserService;