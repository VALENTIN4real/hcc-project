const matchsService = require('../services/matchsService');

async function getAllMatchs(req, res) {
    const matchs = await matchsService.getAllMatchs();
    res.send(matchs);
}

async function getMatchById(req, res) {
    const match = await matchsService.getMatchById(req.params.id);
    res.send(match);
}

async function getMatchsByUserId(req, res) {
    const matchs = await matchsService.getMatchsByUserId(req.params.id);
    res.send(matchs);
}

async function getWithUsers(req, res) {
    const matchs = await matchsService.getWithUsers();
    res.send(matchs);
}

async function createMatch(req, res) {
    const { userId1, userId2, user1Score, user2Score, date } = req.body;

    if (!userId1 || !userId2 || !user1Score || !user2Score || !date) {
        return res.status(400).send('Missing parameters');
    }

    try {
        const createdMatch = await matchsService.createMatch(req.body);
        res.status(201).send(createdMatch);
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).send('Cette date est déjà prise.');
        } else {
            console.error(err);
            return res.status(500).send('Impossible de créer le match.');
        }
    }
}


module.exports = {
    getAllMatchs,
    getMatchById,
    getMatchsByUserId,
    getWithUsers,
    createMatch
}