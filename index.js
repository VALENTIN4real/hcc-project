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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(checkApiKey)

app.use('/actualites', actualitesRoutes.routes);
app.use('/users', usersRoutes.routes);
app.use('/matchs', matchsRoutes.routes);