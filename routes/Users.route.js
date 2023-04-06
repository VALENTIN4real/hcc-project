const express = require('express');
const routes = express.Router();

const usersController = require('../controllers/usersController');

const verifyToken = (role) => {
    return (req, res, next) => {

        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jwt.verify(token, "secret");
            console.log(decoded);

            if (!decoded.role.includes(role)) {
                return res.status(403).json({ message: `Unauthorized, you are not ${role}` });
            }
            next();

        } catch (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    }
}


routes.get('', function(req, res) { usersController.getAllUsers(req, res) });
routes.post('/signup', function(req, res) { usersController.signUp(req, res) });
routes.patch('/validate', function(req, res) { usersController.setUserRole(req, res) });
routes.get('/login', function(req, res) { usersController.loginUser(req, res) });

module.exports = {
    routes
}