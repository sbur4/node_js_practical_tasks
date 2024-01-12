const URL = require('url');
const DB = require("../../data/storage/storage-db");
const USER_DAO = require("../../data/repository/user-dao");
const USER_SERVICE = require("../../core/service/user-service");
const CREATE_USER_DTO = require("../../core/dto/create-user-dto");

const db = new DB();
const repo = new USER_DAO(db);
const service = new USER_SERVICE(repo);

function getAllUsers(req, res) {
    const resultData = service.findAllUsers();
    executeResponse(res, 200, resultData);
}

function getUser(req, res) {
    const id = getId(req);
    const resultData = service.findUserById(id);
    executeResponse(res, 200, resultData);
}

function createUser(req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        try {
            const {name, email, hobbies} = JSON.parse(body);
            const resultData = service.addUser(new CREATE_USER_DTO(name, email, hobbies));

            executeResponse(res, 201, resultData);
        } catch (error) {
            console.error('Error parsing or processing user data:', error);
            executeResponse(res, 400, {error: 'Invalid request data'});
        }
    });
}

function updateUser(req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        try {
            const {name, email, hobbies} = JSON.parse(body);
            const resultData = service.updateUser(new CREATE_USER_DTO(name, email, hobbies));

            executeResponse(res, 200, resultData);
        } catch (error) {
            console.error('Error parsing or processing user data:', error);
            executeResponse(res, 400, {error: 'Invalid request data'});
        }
    });
}

function deleteUser(req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        try {
            const {id} = JSON.parse(body);
            const resultData = service.deleteUserById(id);

            executeResponse(res, 200, resultData);
        } catch (error) {
            console.error('Error parsing or processing user data:', error);
            executeResponse(res, 400, {error: 'Invalid request data'});
        }
    });
}

function getUsersWithoutHobbies(req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        try {
            const {ids} = JSON.parse(body);
            const resultData = service.retrieveUserByIdsWithoutHobbies(ids);

            executeResponse(res, 200, resultData);
        } catch (error) {
            console.error('Error parsing or processing user data:', error);
            executeResponse(res, 400, {error: 'Invalid request data'});
        }
    });
}

function addHobbyByUserId(req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        try {
            const {id, hobby} = JSON.parse(body);
            const resultData = service.addHobbyByUserId(id, hobby);

            executeResponse(res, 200, resultData);
        } catch (error) {
            console.error('Error parsing or processing user data:', error);
            executeResponse(res, 400, {error: 'Invalid request data'});
        }
    });
}

function deleteHobbyByUserId(req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        try {
            const {id, hobby} = JSON.parse(body);
            const resultData = service.deleteHobbyByUserId(id, hobby);

            executeResponse(res, 200, resultData);
        } catch (error) {
            console.error('Error parsing or processing user data:', error);
            executeResponse(res, 400, {error: 'Invalid request data'});
        }
    });
}

function getHobbiesByUserId(req, res) {
    const id = getId(req);
    const resultData = service.findHobbiesByUserId(id);
    executeResponse(res, 200, resultData);
}

function getId(req) {
    try {
        const parsedUrl = URL.parse(req.url || '', true);
        return Number(parsedUrl.query.id);
    } catch (error) {
        return 0;
    }
}

function executeResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsersWithoutHobbies,
    addHobbyByUserId,
    deleteHobbyByUserId,
    getHobbiesByUserId
}