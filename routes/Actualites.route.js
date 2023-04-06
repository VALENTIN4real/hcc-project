const express = require('express');
const routes = express.Router();

const actualitesController = require('../controllers/actualitesController');

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

routes.get('', function(req, res) { actualitesController.getAllActualites(req, res) });
routes.post('/add', verifyToken("contributeur"), function(req, res) { actualitesController.addActualite(req, res); });
routes.get('/:id', function(req, res) { actualitesController.getActualiteById() });

module.exports = {
    routes
}