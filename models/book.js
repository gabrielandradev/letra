const PouchDB = require("pouchdb");

const db = new PouchDB("db");

PouchDB.plugin(require('pouchdb-quick-search'));

db.info().then((info) => {
        console.log(info);
});

module.exports = db;