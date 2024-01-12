const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsersWithoutHobbies,
    addHobbyByUserId,
    deleteHobbyByUserId,
    getHobbiesByUserId
} = require("../controller/user-controller");

class Router {
    constructor() {
        this.routes = {
            '/users': {
                GET: getAllUsers
            },
            '/user': {
                GET: getUser,
                POST: createUser,
                PUT: updateUser,
                DELETE: deleteUser
            },
            '/user-no-hobbies': {
                GET: getUsersWithoutHobbies
            },
            '/user/hobbies': {
                GET: getHobbiesByUserId,
                POST: addHobbyByUserId,
                DELETE: deleteHobbyByUserId
            }
        };
    }
}

module.exports = Router;