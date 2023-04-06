const dbInstance = require('../services/databaseService');


function getAllActualites() {
    return new Promise((resolve, reject) => {
        dbInstance.db.all('SELECT * FROM actualites', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    }, )
}

function addActualite(actualite) {
    return new Promise((resolve, reject) => {
        dbInstance.db.run('INSERT INTO actualites (title, content, userId) VALUES (?, ?, ?)', [actualite["title"], actualite["content"], actualite["userId"]], (err) => {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    }, )
}

module.exports = {
    getAllActualites,
    addActualite
}