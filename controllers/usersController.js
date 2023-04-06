const usersService = require('../services/usersService');
const bcrypt = require('bcrypt');



async function signUp(req, res) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt).then(async(hash) => {
            const hashedPassword = hash;

            let user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                salt: salt,
                password: hashedPassword,
                role: "adherent"
            };

            const newUser = await usersService.signUp(user);
            res.send(newUser);


        })
    });
}

async function loginUser(req, res) {

    try {
        const token = await usersService.login(req.body.email, req.body.password);
        res.send(token);
    } catch (error) {
        res.sendStatus(401)
    }
}

async function setUserRole(req, res) {
    await usersService.setUserRole(req.body.id, req.body.role);
    res.sendStatus(res.statusCode);

}

async function getAllUsers(req, res) {
    const users = await usersService.getAllUsers()
    res.send(users);
}

module.exports = {
    getAllUsers,
    setUserRole,
    signUp,
    loginUser
}