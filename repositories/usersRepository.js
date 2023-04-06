const dbInstance = require('../services/databaseService');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        dbInstance.db.all("SELECT * FROM users", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        })
    }, );
}


function signUpUser(user) {
    return new Promise((resolve, reject) => {
        dbInstance.db.run("INSERT INTO users (firstname, lastname, email, salt, hashedPassword, role, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [user.firstname, user.lastname, user.email, user.salt, user.password, user.role, Date.now().toString()], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });

    }, );
}

function setUserRole(userId, newRole) {
    return new Promise((resolve, reject) => {
        dbInstance.db.run("UPDATE users SET role = :newRole WHERE users.id = :userId", [newRole, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });

    }, );
}

function getUserById(id) {
    db.run("SELECT firstname, lastname, email, role, createdAt, matchs.date\
    FROM users\
    INNER JOIN users_matchs ON users.id = users_matchs.userId\
    INNER JOIN matchs ON users_matchs.matchId = matchs.id WHERE users.id = :id", [id]);
}

function login(email) {
    return new Promise((resolve, reject) => {
        dbInstance.db.get("SELECT * FROM users WHERE email = :email", [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);

            };
        })
    }, );
}

module.exports = {
    getAllUsers,
    login,
    setUserRole,
    signUpUser,
    getUserById
}