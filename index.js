const express = require('express');
require('dotenv').config();
const actualitesRoutes = require('./routes/Actualites.route');
const usersRoutes = require('./routes/Users.route');
const matchsRoutes = require('./routes/Matchs.route');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = new express();


app.listen(port = 3000, () => {
    console.log('App is currently listening on port ' + port);
});

const checkApiKey = (req, res, next) => {
    if (req.headers['x-api-key'] === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}


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



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(checkApiKey)

app.use('/actualites', actualitesRoutes.routes);
app.use('/users', usersRoutes.routes);
app.use('/matchs', matchsRoutes.routes);