const userRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function signUp(user) {

    await userRepository.signUpUser(user);
    return user;
}

async function getAllUsers() {
    const users = await userRepository.getAllUsers()
    return users;
}

async function login(email, password) {
    const user = await userRepository.login(email);

    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user['hashedPassword'], function(err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });


    if (result) {
        tokenPayload = {
            email: user['email'],
            role: user['role']
        }
        const token = jwt.sign(tokenPayload, 'secretkey', { expiresIn: '1h' });
        return token;
    } else {
        throw new Error('Wrong password');
    }
}

async function setUserRole(id, role) {
    const user = await userRepository.setUserRole(id, role);
    return user;
}


function getUser(id) {
    userRepository.getUserById(id)
}

module.exports = {
    signUp,
    getAllUsers,
    setUserRole,
    getUser,
    login
}