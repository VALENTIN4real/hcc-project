const sqlite3 = require('sqlite3');

class Database {
    constructor() {
        if (!Database.instance) {
            this.db = new sqlite3.Database('./data/hcc.sqlite');

            this.db.serialize(() => {
                // Table Users
                this.db.run('\
                CREATE TABLE IF NOT EXISTS users (\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
                    firstname TEXT NOT NULL,\
                    lastname TEXT NOT NULL,\
                    email TEXT UNIQUE NOT NULL,\
                    salt TEXT NOT NULL,\
                    hashedPassword TEXT NOT NULL,\
                    role TEXT NOT NULL,\
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)');

                this.db.run('\
                CREATE TABLE IF NOT EXISTS matchs (\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
                    userId1 TEXT NOT NULL,\
                    userId2 TEXT NOT NULL,\
                    user1Score INTEGER,\
                    user2Score INTEGER,\
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP UNIQUE NOT NULL)');

                this.db.run('\
                CREATE TABLE IF NOT EXISTS actualites (\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
                    title TEXT NOT NULL,\
                    content TEXT NOT NULL,\
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
                    userId INTEGER NOT NULL,\
                    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)');
            });

            Database.instance = this;
        }

        return Database.instance;
    }
}

module.exports = new Database();