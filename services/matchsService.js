const matchsRepository = require('../repositories/matchsRepository');

async function getAllMatchs() {
    const matchs = await matchsRepository.getAllMatchs();
    return matchs;
}

async function getMatchById(id) {
    const match = await matchsRepository.getMatchById(id);
    return match;
}

async function getMatchsByUserId(userId) {
    const matchs = await matchsRepository.getMatchsByUserId(userId);
    return matchs;
}

async function getWithUsers() {
    const matchs = await matchsRepository.getWithUsers();
    return matchs;
}

async function createMatch(match) {
    const createdMatch = await matchsRepository.createMatch(match);
    return createdMatch;
}

module.exports = {
    getAllMatchs,
    getMatchById,
    getMatchsByUserId,
    getWithUsers,
    createMatch
}