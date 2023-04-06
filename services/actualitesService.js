const actualitesRepository = require('../repositories/actualitesRepository');

async function getAllActualites() {
    const actualites = await actualitesRepository.getAllActualites();
    return actualites;
}

async function addActualite(actualite) {
    let result = null;

    try {
        await actualitesRepository.addActualite(actualite);
        result = 201;
    } catch (error) {
        result = 400
    }

    return result;
}


module.exports = {
    getAllActualites,
    addActualite
}