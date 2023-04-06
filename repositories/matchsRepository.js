const dbInstance = require('../services/databaseService');

function getAllMatchs() {
    return new Promise((resolve, reject) => {
        dbInstance.db.all(
            'SELECT * FROM matchs',
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
}

function getMatchById(id) {
    return new Promise((resolve, reject) => {
        dbInstance.db.all(
            'SELECT * FROM matchs WHERE id = ?', [id],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
}

function getMatchsByUserId(id) {
    return new Promise((resolve, reject) => {
        dbInstance.db.all(
            "SELECT m.id, m.userId1, u1.firstname AS user1_firstname, u1.lastname AS user1_lastname, m.userId2, u2.firstname AS user2_firstname, u2.lastname AS user2_lastname, m.user1Score, m.user2Score, m.date\
            FROM matchs M\
            LEFT JOIN users u1 on m.userId1 = u1.id\
            LEFT JOIN users u2 on m.userId2 = u2.id\
            WHERE userId1 = ? OR userId2 = ?", [id, id],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
}

function getWithUsers() {
    return new Promise((resolve, reject) => {
        dbInstance.db.all(
            "SELECT m.id, m.userId1, u1.firstname AS user1_firstname, u1.lastname AS user1_lastname, m.userId2, u2.firstname AS user2_firstname, u2.lastname AS user2_lastname, m.user1Score, m.user2Score, m.date\
            FROM matchs M\
            LEFT JOIN users u1 on m.userId1 = u1.id\
            LEFT JOIN users u2 on m.userId2 = u2.id",
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
}

function createMatch(match) {
    return new Promise((resolve, reject) => {
        dbInstance.db.run(
            "INSERT INTO matchs (userId1, userId2, user1Score, user2Score, date)\
            VALUES (?, ?, ?, ?, ?)", [match.userId1, match.userId2, match.user1Score, match.user2Score, match.date],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}


module.exports = {
    getAllMatchs,
    getMatchById,
    getMatchsByUserId,
    getWithUsers,
    createMatch
}