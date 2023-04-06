const express = require('express');
const routes = express.Router();

const matchsController = require('../controllers/matchsController');

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

routes.get('', function(req, res) { matchsController.getAllMatchs(req, res) });
routes.get('/user/:id', function(req, res) { matchsController.getMatchsByUserId(req, res) });
routes.get('/users', function(req, res) { matchsController.getWithUsers(req, res) });
routes.post('/create', verifyToken("coach"), function(req, res) { matchsController.createMatch(req, res) });
routes.get('/:id', function(req, res) { matchsController.getMatchById(req, res) });

module.exports = {
    routes
}