const DB = require('../data/usersDB')
const url = require('url')

// function getAllUsers(req, res) {
//     const data = DB.getAllUsers()
//     successOperation(res, 200, data)
// }

function getUser(req, res) {
    const id = getId(req)
    const data = DB.getUserById(id)
    successOperation(res, 200, data)
}

function updateUser(req, res) {
    const id = getId(req)
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        const { name, email } = JSON.parse(body)
        DB.updateUser(id, { name, email })
        successOperation(res, 200)
    })
}

function createUser(req, res) {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        const { name, email, hobbies } = JSON.parse(body)
        if (!name || !email) throw new Error('Provided data is incorrect')
        DB.createUser({ name, email, hobbies })
        successOperation(res, 201)
    })
}

function addUsersHobby(req, res) {
    const id = getId(req)
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        const { hobbies } = JSON.parse(body)
        if (!hobbies) throw new Error('Provided data is incorrect')
        DB.addUsersHobby(id, hobbies)
        successOperation(res, 200)
    })
}

function deleteUser(req, res) {
    const id = getId(req)
    DB.deleteUserById(id)
    successOperation(res, 204)
}

function deleteUserHobbies(req, res) {
    const id = getId(req)
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        const { hobbies } = JSON.parse(body)
        if (!hobbies) throw new Error('Provided data is incorrect')
        DB.deleteUsersHobby(id, hobbies)
        successOperation(res, 204)
    })
}

function getUserHobbies(req, res) {
    const id = getId(req)
    const data = DB.getUsersHobbies(id)
    res.setHeader('Cache-Control', 'public, max-age=3600') // Cache for 1 hour
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString()) // Expires in 1 hour

    successOperation(res, 200, data)
}

function successOperation(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(data ? JSON.stringify({ data }) : 'Success!')
}

function getId(req) {
    const parsedUrl = url.parse(req.url || '', true)
    return parsedUrl.query.id
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    addUsersHobby,
    deleteUser,
    deleteUserHobbies,
    getUserHobbies,
}
