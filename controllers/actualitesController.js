const actualitesService = require('../services/actualitesService');

async function getAllActualites(req, res) {
    const actualites = await actualitesService.getAllActualites();
    res.send(actualites);
}

async function addActualite(req, res) {

    let actualite = {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
    }

    console.log(actualite);
    response = await actualitesService.addActualite(actualite);

    res.sendStatus(response);
}

module.exports = {
    getAllActualites,
    addActualite
}